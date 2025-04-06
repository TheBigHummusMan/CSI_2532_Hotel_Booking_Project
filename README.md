# CSI_2532_Hotel_Booking_Project
this project has been made using the PERN (postgres, Express, React, Node) stack 

## How to start the project
Before starting, make sure you have Node.js installed https://nodejs.org/en/download

1. Make sure that postgres user is the admin account and the password is 1234, you can change the information in server/config/db.js to match the login credentials if you dont want to change it.
2. In pg admin, create a new database named "CSI_2532_hotel_project", this is case specific.
3. To download the server dependancies, open a bash terminal and cd to the server and run "npm install", after you should have a package-lock,json file and a node_modules folder.
4. To download the client dependancies, open a bash terminal and cd to the client and run "npm install", after you should have a package-lock,json file and a node_modules folder.
5. to populate the database, run the script in populating_script.sql in pg admin after changing to the new databasse directory.
6. to start the website, in the terminal thatss open in client directory, type "npm start" and in the terminal open in the server directory, run "node index", this should open the website on localhosst 3000 and the database server on localhost 5000. If you are on mac, make sure localhost 5000 is clear, there is an apple service that uses it.


## Current Functionality 

### Client:
Clients can register with their NAS, email (must be valid) password, name, city, streed address and postal code. passwords are encrypted in the database to keep users safe. Users are authenticated using jwt.
Once loggedin, they can search for a room by city name and checking and checkout date. They can optionally search with capacity, min and max rating and price.
Only rooms that havent been booked for their stay will show.
clients can also see all of the reservations that they have made.

### Employe:
Employes cannot create accounts, there is one account per hotel, for simplicity sake, all their passswords are empapass, see the table in the populating scipt for the emails and hotel numbers
Once logged in, employees can see all reservations that have not passed in date to their specific hotel.
Beside the resservations, they can turn it into a location if the current date is the checkin date (when testing, make resservations on the current day to test this functionality)
Employees can also create locations manually.

## Not implemented
The past resservationm button doesnt work.
Views have been implemented but arent used anywhere on the website.
We were only two people in the group :(