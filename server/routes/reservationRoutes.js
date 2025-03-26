// useless

const express = require("express");
const router = express.Router();
const pool = require("../config/db");


router.post("/reservation/create", async (req, res) => {
    try {
      const { clientid, hotelid, numdechambre, checkindate, checkoutdate } = req.body;
  
      // Insert reservation into the database
      const newReservation = await pool.query(
        "INSERT INTO reservation (clientID, hotelID, numDeChambre, checkinDate, checkoutDate) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [clientid, hotelid, numdechambre, checkindate, checkoutdate]
      );
  
      // Send a 201 response with the created reservation
      res.status(201).json(newReservation.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

router.get("reservation/get",async(req,res)=>{
    try {
        
    } catch (err) {
        console.error(err.message);
        
    }
});

module.exports = router;
