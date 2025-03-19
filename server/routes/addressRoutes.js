const express = require("express");
const router = express.Router();
const { addAddress, getAllAddresses, getAddressByCity } = require("../controllers/addressController");

router.post("/", addAddress);
router.get("/", getAllAddresses);
router.get("/:ville", getAddressByCity);

module.exports = router;
