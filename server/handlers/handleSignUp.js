// for password encryption
const bcrypt = require("bcrypt");

// for unique id number
const { v4: uuidv4 } = require("uuid");


const { MongoClient} = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;


const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};


const handleSignUp = async (request, response) => {
    const { name, email, password } = request.body;
    
    // checks that the required fields are not empty.
    if (!name || !email || !password) {
        return response
            .status(400)
            .json({ status: 400, error: "Missing information" });
    }

    // create a new Mongodb client
    const client = new MongoClient(MONGO_URI, options);
    
    try {
        // connect to the Mongodb client, declare & connect to the database
        await client.connect();
        const db = client.db("grounded");
        console.log("connected");

        // generates a random id 
        const id = uuidv4();

        // checks if the email already is being used & in the collection.
        const emailAlreadyInUse = await db.collection("auth").findOne({ _id: id });

        if (emailAlreadyInUse) {
            response
                .status(409)
                .json({ status: 409, error: "Email already in use" });
        }

        // encrypts the password provided by user.
        const hashedPassword = await bcrypt.hash(password, 10);

        // adds a new document to the auth collection
        await db.collection("auth").insertOne({ _id: id, email, password: hashedPassword});
        
        // declares the body to be created for each new account in the accounts collection.
        const newAccount = { _id: id, name, email };

        // adds a new document to the accounts collection.
        await db.collection("accounts").insertOne(newAccount);

        return response
            .status(201)
            .json({
            status: 201,
            message: "Account created successfully",
            data: newAccount,
        });
    } catch (error) {
        return response.status(500).json({ status: 500, error: error.message });
    } finally {
        // disconnects from Mongodb
        client.close();
    }
};


module.exports = handleSignUp;
