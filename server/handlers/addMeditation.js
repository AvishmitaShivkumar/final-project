const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const addMeditation = async (request, response) => {
    const { accountId, email, log } = request.body;

    // create a new Mongodb client
    const client = new MongoClient(MONGO_URI, options);

    try {
        // connect to the Mongodb client, declare and connect to the database
        await client.connect();
        const db = client.db("grounded");

        // checks if the account already is in the collection.
        const findAccount = await db.collection("meditation").findOne({ accountId });

        // if account doesn't exist, create a new document.
        if(!findAccount) {
            await db.collection("meditation").insertOne({ accountId, email, log: [log] });
            return response.status(201).json({ status: 201, data: log, message: "Meditation log created!" });
        }

        // if account exists, add a new value to the log field of the document.
        if(findAccount){
            await db.collection("meditation").updateOne({ accountId, email }, { $push: { log: log }});
            return response.status(200).json({ status: 200, data: log, message: "Meditation log updated!" });
        }
    } catch (error) {
        response.status(500).json({ status: 500, error: error.message });
    } finally {
        // disconnect from Mongodb.
        client.close();
    }
};

module.exports = addMeditation;