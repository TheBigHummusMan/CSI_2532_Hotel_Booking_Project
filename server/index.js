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


// get all the addresses
app.get("/address",async(req, res)=>{
    try{
        const address = await pool.query("SELECT * FROM address");
        // returns all the table rows
        res.json(address.rows)
    } catch(err) {
        console.error(err.message)
    }
    });


//get the address from a key, in this case, the city name
app.get("/address/:ville", async(req, res) => {
    try {
        const {ville} = req.params;
        // finds address with a partial city name
        const address = await pool.query("SELECT * FROM address WHERE ville ILIKE $1",[`%${ville}%`]);

        res.json(address.rows)
    } catch(err) {
        console.error(err.message);
    }
    });



app.listen(5000, () => {
    console.log("server has started on port 5000");
});