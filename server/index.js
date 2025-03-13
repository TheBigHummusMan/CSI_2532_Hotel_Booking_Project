const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db")

// middleware
app.use(cors());
app.use(express.json())

//ROUTES//
// add the dirrerent actions that a user can do to modify the db, ex add a hotel to the chain, or book a room, etc
/* post add to the db, can use postman to test sending requests to the server without having the frontend ready
app.post("/route we want", async(req, res)=>{
    try{
        const {add the different values for the db} = req.body
        // write a query
        const newDataToBeAdded = await pool.query("INSERT INTO "name of the table" ("values being added") VALUES($1) RETURNING *",
        [add the different values for the db to replace the $1]"
        );

        // data to be returned
        res.json(newDataToBeAdded.rows[index])
    } catch(err{
        console.error(err.message);
    }
    //});
*/

// get data from the db
/*
app.get("/path",async(req, res)=>{
    try{
        const tableToGet = await pool.query("SELECT * FROM table");
        // returns all the table rows
        res.json(tableToGet.rows)
    } catch(err) {
        console.error(err.message)
    }
    });
*/

//get a table 
/*
app.get("/path/:primary key", ansync(req, res) => {
    try {
        console.log(req.params);
    } catch(err) {
        console.error(err.message);
    }
    });

 */

app.listen(5000, () => {
    console.log("server has started on port 5000");
});