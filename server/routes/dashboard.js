const router = require('express').Router();
const pool = require('../config/db');
const authorization = require('../middleware/authorization');

router.get("/dashboard", authorization, async (req, res) => {
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


module.exports = router;