const express = require("express");
const app = express();
express.Router
const cors = require("cors");
const pool = require("./config/db");

// middleware
app.use(cors());
app.use(express.json());

//ROUTES//
// add the dirrerent actions that a user can do to modify the db, ex add a hotel to the chain, or book a room, etc
// post add to the db, can use postman to test sending requests to the server without having the frontend ready

const addressRoutes = require("./routes/addressRoutes");
const hotelRoutes = require("./routes/hotelRoutes");
const roomRoutes = require("./routes/roomRoutes");


app.use("/address", addressRoutes);
app.use("/", hotelRoutes);
app.use("/", roomRoutes);




// listens to port 5000 where the server is being locally hosted
app.listen(5000, () => {
    console.log("server has started on port 5000");
});