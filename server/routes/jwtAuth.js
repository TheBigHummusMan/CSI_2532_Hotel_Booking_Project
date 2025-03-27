const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");


// registering
router.post("/register/client", validInfo, async (req, res) => {
    try {
        const { nas, nom, password, email, ville, adressederue, codepostal } = req.body;

        // Check if user exists
        const user = await pool.query("SELECT * FROM client WHERE nas = $1", [nas]);

        if (user.rows.length !== 0) {
            return res.status(401).json({ error: "User already exists" });
        }

        // Encrypt password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        let addressId;
        // Check if address exists
        const address = await pool.query(
            "SELECT addressid FROM address WHERE ville = $1 AND adressederue = $2 AND codepostal = $3",
            [ville, adressederue, codepostal]
        );

        if (address.rows.length !== 0) {
            addressId = address.rows[0].addressid;
        } else {
            // Create new address
            const newAddress = await pool.query(
                "INSERT INTO address (ville, adressederue, codepostal) VALUES($1, $2, $3) RETURNING addressid",
                [ville, adressederue, codepostal]
            );
            addressId = newAddress.rows[0].addressid;
        }

        // Create new user
        const newUser = await pool.query(
            "INSERT INTO client (nas, nom, addressid, password, email) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [nas, nom, addressId, bcryptPassword, email]
        );

        // Generate token
        const token = jwtGenerator(newUser.rows[0].nas);
        res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error during registration" });
    }
});

// login route
router.post("/login/client", validInfo,async(req,res)=>{
    try {
        const {email, password} = req.body

        const user = await pool.query("SELECT * FROM client WHERE email = $1",
            [email]
        );

        if (user.rows.length == 0){
            return res.status(401).json("user doesn't exist");
        };

        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if (!validPassword){
            return res.status(401).json("password or email is incorrect");
        }

        const token = jwtGenerator(user.rows[0].nas);
        res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error during registration" });
    }
});

router.get("/auth/is-verify", authorization, async(req, res)=>{
    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error during registration" });
    }
});

module.exports = router;