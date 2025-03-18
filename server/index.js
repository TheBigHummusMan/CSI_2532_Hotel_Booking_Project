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
        res.json(address.rows);
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

        res.json(address.rows);
    } catch(err) {
        console.error(err.message);
    }
    });

// gets all hotels from the db
/* not required because the next get method can return without any parameters
app.get("/search/hotel",async(req, res)=>{
    try {
        const hotel = await pool.query("SELECT * FROM hotel");
        res.json(hotel.rows);
    } catch (err) {
        console.error(err.message);
    }
});
*/
// get the hotel based off of the city name
app.get("/search/hotel", async(req, res)=>{
    try {
        console.log("Received query parameters for hotel search:", req.query);

        let queryStr = `
            SELECT h.*, a.ville, a.adresseDeRue, c.rating 
            FROM hotel h
            JOIN address a ON h.addressID = a.addressID
            JOIN chainehoteliere c ON h.nomDeChaine = c.nomDeChaine
            WHERE 1=1
        `;

        let {ville, minRating,maxRating,adresseDeRue}=req.query;
        let params = [];
        let paramIndex = 1;

        if (ville){
            queryStr+=` AND a.ville ILIKE $${paramIndex}`;
            params.push(`%${ville}%`);
            paramIndex++;
        }
        if (minRating){
            console.log("visited")
            queryStr += ` AND c.rating >= $${paramIndex}`;
            params.push(parseFloat(minRating));
            paramIndex++;
        }
        if (maxRating){
            console.log("visited")
            queryStr += ` AND c.rating <= $${paramIndex}`;
            params.push(parseFloat(maxRating));
            paramIndex++;
        }
        if (adresseDeRue){
            queryStr+=` AND a.adresseDeRue ILIKE $${paramIndex}`;
            params.push(`%${adresseDeRue}%`);
            paramIndex++;
        }

        //debub logs
        //console.log("Generated SQL Query:", queryStr);
        //console.log("Query Parameters:", params);

        // old query to onlu get based off of city name, const hotel = await pool.query("SELECT h.* FROM hotel h JOIN Address a ON h.addressID = a.addressID WHERE a.ville ILIKE $1", [`%${ville}%`]);
        const hotels = await pool.query(queryStr, params);
        res.json(hotels.rows);

    } catch (err) {
        console.error(err.message)
    }
});

// get the room based off of the same criteria but gets all the rooms instead
app.get("/search/chambre", async(req, res)=>{
    try {
        console.log("Received query parameters for rooms:", req.query);

        let queryStr = `
            SELECT r.*
            FROM chambre r
            JOIN hotel h ON h.hotelid = r.hotelid
            JOIN address a ON h.addressID = a.addressID
            JOIN chainehoteliere c ON h.nomDeChaine = c.nomDeChaine
            WHERE 1=1
        `;

        let {ville, minRating,maxRating,adresseDeRue}=req.query;
        let params = [];
        let paramIndex = 1;

        if (ville){
            queryStr+=` AND a.ville ILIKE $${paramIndex}`;
            params.push(`%${ville}%`);
            paramIndex++;
        }
        if (minRating){
            console.log("visited")
            queryStr += ` AND c.rating >= $${paramIndex}`;
            params.push(parseFloat(minRating));
            paramIndex++;
        }
        if (maxRating){
            console.log("visited")
            queryStr += ` AND c.rating <= $${paramIndex}`;
            params.push(parseFloat(maxRating));
            paramIndex++;
        }
        if (adresseDeRue){
            queryStr+=` AND a.adresseDeRue ILIKE $${paramIndex}`;
            params.push(`%${adresseDeRue}%`);
            paramIndex++;
        }

        //debub logs
        //console.log("Generated SQL Query:", queryStr);
        //console.log("Query Parameters:", params);

        // old query to onlu get based off of city name, const hotel = await pool.query("SELECT h.* FROM hotel h JOIN Address a ON h.addressID = a.addressID WHERE a.ville ILIKE $1", [`%${ville}%`]);
        const chambre = await pool.query(queryStr, params);
        res.json(chambre.rows);

    } catch (err) {
        console.error(err.message)
    }
});

/* you never need to edit an adress but here is what it would look like
app.post("/address/:"), async(req,res)=>{
    try {
        
    } catch (err) {
        console.error(err.message);
    }
}
*/


app.listen(5000, () => {
    console.log("server has started on port 5000");
});