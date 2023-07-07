const express = require('express');
const morgan = require('morgan');

const handleSignIn = require('./handlers/handleSignIn');
const handleSignUp = require('./handlers/handleSignUp');
const getUsers = require('./handlers/getUsers');
const handleGratitude = require('./handlers/handleGratitude');

const app = express()
const port = 8001

app.use(morgan("tiny"))
app.use(express.json());

// Endpoints.
app.post("/api/signin", handleSignIn)

app.post("/api/signup", handleSignUp)

app.post("/api/gratitude", handleGratitude)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

