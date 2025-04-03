const router = require('express').Router();
const pool = require('../config/db');
const authorization = require('../middleware/authorization');

router.get("/dashboard/client", authorization, async (req, res) => {
  try {
    console.log("Dashboard Route Hit"); // Log when the route is accessed
    console.log("User ID from Token:", req.user);
    const user = await pool.query("SELECT nom FROM client WHERE nas = $1", [req.user]);
    console.log("User Data:", user.rows[0]); // Log the user data

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

//dashboard for employe
router.get("/dashboard/employe", authorization, async (req, res) => {
  try {
    // 1. Get employee's hotel ID (FIXED the query that was missing in your repo)
    const employee = await pool.query(
      `SELECT e.employeeid, e.nom, e.hotelid 
       FROM employe e
       WHERE e.employeeid = $1`,
      [req.user]
    );

    if (employee.rows.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }

    const hotelId = employee.rows[0].hotelid;
    const today = new Date().toISOString().split('T')[0];

    // 2. Get reservations (FIXED the query that was failing)
    const reservations = await pool.query(
      `SELECT 
        r.reservationid,
        r.clientid,
        c.nom as client_name,
        r.hotelid,
        r.numdechambre,
        r.checkindate,
        r.checkoutdate,
        EXISTS (
          SELECT 1 FROM location l 
          WHERE l.clientid = r.clientid 
          AND l.hotelid = r.hotelid
          AND l.numdechambre = r.numdechambre
          AND DATE(l.checkindate) = DATE(r.checkindate)
        ) as ischeckedin
       FROM reservation r
       JOIN client c ON r.clientid = c.nas
       WHERE r.hotelid = $1
       AND DATE(r.checkindate) = $2`,
      [hotelId, today]
    );

    res.json({
      employee: employee.rows[0],
      reservations: reservations.rows,
      hotelId: hotelId
    });

  } catch (err) {
    console.error("DASHBOARD ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;