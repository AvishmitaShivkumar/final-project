const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const addGratitude = async (request, response) => {
    const { accountId, email, log } = request.body;
    console.log("addGratitude gets hit");

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

        // checks if the account already is in the collection.
        const findAccount = await db.collection("gratitude").findOne({ accountId });

        // if acccount does not exist, create new document.
        if(!findAccount){
            await db.collection("gratitude").insertOne({ accountId, email, log: [log] });
            return response.status(201).json({ status: 201, data: log, message: "Gratitude log created!" });
        } 

        // if account exists, add a new value to the log field of the document.
        if(findAccount) {
            // uses mongodb's array update operations to update the array. $push adds an item to an array.
            await db.collection("gratitude").updateOne( { accountId, email }, { $push: { log: log } } )
            return response.status(200).json({ status: 200, data: log, message: "Gratitude log updated!" })
        }
    } catch (error) {
        response.status(500).json({ status: 500, error: error.message })
    } finally {
        // disconnects from Mongodb.
        client.close();
    }
};

module.exports = addGratitude;