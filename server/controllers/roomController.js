const pool = require("../config/db");


// get the room based off of the same criteria but gets all the rooms instead
const searchRoom = async(req, res)=>{
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

        // send back the room
        const chambre = await pool.query(queryStr, params);
        res.json(chambre.rows);

    // error handleing
    } catch (err) {
        console.error(err.message)
    }
};

module.exports = {searchRoom};