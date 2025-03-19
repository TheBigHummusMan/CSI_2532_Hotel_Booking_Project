const pool = require("../config/db");

// next 3 was for me to get familiarised with how do run a search, they can be mostly removed except for the add address
// creates a new address using a city, street name and postal code
const addAddress = async(req, res)=>{
    try{
        const {ville,adresseDeRue,codePostal} = req.body;
        // write a query
        const newDataToBeAdded = await pool.query("INSERT INTO address (ville, adresseDeRue, codePostal) VALUES ($1, $2, $3) RETURNING *",
            [ville,adresseDeRue,codePostal]
        );

        // data to be returned
        console.log(newDataToBeAdded.rows[0]);
        res.json(newDataToBeAdded.rows[0]);
    } catch(err){
        console.error(err.message);
    }
    };


// get all the addresses
const getAllAddresses = async(req, res)=>{
    try{
        const address = await pool.query("SELECT * FROM address");
        // returns all the table rows
        res.json(address.rows);
    } catch(err) {
        console.error(err.message)
    }
    };


//get the address from a key, in this case, the city name
const getAddressByCity = async(req, res) => {
    try {
        const {ville} = req.params;
        // finds address with a partial city name
        const address = await pool.query("SELECT * FROM address WHERE ville ILIKE $1",[`%${ville}%`]);

        res.json(address.rows);
    } catch(err) {
        console.error(err.message);
    }
};
// end of started methods

module.exports = { addAddress, getAllAddresses, getAddressByCity };
