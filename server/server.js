const express = require('express');
const morgan = require('morgan');

const handleSignIn = require('./handlers/handleSignIn');
const handleSignUp = require('./handlers/handleSignUp');

const app = express()
const port = 8000

app.use(morgan("tiny"))
app.use(express.json());

// Endpoints.
app.post('/api/signin', handleSignIn)

app.post('/api/signup', handleSignUp)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

