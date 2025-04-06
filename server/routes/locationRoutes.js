const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const authorization = require("../middleware/authorization");

// Backend Route to Check if a Location Exists
router.get("/employee/location/past",authorization, async (req, res) => {
  try {

    const employeeResult = await pool.query(
      "SELECT hotelID FROM employe WHERE employeeID = $1",
      [req.user] // Fixed: using req.user from authorization middleware
    );

    // check to see if we got an employe id
    if (employeeResult.rows.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }

    const hotelid = employeeResult.rows[0].hotelid;
    // Query the location table to check if a location exists

    const result = await pool.query(
      `SELECT 
        l.locationid,
        l.checkindate,
        l.checkoutdate,
        l.numdechambre,
        c.nas,
        c.nom,
        c.email,
        h.hotelid
       FROM location l
       JOIN client c ON l.clientid = c.nas
       JOIN hotel h ON l.hotelid = h.hotelid
       WHERE l.hotelid = $1
       ORDER BY l.checkoutdate DESC`,
      [hotelid]
    );

    //debug line
    //console.log(result.rows);

    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Backend Route to Create a Location
router.post("/location/create",authorization, async (req, res) => {
  try {
    const { clientid, employeeid, hotelid, numdechambre, checkindate, checkoutdate } = req.body;

    // Insert the location into the database
    const newLocation = await pool.query(
      `
      INSERT INTO location (clientid, employeeid, hotelid, numDeChambre, checkinDate, checkoutDate)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
      `,
      [clientid, employeeid, hotelid, numdechambre, checkindate, checkoutdate]
    );

    res.status(201).json(newLocation.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;