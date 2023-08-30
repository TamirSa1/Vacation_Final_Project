import mysql2 from "mysql2/promise" 

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: "tamir123",
    database: '', // לשים לב לשם הסכמה בSQL
});

export { pool }