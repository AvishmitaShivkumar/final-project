const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const handleSignIn = require('./handlers/handleSignIn');
const handleSignUp = require('./handlers/handleSignUp');
const addGratitude = require('./handlers/addGratitude');
const getUserGratitude = require('./handlers/getUserGratitude');
const addMeditation = require('./handlers/addMeditation');
const editGratitude = require('./handlers/editGratitude');
const deleteGratitude = require('./handlers/deleteGratitude');
const getQuotes = require('./handlers/getQuotes');

const app = express()
const port = 8000

// Handles cors error with the cors package
app.use(cors());

app.use(morgan("tiny"));
app.use(express.json());

// Endpoints.
app.post("/api/signin", handleSignIn)

app.post("/api/signup", handleSignUp)

app.post("/api/gratitude", addGratitude)

app.get("/api/gratitude/:_id", getUserGratitude)

app.patch("/api/gratitude/edit", editGratitude)

app.delete("/api/gratitude/delete", deleteGratitude)

app.post("/api/meditation", addMeditation)

app.get("/api/quote", getQuotes)

// for the render health check 
app.get("/hello", (_, res) => res.send("Hello from Grounded"))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

