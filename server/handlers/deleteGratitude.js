const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

const deleteGratitude = async (request, response) => {
    const { accountId, log } = request.body;

    // create new client.
    const client = new MongoClient(MONGO_URI, options);

    try {
         // connect to the Mongodb client, declare and connect to the database
        await client.connect();
        const db = client.db("grounded");

        await db.collection("gratitude").updateOne(
            // filters to find the value/s to be updated - accountId (finds the right account) and log.id (finds the right field).
            { accountId, "log.id": log.id },
            // uses mongodb's array update operations to update the array. $pull removes all array elements that match a specified query.
            { $pull: {"log": log}}
            );
        return response.status(200).json({ status: 200, id: log.id, message: "Gratitude deleted!" });
        
    } catch (error) {
        response.status(500).json({ status: 500, error: error.message })
    } finally {
         // disconnects from Mongodb.
        client.close();
    }
};

module.exports = deleteGratitude;