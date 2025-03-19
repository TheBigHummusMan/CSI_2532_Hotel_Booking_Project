const express = require("express");
const router = express.Router();
const { searchRoom } = require("../controllers/roomController");

router.get("/search/chambre", searchRoom);

module.exports = router;
