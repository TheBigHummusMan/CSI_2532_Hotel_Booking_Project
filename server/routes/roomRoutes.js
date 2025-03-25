const express = require("express");
const router = express.Router();
const pool = require("../config/db");


// get the room based with a city, min and max rating, a street address, min and max price and room capacity
router.get("/chambre/search", async(req, res)=>{
    try {
        // debug for query parameters
        //console.log("Received query parameters for rooms:", req.query);

        let queryStr = `
            SELECT r.*
            FROM chambre r
            JOIN hotel h ON h.hotelid = r.hotelid
            JOIN address a ON h.addressID = a.addressID
            JOIN chainehoteliere c ON h.nomDeChaine = c.nomDeChaine
            WHERE 1=1
        `;

        let {ville, minRating,maxRating,adresseDeRue,minPrice,maxPrice,capacity,checkinDate,checkoutDate }=req.query;
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
            queryStr += ` AND a.adresseDeRue ILIKE $${paramIndex}`;
            params.push(`%${adresseDeRue}%`);
            paramIndex++;
        }
        if (minPrice){
            queryStr += ` AND r.prix >= $${paramIndex}`;
            params.push(parseFloat(minPrice));
            paramIndex++;
        }
        if (maxPrice){
            queryStr += ` AND r.prix <= $${paramIndex}`;
            params.push(parseFloat(maxPrice));
            paramIndex++;
        }
        if (capacity){
            queryStr += ` AND r.capacite = $${paramIndex}`;
            params.push(parseFloat(capacity));
            paramIndex++;
        }

        if (checkinDate && checkoutDate) {
            queryStr += `
                AND NOT EXISTS (
                    SELECT 1 FROM reservation res
                    WHERE res.hotelID = r.hotelID
                    AND res.numDeChambre = r.numDeChambre
                    AND res.checkinDate < $${paramIndex + 1}
                    AND res.checkoutDate > $${paramIndex}
                )
            `;
            params.push(checkoutDate, checkinDate); // Ensure correct order
        }


        // debub logs
        //console.log("Generated SQL Query:", queryStr);
        //console.log("Query Parameters:", params);

        // send back the room
        const chambre = await pool.query(queryStr, params);
        res.json(chambre.rows);

    // error handleing
    } catch (err) {
        console.error(err.message)
    }
});

module.exports = router;
