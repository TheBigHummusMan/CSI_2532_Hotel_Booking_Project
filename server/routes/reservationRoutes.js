// useless

const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const authorization = require("../middleware/authorization");



router.post("/reservation/create", authorization, async (req, res) => {
    try {
      const { hotelid, numdechambre, checkindate, checkoutdate } = req.body;
  
      // Insert reservation into the database
      const newReservation = await pool.query(
        "INSERT INTO reservation (clientID, hotelID, numDeChambre, checkinDate, checkoutDate) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [req.user, hotelid, numdechambre, checkindate, checkoutdate]
      );
  
      // Send a 201 response with the created reservation
      res.status(201).json(newReservation.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

  router.get("/reservation/get-employee", authorization, async(req, res) => {
    try {
          console.log("Received Employee ID:", req.user); // Debugging log

          // Fetch the employee's hotel ID
          const employeeResult = await pool.query(
            "SELECT hotelID FROM employe WHERE employeeID = $1",
            [req.user] // Fixed: using req.user from authorization middleware
          );

          if (employeeResult.rows.length === 0) {
            return res.status(404).json({ error: "Employee not found" });
          }

          const hotelid = employeeResult.rows[0].hotelid;

          const reservations = await pool.query(
            `
            SELECT 
              r.reservationID,
              r.clientID,
              c.nom,
              r.hotelID,
              r.numDeChambre,
              r.checkinDate,
              r.checkoutDate,
              r.dateReservation,
              EXISTS (
                SELECT 1 
                FROM location l 
                WHERE l.clientID = r.clientID 
                  AND l.hotelID = r.hotelID 
                  AND l.numDeChambre = r.numDeChambre
                  AND DATE(l.checkinDate) = DATE(r.checkinDate)
              ) AS isCheckedIn
            FROM reservation r
            INNER JOIN client c ON r.clientID = c.nas
            WHERE r.hotelID = $1 AND r.checkindate >= CURRENT_DATE
            ORDER BY r.dateReservation DESC;
            `,
            [hotelid]
          );

          console.log("Reservations Data:", reservations.rows);
          res.status(200).json(reservations.rows);
          
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Server error" }); // Better error response
    }
});


  router.get("/reservation/get", authorization, async (req, res) => {
    try {
      console.log("NAS = " + req.user);
      let reservations = await pool.query(
          "SELECT r.reservationID,h.nomDeChaine,r.numDeChambre,r.checkinDate,r.checkoutDate,r.datereservation FROM reservation r JOIN hotel h ON r.hotelID = h.hotelID WHERE r.clientID = $1 ORDER BY r.datereservation DESC;",
          [req.user]   
        );
  
      // debugging line
      console.log("Reservations Data:", reservations.rows);

      // Send the reservations as a JSON response
      res.status(200).json(reservations.rows);

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

  

module.exports = router;
