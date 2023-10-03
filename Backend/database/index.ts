// import mysql2 from "mysql2/promise" 

// const pool = mysql2.createPool({
//     host: 'localhost',
//     user: 'root',
//     port: 3306,
//     password: "tamir123",
//     database: 'project3',
// });

// export { pool }

import dotenv from "dotenv"; 

dotenv.config();

const Client = require("pg").Client

const pool = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});
pool.connect()
export { pool }