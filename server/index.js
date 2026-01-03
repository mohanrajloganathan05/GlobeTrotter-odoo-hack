const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const dbConnect = require('./db/connect')
const signupRoute = require('./routes/authentication/signup')
const loginRoute = require('./routes/authentication/login');

const port = process.env.PORT
app.use(express.json());
app.use(cors());

app.use('/signup',signupRoute);
app.use('/login',loginRoute);


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});