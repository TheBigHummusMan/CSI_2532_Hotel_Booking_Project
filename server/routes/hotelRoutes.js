const express = require("express");
const router = express.Router();
const { searchHotels } = require("../controllers/hotelController");

router.get("/search/hotel", searchHotels);

module.exports = router;
