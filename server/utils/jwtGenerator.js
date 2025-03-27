const jwt = require("jsonwebtoken");
require('dotenv').config();

function jwtGenerator(){
    const payload ={
        user: nas
    }

    return jwt.sign(payload, process.env.jwtsecret, {espiresIn: "1hr"})
}
module.exports = jwtGenerator;