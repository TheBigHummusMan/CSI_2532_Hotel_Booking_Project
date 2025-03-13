const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgress",
    password: "1234",
    host: "localhost",
    port: 4532,
    database: "add db name here"
});

module.exports = pool;