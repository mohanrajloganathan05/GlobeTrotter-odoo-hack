const mysql = require('mysql2');
require('dotenv').config();

// create connection
const dbConnect = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

// connect
dbConnect.connect((err) => {
  if (err) {
    console.error('MySQL connection failed:', err);
    return;
  }
  console.log('MySQL connected');
});

module.exports = dbConnect;