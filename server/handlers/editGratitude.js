const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const editGratitude = async (request, response) => {
    const { accountId, log } = request.body;
    

    // checks that the required fields are not empty.
    if(!log.gratitude) {
        return response.status(400).json({ status:400, error: "Missing information" });
    }

    // create a new Mongodb client
    const client = new MongoClient(MONGO_URI, options);

    try {
        // connect to the Mongodb client, declare and connect to the database
        await client.connect();
        const db = client.db("grounded");
        console.log("connected");


        // edit the pertinent value of the log field in the document.
        await db.collection("gratitude").updateOne(
            // filters to find the value/s to be updated - accountId (finds the right account) and log.id (finds the right field).
            { accountId, "log.id": log.id },
            // uses mongodb's array update operations to update the array. 
            // the key of fieldname.$[<identifier>] tells it filter all elements that match it and update those to the new value provided.
            { $set: {"log.$.gratitude": log.gratitude } },
        )

            // await db.collection("gratitude").updateOne( { accountId }, { $set: { log: log } } )
            return response.status(200).json({ status: 200, data: log, message: "Gratitude log edited!" })

    } catch (error) {
        response.status(500).json({ status: 500, error: error.message })
    } finally {
        // disconnects from Mongodb.
        client.close();
    }

};

module.exports = editGratitude;