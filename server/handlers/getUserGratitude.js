const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const getUserGratitude = async (request, response) => {

    const accountId = request.params._id;

    // create a new Mongodb client
    const client = new MongoClient(MONGO_URI, options);

    try{
        // connect to the Mongodb client, declare and connect to the database
        await client.connect();
        const db = client.db("grounded");

        const userGratitudeLog = await db.collection("gratitude").findOne({ accountId })

        userGratitudeLog 
        ? response.status(200).json({ status: 200, data: userGratitudeLog })
        : response.status(404).json({ status: 404, error: "No entries found"})

    } catch (error) {
        response.status(500).json({ status: 500, error: error.message })
    } finally {
        // disconnects from Mongodb
        client.close()
        console.log("disconnected")
    }
};

module.exports = getUserGratitude;