const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// Backend Route to Check if a Location Exists
router.get("/location/exists", async (req, res) => {
  try {
    const { clientid, hotelid, numdechambre } = req.query;

    // Validate query parameters
    if (!clientid || !hotelid || !numdechambre) {
      return res.status(400).send("Missing required parameters");
    }

    // Query the location table to check if a location exists
    const result = await pool.query(
      `
      SELECT * FROM location 
      WHERE clientID = $1 AND hotelID = $2 AND numDeChambre = $3
      `,
      [clientid, hotelid, numdechambre]
    );

    res.status(200).json({ exists: result.rows.length > 0 });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Backend Route to Create a Location
router.post("/location/create", async (req, res) => {
  try {
    const { clientid, employeeid, hotelid, numDeChambre, checkinDate, checkoutDate } = req.body;

    // Insert the location into the database
    const newLocation = await pool.query(
      `
      INSERT INTO location (clientid, employeeid, hotelid, numDeChambre, checkinDate, checkoutDate)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
      `,
      [clientid, employeeid, hotelid, numDeChambre, checkinDate, checkoutDate]
    );

    res.status(201).json(newLocation.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;