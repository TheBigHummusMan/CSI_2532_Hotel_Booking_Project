// useless

const express = require("express");
const router = express.Router();
const pool = require("../config/db");


router.post("reservation/create", async(req,res)=>{
    try {
        const {clientid,hotelid,numdechambre,checkindate,checkoutdate} = req.body;
        // write a query
        const newReservation = await pool.query("INSERT INTO reservation (clientid,hotelid,numdechambre,checkindate,checkoutdate) VALUES ($1, $2, $3, $4, $5)",
            [clientid,hotelid,numdechambre,checkindate,checkoutdate]
        );
        
    } catch (err) {
        console.error(err.message);
        
    }
});

router.get("reservation/get",async(req,res)=>{
    try {
        let queryStr = `
        SELECT * 
        FROM reservation
        WHERE 1=1
    `;

    const reservation = await pool.query(queryStr);
    res.json(reservation.rows);

    
    
    } catch (err) {
        console.error(err.message);
        
    }
});

module.exports = router;
