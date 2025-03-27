const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");

// registering
router.post("/register/client",async(req,res)=>{
    try {
        const {nas,nom,password,email,ville,adressederue,codepostal} = req.body;

        // check to see if the user exists, if he does, throw an error
        const user = await pool.query("SELECT * FROM client WHERE nas = $1 ",[nas]);

        if (user.rows.length !== 0 ){
            return res.status(401).send("user already exists");
        };

        // encrypts the password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        
        const bcryptPassword = await bcrypt.hash(password,salt);

        //query to create address if it doesnt exist, then create the user with that address id, i do this to avoid having duplicate addresses in the db
        const address = await pool.query("SELECT 1 FROM address WHERE ville = $1 AND adressederue = $2 AND codepostal = $3",
            [ville, adressederue, codepostal]);
        //if the address exists
        if (address.rows.length !== 0){
            const newUser = await pool.query("INSERT INTO client (nas, nom, addressid, password, email) VALUES($1, $2, $3, $4, $5) RETURNING *",
                [nas, nom, address.rows[0].addressid.addressid, bcryptPassword, email]);
        }
        else{
            const newAddress = await pool.query("INSERT INTO Address (ville, adresseDeRue, codePostal) VALUES($1, $2, $3) RETURNING addressId",
                [ville,adressederue,codepostal]);

            const newUser = await pool.query("INSERT INTO client (nas, nom, addressid, password, email) VALUES($1, $2, $3, $4, $5) RETURNING *",
                [nas, nom, newAddress.rows[0].addressid, bcryptPassword, email]);
        }

        //res.json(newUser);

        const token = jwtGenerator(newUser.rows[0].nas);
        res.json({token});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
})

module.exports = router;
