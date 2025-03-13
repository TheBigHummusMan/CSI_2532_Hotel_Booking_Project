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
