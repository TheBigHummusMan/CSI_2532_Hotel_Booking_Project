
const express = require("express");
const router = express.Router();
const pool = require("../config/db");


router.get("/hotel/search", async(req, res)=>{
    try {
        // debug for query parameters
        //console.log("Received query parameters for hotel search:", req.query);

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

        // these if statements check to see if the parameter exists and adds to the query accordingly
        if (ville){
            queryStr+=` AND a.ville ILIKE $${paramIndex}`;
            params.push(`%${ville}%`);
            paramIndex++;
        }
        if (minRating){
            queryStr += ` AND c.rating >= $${paramIndex}`;
            params.push(parseFloat(minRating));
            paramIndex++;
        }
        if (maxRating){
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


module.exports = router;
