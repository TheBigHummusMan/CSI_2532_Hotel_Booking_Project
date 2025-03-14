--------------------- When a client registers, first insert an address with what he put, then insert a client---------------------
----------------------------------------------------------------------------------------------------------------------------------
BEGIN; -- Start the transaction

-- naming the address inputed by the user
WITH inserted_address AS (
    INSERT INTO Address (ville, addressderue, codepostal)
    VALUES ($1, $2, $3)
    RETURNING addressID
)

-- Insert the client using the addressID from the previous query
INSERT INTO Client (nas, nom, addressid)
VALUES ($4, $5, (SELECT addressID FROM inserted_address))
RETURNING *;

COMMIT; -- Commit the transaction





--------------------- When a client narrows his search down to a specific location, we send the hotels in that area (ville) ---------------------
-------------------------------------------------------------------------------------------------------------------------------------------------
SELECT h.nomDeChaine, h.numTelephone, h.email, a.ville, a.addressderue
FROM hotel h
JOIN Address a ON h.addressID = a.addressID
WHERE a.ville = $1;






--------------------- When a client picks the hotel, we need to show the available rooms ------------------------------------------
--------------Here, $1 is the hotelID, $2 and $3 are the desired checkin and checkout dates, respectively -------------------------
-----------------------------------------------------------------------------------------------------------------------------------
SELECT c.numDeChambre, c.prix, c.commodites, c.capacite, c.vue
FROM chambre c
WHERE c.hotelID = $1
  AND NOT EXISTS (
      SELECT 1
      FROM reservation r
      WHERE r.hotelID = c.hotelID
        AND r.numDeChambre = c.numDeChambre
        AND (
            ($2 BETWEEN r.checkinDate AND r.checkoutDate) OR
            ($3 BETWEEN r.checkinDate AND r.checkoutDate) OR
            ($2 <= r.checkinDate AND $3 >= r.checkoutDate)
        )
  );







--------------------- When a client makes a reservation, the details get inserted in our reservation table ---------------------
--------------------------------------------------------------------------------------------------------------------------------
INSERT INTO reservation (clientID, hotelID, numDeChambre, checkinDate, checkoutDate, dateReservation)
VALUES ($1, $2, $3, $4, $5, NOW())
RETURNING *;