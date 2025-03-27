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

  router.get("/reservation/get", async (req, res) => {
    try {
      // Extract clientID from query parameters (or authentication context)
      const { clientid } = req.query;
      

      let reservations;
  
      if (clientid) {
        // Case 1: Client requests their own reservations
        reservations = await pool.query(
          "SELECT r.reservationID,h.nomDeChaine,r.numDeChambre,r.checkinDate,r.checkoutDate,r.datereservation FROM reservation r JOIN hotel h ON r.hotelID = h.hotelID WHERE r.clientID = $1 ORDER BY r.datereservation DESC;",
          [clientid]   
        );
      } else {
        const { employeeid } = req.query;

        console.log("Received Employee ID:", employeeid); // Debugging log

        // Fetch the employee's hotel ID
        const employeeResult = await pool.query(
          "SELECT hotelID FROM employe WHERE employeeID = $1",
          [employeeid]
        );

        const hotelid = employeeResult.rows[0].hotelid;

        reservations = await pool.query(
          `
          SELECT 
            r.reservationID,
            r.clientID,
            c.nom,
            r.hotelID,
            r.numDeChambre,
            r.checkinDate,
            r.checkoutDate,
            EXISTS (
              SELECT 1 
              FROM location l 
              WHERE l.clientID = r.clientID 
                AND l.hotelID = r.hotelID 
                AND l.numDeChambre = r.numDeChambre
            ) AS isCheckedIn
          FROM reservation r
          INNER JOIN client c ON r.clientID = c.nas
          WHERE r.hotelID = $1
          ORDER BY r.dateReservation DESC;
          `,
          [hotelid]
        );
      }
  
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
