// for password encryption
const bcrypt = require('bcrypt');

const { MongoClient} = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const handleSignIn = async (request, response) => {
    const { email, password } = request.body;

    // checks that the email and password are not empty.
    if(!email || !password) {
        return response.status(400).json({status: 400, error: "Missing information"})
    }

    // create a new Mongodb client
    const client = new MongoClient(MONGO_URI, options);

    try {
        // connect to the Mongodb client, declare & connect to the database
        await client.connect();
        const db = client.db("grounded");

        // finds one user with their email as id.
        const foundUser = await db.collection("auth").findOne({ email });
        console.log(foundUser)

        if (!foundUser) {
            return response.status(404).json({status: 404, error: `${email} does not have an account. Please sign up.`})
        }; 

        // uses bcrypt to compare user entered password against the encrypted one in collection
        const matchingPassword = await bcrypt.compare(password, foundUser.password);

        if (!matchingPassword) {
            return response.status(401).json({status: 401 , error:"Incorrect password"})
        };

        // finds the matching user account by email in the accounts collection.
        const foundAccount = await db.collection("accounts").findOne({ email });

        if (!foundAccount) {
            return response.status(404).json({status: 404, error: `${email} does not have an account. Please sign up to create an account.`})
        }; 
        
        response.status(200).json({ status: 200, data: foundAccount })
    } catch (error) {
        response.status(500).json({ status: 500, error: error.message })
    } finally {
        client.close();
    }
};


module.exports =  handleSignIn;