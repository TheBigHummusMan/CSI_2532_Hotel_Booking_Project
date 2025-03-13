const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());

//ROUTES//
// add the dirrerent actions that a user can do to modify the db, ex add a hotel to the chain, or book a room, etc
// post add to the db, can use postman to test sending requests to the server without having the frontend ready


// creates a new address using a city, street name and postal code
app.post("/address", async(req, res)=>{
    try{
        const {ville,adresseDeRue,codePostal} = req.body;
        // write a query
        const newDataToBeAdded = await pool.query("INSERT INTO address (ville, adresseDeRue, codePostal) VALUES ($1, $2, $3) RETURNING *",
            [ville,adresseDeRue,codePostal]
        );

        // data to be returned
        console.log(newDataToBeAdded.rows[0]);
        res.json(newDataToBeAdded.rows[0]);
    } catch(err){
        console.error(err.message);
    }
    });


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