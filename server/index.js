const express = require('express');
require('dotenv').config();
const app = express();
const dbConnect = require('./db/connect')

const port = process.env.PORT
app.use(express.json());


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});