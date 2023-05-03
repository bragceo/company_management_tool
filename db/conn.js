const mysql = require('mysql2');
require('dotenv').config();

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        port: 3306,
        user: process.env.DB_USER,
        password: "Melnick34?",
        database: "employees"
    },
);

module.exports = db;