const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const handleGratitude = async (request, response) => {
    const { date } = request.body;

    // gratitude: {date1: [{}, {gratitude: hksf}]}
    // {date: {gratitude: ["", ""]}}

    // create a new Mongodb client
    const client = new MongoClient(MONGO_URI, options);

    try {
        // connect to the Mongodb client, declare and connect to the database
        await client.connect();
        const db = client.db("grounded");
        console.log("connected");


    } catch (error) {
        response.status(500).json({ status: 500, error: error.message })
    } finally {
        // disconnects from Mongodb
        client.close()
    }
};

module.exports = handleGratitude;