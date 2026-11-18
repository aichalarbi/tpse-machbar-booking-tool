//This file will contain the code responsible for connecting to MySQL.
//mysql2/promise allows us to communicate with MySQL using async/await
const mysql = require("mysql2/promise");
//dotenv reads the settings from .env.
require("dotenv").config();

//createPool() creates a reusable collection of database connections.
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    waitForConnections: true,
    connectionLimit: 10
});

//module.exports makes the connection available to other backend files.
module.exports = pool;
