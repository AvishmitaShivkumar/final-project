const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const getUsers = async () => {
    // // create a new Mongodb client
    // const client = new MongoClient(MONGO_URI, options);

    // try {
    //     // connect to the Mongodb client, declare & connect to the database
    //     await client.connect();
    //     const db = client.db("grounded");

    //     const users = await db.collection("auth").find

    // } 

    
};

module.exports = getUsers;