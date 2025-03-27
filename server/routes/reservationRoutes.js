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

        reservations = await pool.query(
          `
          WITH employee_hotel AS (
            SELECT hotelID
            FROM employe
            WHERE employeeID = $1
          )
          SELECT 
            c.nom, 
            r.hotelid, 
            r.checkindate, 
            r.checkoutdate, 
            r.datereservation,
            r.numdechambre,
            r.clientid
          FROM reservation r
          JOIN client c ON r.clientid = c.nas
          WHERE r.hotelid = (SELECT hotelID FROM employee_hotel)
          ORDER BY r.datereservation DESC
          `,
          [employeeid]
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
