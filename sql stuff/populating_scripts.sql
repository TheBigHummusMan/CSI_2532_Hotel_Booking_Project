-------------------
-- Table Creation -
-------------------
-- can create
CREATE TABLE Address (
    addressID SERIAL PRIMARY KEY,
    ville VARCHAR(255) NOT NULL,
    adresseDeRue VARCHAR(255) NOT NULL,
    codePostal VARCHAR(255) NOT NULL
);
CREATE TABLE ChaineHoteliere (
    nomDeChaine VARCHAR(255) PRIMARY KEY,
    nombreDeHotels INT CHECK (nombreDeHotels > 0),
    addressID INT CHECK (addressID >= 0),
    rating NUMERIC(2,1),
    FOREIGN KEY (addressID) REFERENCES address(addressID) on delete cascade
);

-- can create
create table EmailChaine (
	email varchar(255) not null primary key,
	nomDeChaine varchar(255) not null,
	foreign key (nomDeChaine) references ChaineHoteliere(nomDeChaine) on delete cascade on update cascade
);

-- can create
create table TelephoneChaine (
	numeroTelephone varchar(255) not null PRIMARY KEY,
    nomDeChaine varchar(255) not null,
    foreign key (nomDeChaine) REFERENCES ChaineHoteliere(nomDeChaine) on delete cascade on update cascade
);
create table hotel (
	hotelID serial primary key,
	nombreDeChambres int check (nombreDeChambres >= 0),
	numTelephone varchar(255) not null,
	addressID int not null,
	nomDeChaine varchar(255) not null,
	email varchar(255) not null,
	foreign key (nomDeChaine) references ChaineHoteliere(nomDeChaine) on delete cascade on update cascade,
	foreign key (addressID) references Address(addressID) on delete cascade
);
create table employe (
	employeeID serial primary key,
    email varchar(255) not null,
    password varchar(255) not null,
	nom varchar(255) not null,
	addressID int not null,
	hotelID int check (hotelID >= 0) not null,
	foreign key (addressID) references address(addressID) on delete cascade,
	foreign key (hotelID) references hotel(hotelID)
);

-- can create
create table client (
	nas int check (nas > 0) primary key,
    email varchar(255) not null,
    password varchar(255) not null,
	nom varchar(255) not null,
	addressID int not null,
	foreign key (addressID) references address(addressID) on delete cascade
);
create table chambre (
	numDeChambre int check (numDeChambre > 0),
	hotelID int check (hotelID >= 0),
	prix decimal(10,2) check (prix >= 0),
	commodites varchar(255) not null,
	capacite int check (capacite > 0),
	vue varchar(255),
	domages varchar(255),
	foreign key (hotelID) references hotel(hotelID),
	primary key (numDeChambre, hotelID)
);

-- can create
create table location (
	locationID serial primary key,
	clientID int check (clientID >= 0),
	employeeID int check (employeeID >= 0),
	hotelID int check (hotelID >= 0),
	numDeChambre int check (numDeChambre > 0),
	checkinDate timestamp,
	checkoutDate timestamp,
	foreign key (clientID) references client(NAS),
	foreign key (employeeID) references employe(employeeID),
	foreign key (hotelID) references hotel(hotelID),
	foreign key (numDeChambre, hotelID) references chambre(numDeChambre, hotelID)
);

-- can create
create table reservation (
	reservationID serial primary key,
	clientID int check (clientID >= 0),
	hotelID int check (hotelID >= 0),
	numDeChambre int check (numDeChambre > 0),
	checkinDate timestamp,
	checkoutDate timestamp,
	dateReservation timestamp DEFAULT now(),
	foreign key (clientID) references client(NAS),
	foreign key (hotelID) references hotel(hotelID),
	foreign key (numDeChambre, hotelID) references chambre(numDeChambre, hotelID)
);




----------------------------------------------------------------------------------------------------------------------------
-- Populating with addresses for Chain offices -----------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------
insert into address (ville, adressederue, codepostal) 
values ('Ottawa', '123 Laurier Avenue', 'L0L 5E2'),
		('Toronto', '124 Macdonald Street', 'L8X H8Z'),
		('Montreal', '125 Francois Avenue', 'Z9G 6B2'),
		('Ottawa', '321 Laurier Avenue', 'A9L 3R1'),
		('Vancouver', '126 Train Way', 'F9C 0C1');


-------------------------------------------------------------------------------------------------------------
-- Populating with Hotel Chains -----------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------
insert into ChaineHoteliere (nomdechaine, nombredehotels, addressid, rating) 
values ('ChaineA', 8, 1, 4.5),
	   ('ChaineB', 9, 2, 2.3),
	   ('ChaineC', 10, 3, 1.7),
	   ('ChaineD', 9, 4, 4.9),
	   ('ChaineE', 8, 5, 4.1);

----------------------------------------------------------------------------------------------------------
-- Populating chains' emails -----------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------
insert into emailchaine (email, nomdechaine)
values ('chaineA@gmail.com', 'ChaineA'),
	   ('chaineB@gmail.com', 'ChaineB'),
	   ('chaineC@gmail.com', 'ChaineC'),
	   ('chaineD@gmail.com', 'ChaineD'),
	   ('chaineE@gmail.com', 'ChaineE'),
	   ('acustomersupport@hotel.com', 'ChaineA'),
	   ('bcustomersupport@hotel.com', 'ChaineB'),
	   ('ccustomersupport@hotel.com', 'ChaineC'),
	   ('dcustomersupport@hotel.com', 'ChaineD'),
	   ('ecustomersupport@hotel.com', 'ChaineE');

-----------------------------------------------------------------------------------------------------------------
-- Populating chains' phone numbers -----------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------
insert into telephonechaine (numerotelephone, nomdechaine)
values ('1112223333', 'ChaineA'),
	   ('2223334444', 'ChaineB'),
	   ('3334445555', 'ChaineC'),
	   ('4445556666', 'ChaineD'),
	   ('5556667777', 'ChaineE'),
	   ('9998887777', 'ChaineA'),
	   ('8887776666', 'ChaineB'),
	   ('7776665555', 'ChaineC'),
	   ('6665554444', 'ChaineD'),
	   ('5554443333', 'ChaineE');












------------------------------------------------------------------------------------------------------------------------------
-- Populating with addresses for Hotel branches -----------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------
INSERT INTO Address (ville, adresseDeRue, codePostal) 
VALUES 
    ('Calgary', '201 4th Street SW', 'T2P 3N4'),
    ('Edmonton', '876 Jasper Avenue', 'T5J 2W4'),
    ('Winnipeg', '334 Portage Avenue', 'R3C 0B5'),
    ('Quebec City', '145 Grande Allée', 'G1R 2J4'),
    ('Halifax', '78 Spring Garden Road', 'B3J 1H5'),
    ('Victoria', '99 Government Street', 'V8V 3K4'),
    ('Regina', '200 Albert Street', 'S4P 3Y2'),
    ('Saskatoon', '678 Broadway Avenue', 'S7N 1B2'),
    ('St. Johns', '55 Water Street', 'A1C 1A2'),
    ('Charlottetown', '102 Queen Street', 'C1A 4A1'),
    ('Fredericton', '88 King Street', 'E3B 2H6'),
    ('Whitehorse', '66 Main Street', 'Y1A 2B3'),
    ('Yellowknife', '32 Franklin Avenue', 'X1A 1C3'),
    ('Iqaluit', '12 Tundra Road', 'X0A 0H0'),
    ('Gatineau', '500 Boulevard Maisonneuve', 'J8X 2J7'),
    ('Brampton', '77 Queen Street East', 'L6W 3T1'),
    ('Mississauga', '11 Hurontario Street', 'L5G 3H1'),
    ('Hamilton', '630 King Street West', 'L8P 1C1'),
    ('Kitchener', '222 Weber Street North', 'N2J 3H6'),
    ('London', '890 Dundas Street', 'N6A 4L4'),
    ('Windsor', '700 Ouellette Avenue', 'N9A 3G7'),
    ('St. Catharines', '19 Ontario Street', 'L2R 5J4'),
    ('Kingston', '303 Princess Street', 'K7L 1B5'),
    ('Thunder Bay', '456 Bay Street', 'P7B 1R9'),
    ('Sudbury', '75 Elm Street', 'P3C 1S6'),
    ('Trois-Rivières', '99 Rue des Forges', 'G9A 5H2'),
    ('Sherbrooke', '150 Wellington Street South', 'J1H 3Y4'),
    ('Saguenay', '33 Rue Racine Est', 'G7H 4E5'),
    ('Laval', '405 Boulevard Chomedey', 'H7V 3Y2'),
    ('Longueuil', '55 Rue Saint-Charles Ouest', 'J4H 1C7'),
    ('Moncton', '18 Main Street', 'E1C 1B9'),
    ('Saint John', '99 Water Street', 'E2L 4Y9'),
    ('Kelowna', '220 Bernard Avenue', 'V1Y 6N2'),
    ('Abbotsford', '880 South Fraser Way', 'V2T 1W6'),
    ('Red Deer', '121 Ross Street', 'T4N 5C5'),
	 ('Burnaby', '650 Willingdon Avenue', 'V5G 3H7'),
    ('Lethbridge', '300 Mayor Magrath Drive S', 'T1J 3L7'),
    ('Barrie', '45 Dunlop Street W', 'L4N 1A3'),
    ('Guelph', '120 Wellington Street E', 'N1H 3R4'),
    ('Saint-Jérôme', '88 Rue de la Gare', 'J7Z 5E3');




-----------------------------------------------------------------------------------------------------------------------------------------------------
-- Populating with Hotel Branches -------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------
INSERT INTO hotel (nombredechambres, numtelephone, addressid, nomDeChaine, email)
VALUES 
    (5, '6045559999', 5, 'ChaineA', 'contact@chainea.com'),
    (6, '4031112222', 6, 'ChaineB', 'info@chaineb.net'),
    (6, '7801234567', 7, 'ChaineC', 'reservations@chainec.org'),
    (7, '2045551234', 8, 'ChaineD', 'support@chained.com'),
    (7, '4185559876', 9, 'ChaineE', 'hello@chainee.ca'),
    (6, '6045551234', 10, 'ChaineA', 'services@chainea.com'),
    (6, '4035554321', 11, 'ChaineB', 'admin@chaineb.net'),
    (6, '7805552345', 12, 'ChaineC', 'hotel@chainec.org'),
    (5, '2045556789', 13, 'ChaineD', 'booking@chained.com'),
    (5, '4185553456', 14, 'ChaineE', 'reception@chainee.ca'),
    (5, '6045559876', 15, 'ChaineA', 'welcome@chainea.com'),
    (6, '4035559876', 16, 'ChaineB', 'support@chaineb.net'),
    (6, '7805556789', 17, 'ChaineC', 'frontdesk@chainec.org'),
    (6, '2045558765', 18, 'ChaineD', 'info@chained.com'),
    (7, '4185556789', 19, 'ChaineE', 'reservations@chainee.ca'),
    (7, '6045558765', 20, 'ChaineA', 'sales@chainea.com'),
    (5, '4035558765', 21, 'ChaineB', 'contact@chaineb.net'),
    (6, '7805553456', 22, 'ChaineC', 'management@chainec.org'),
    (7, '2045552345', 23, 'ChaineD', 'hello@chained.com'),
    (5, '4185552345', 24, 'ChaineE', 'support@chainee.ca'),
    (6, '6045553456', 25, 'ChaineA', 'help@chainea.com'),
    (6, '4035553456', 26, 'ChaineB', 'staff@chaineb.net'),
    (5, '7805551234', 27, 'ChaineC', 'desk@chainec.org'),
    (6, '2045559876', 28, 'ChaineD', 'service@chained.com'),
    (5, '4185551234', 29, 'ChaineE', 'assist@chainee.ca'),
    (7, '6045552345', 30, 'ChaineA', 'office@chainea.com'),
    (6, '4035552345', 31, 'ChaineB', 'front@chaineb.net'),
    (7, '7805559876', 32, 'ChaineC', 'booking@chainec.org'),
    (5, '2045553456', 33, 'ChaineD', 'contactus@chained.com'),
    (6, '4185553456', 34, 'ChaineE', 'concierge@chainee.ca'),
    (5, '6045556789', 35, 'ChaineA', 'reservations@chainea.com'),
    (7, '4035558765', 36, 'ChaineB', 'customer@chaineb.net'),
    (5, '7805553456', 37, 'ChaineC', 'inquiries@chainec.org'),
    (7, '2045551234', 38, 'ChaineD', 'welcome@chained.com'),
    (6, '4185558765', 39, 'ChaineE', 'hotellogin@chainee.ca'),
    (5, '6045559876', 40, 'ChaineA', 'reservations@chainea.com'),
    (6, '6045559876', 41, 'ChaineB', 'info@chaineb.net'),
    (5, '4035551234', 42, 'ChaineC', 'stay@chainec.org'),
    (6, '7805552345', 43, 'ChaineD', 'roomservice@chained.com'),
    (5, '2045556789', 44, 'ChaineE', 'guestcare@chainee.ca'),
    (7, '4185559876', 45, 'ChaineA', 'support@chainea.com');







--------------------------------
-- Populating with hotel rooms--
--------------------------------
INSERT INTO chambre (numDeChambre, hotelID, prix, commodites, capacite, vue, domages)
VALUES 
(1, 1, 100, 'wifi, stationnement, café/thé', 2, 'ville', null),
(2, 1, 120, 'wifi, dejeuner, sèche-cheveux', 3, 'ville', null),
(3, 1, 110, 'wifi, stationnement, animaux', 2, 'mer', null),
(4, 1, 130, 'wifi, dejeuner, café/thé', 3, 'ocean', null),
(5, 1, 140, 'wifi, stationnement, sèche-cheveux', 4, 'lac', null),

(1, 2, 100, 'wifi, stationnement, café/thé', 2, 'lac', null),
(2, 2, 120, 'wifi, dejeuner, sèche-cheveux', 3, 'ville', null),
(3, 2, 110, 'wifi, stationnement, animaux', 2, 'mer', null),
(4, 2, 120, 'wifi, dejeuner', 3, 'ocean', null),
(5, 2, 130, 'wifi, stationnement, café/thé', 4, 'lac', null),
(6, 2, 120, 'wifi, dejeuner', 3, 'ocean', null),

(1, 3, 100, 'wifi, stationnement, café/thé', 2, 'ville', null),
(2, 3, 120, 'wifi, dejeuner, animaux', 3, 'ville', null),
(3, 3, 110, 'wifi, stationnement, sèche-cheveux', 2, 'mer', null),
(4, 3, 130, 'wifi, dejeuner, café/thé', 3, 'ocean', null),
(5, 3, 140, 'wifi, stationnement, sèche-cheveux', 4, 'lac', null),
(6, 3, 140, 'wifi, stationnement, sèche-cheveux', 4, 'lac', null),

(1, 4, 100, 'wifi, stationnement, café/thé', 2, 'lac', null),
(2, 4, 120, 'wifi, dejeuner, café/thé', 3, 'ville', null),
(3, 4, 110, 'wifi, stationnement, animaux', 2, 'mer', null),
(4, 4, 120, 'wifi, dejeuner', 3, 'ocean', null),
(5, 4, 130, 'wifi, stationnement, café/thé', 4, 'lac', null),
(6, 4, 120, 'wifi, dejeuner', 3, 'ocean', null),
(7, 4, 110, 'wifi, stationnement, animaux', 2, 'mer', null),

(1, 5, 100, 'wifi, stationnement, café/thé', 2, 'lac', null),
(2, 5, 120, 'wifi, dejeuner, sèche-cheveux', 3, 'ville', null),
(3, 5, 110, 'wifi, stationnement, animaux', 2, 'mer', null),
(4, 5, 130, 'wifi, dejeuner, café/thé', 3, 'ocean', null),
(5, 5, 140, 'wifi, stationnement, sèche-cheveux', 4, 'lac', null),
(6, 5, 120, 'wifi, dejeuner', 3, 'ocean', null),
(7, 5, 110, 'wifi, stationnement, animaux', 2, 'mer', null),

(1, 6, 100, 'wifi, stationnement, café/thé', 2, 'lac', null),
(2, 6, 120, 'wifi, dejeuner, animaux', 3, 'ville', null),
(3, 6, 110, 'wifi, stationnement, sèche-cheveux', 2, 'mer', null),
(4, 6, 120, 'wifi, dejeuner', 3, 'ocean', null),
(5, 6, 130, 'wifi, stationnement, café/thé', 4, 'lac', null),
(6, 6, 120, 'wifi, dejeuner', 3, 'ocean', null),

(1, 7, 100, 'wifi, stationnement, café/thé', 2, 'lac', null),
(2, 7, 120, 'wifi, dejeuner, sèche-cheveux', 3, 'ville', null),
(3, 7, 110, 'wifi, stationnement, animaux', 2, 'mer', null),
(4, 7, 130, 'wifi, dejeuner, café/thé', 3, 'ocean', null),
(5, 7, 140, 'wifi, stationnement, sèche-cheveux', 4, 'lac', null),
(6, 7, 160, 'wifi, dejeuner, stationnement', 2, 'ville', null),

(1, 8, 100, 'wifi, stationnement, café/thé', 2, 'lac', null),
(2, 8, 120, 'wifi, dejeuner, animaux', 3, 'ville', null),
(3, 8, 110, 'wifi, stationnement, sèche-cheveux', 2, 'mer', null),
(4, 8, 130, 'wifi, dejeuner', 3, 'ocean', null),
(5, 8, 140, 'wifi, stationnement, café/thé', 4, 'lac', null),
(6, 8, 160, 'wifi, dejeuner, stationnement', 2, 'ville', null),

(1, 9, 100, 'wifi, stationnement, café/thé', 2, 'lac', null),
(2, 9, 120, 'wifi, dejeuner, café/thé', 3, 'ville', null),
(3, 9, 110, 'wifi, stationnement, animaux', 2, 'mer', null),
(4, 9, 120, 'wifi, dejeuner', 3, 'ocean', null),
(5, 9, 130, 'wifi, stationnement, café/thé', 4, 'lac', null),

(1, 10, 100, 'wifi, stationnement, café/thé', 2, 'lac', null),
(2, 10, 120, 'wifi, dejeuner, sèche-cheveux', 3, 'ville', null),
(3, 10, 110, 'wifi, stationnement, animaux', 2, 'mer', null),
(4, 10, 130, 'wifi, dejeuner, café/thé', 3, 'ocean', null),
(5, 10, 140, 'wifi, stationnement, sèche-cheveux', 4, 'lac', null),

(1, 11, 100, 'wifi, stationnement, café/thé', 2, 'lac', null),
(2, 11, 120, 'wifi, dejeuner, animaux', 3, 'ville', null),
(3, 11, 110, 'wifi, stationnement, sèche-cheveux', 2, 'mer', null),
(4, 11, 120, 'wifi, dejeuner', 3, 'ocean', null),
(5, 11, 130, 'wifi, stationnement, café/thé', 4, 'lac', null),

(1, 12, 100, 'wifi, stationnement, café/thé', 2, 'lac', null),
(2, 12, 120, 'wifi, dejeuner, sèche-cheveux', 3, 'ville', null),
(3, 12, 110, 'wifi, stationnement, animaux', 2, 'mer', null),
(4, 12, 130, 'wifi, dejeuner, café/thé', 3, 'ocean', null),
(5, 12, 140, 'wifi, stationnement, sèche-cheveux', 4, 'lac', null),

(1, 13, 100, 'wifi, stationnement, café/thé', 2, 'lac', null),
(2, 13, 120, 'wifi, dejeuner, café/thé', 3, 'ville', null),
(3, 13, 110, 'wifi, stationnement, animaux', 2, 'mer', null),
(4, 13, 120, 'wifi, dejeuner', 3, 'ocean', null),
(5, 13, 130, 'wifi, stationnement, café/thé', 4, 'lac', null),

(1, 14, 100, 'wifi, stationnement, café/thé', 2, 'lac', null),
(2, 14, 120, 'wifi, dejeuner, sèche-cheveux', 3, 'ville', null),
(3, 14, 110, 'wifi, stationnement, animaux', 2, 'mer', null),
(4, 14, 130, 'wifi, dejeuner', 3, 'ocean', null),
(5, 14, 140, 'wifi, stationnement, café/thé', 4, 'lac', null),

(1, 15, 100, 'wifi, stationnement, café/thé', 2, 'lac', null),
(2, 15, 120, 'wifi, dejeuner, animaux', 3, 'ville', null),
(3, 15, 110, 'wifi, stationnement, sèche-cheveux', 2, 'mer', null),
(4, 15, 120, 'wifi, dejeuner', 3, 'ocean', null),
(5, 15, 130, 'wifi, stationnement, café/thé', 4, 'lac', null),
(6, 15, 160, 'wifi, dejeuner, stationnement', 2, 'ville', null),
(7, 15, 160, 'wifi, dejeuner, stationnement', 2, 'ville', null),

(1, 16, 100, 'wifi, stationnement, café/thé', 2, 'lac', null),
(2, 16, 120, 'wifi, dejeuner, sèche-cheveux', 3, 'ville', null),
(3, 16, 110, 'wifi, stationnement, animaux', 2, 'mer', null),
(4, 16, 130, 'wifi, dejeuner, café/thé', 3, 'ocean', null),
(5, 16, 140, 'wifi, stationnement, sèche-cheveux', 4, 'lac', null),
(6, 16, 160, 'wifi, dejeuner, stationnement', 2, 'ville', null),
(7, 16, 160, 'wifi, dejeuner, stationnement', 2, 'ville', null),

(1, 17, 100, 'wifi, stationnement, café/thé', 2, 'lac', null),
(2, 17, 120, 'wifi, dejeuner, animaux', 3, 'ville', null),
(3, 17, 110, 'wifi, stationnement, sèche-cheveux', 2, 'mer', null),
(4, 17, 130, 'wifi, dejeuner', 3, 'ocean', null),
(5, 17, 140, 'wifi, stationnement, café/thé', 4, 'lac', null),

(1, 18, 100, 'wifi, stationnement, café/thé', 2, 'lac', null),
(2, 18, 120, 'wifi, dejeuner, sèche-cheveux', 3, 'ville', null),
(3, 18, 110, 'wifi, stationnement, animaux', 2, 'mer', null),
(4, 18, 130, 'wifi, dejeuner, café/thé', 3, 'ocean', null),
(5, 18, 140, 'wifi, stationnement, sèche-cheveux', 4, 'lac', null),
(6, 18, 160, 'wifi, dejeuner, stationnement', 2, 'ville', null),

(1, 19, 100, 'wifi, stationnement, café/thé', 2, 'lac', null),
(2, 19, 120, 'wifi, dejeuner, café/thé', 3, 'ville', null),
(3, 19, 110, 'wifi, stationnement, animaux', 2, 'mer', null),
(4, 19, 120, 'wifi, dejeuner', 3, 'ocean', null),
(5, 19, 130, 'wifi, stationnement, café/thé', 4, 'lac', null),
(6, 19, 160, 'wifi, dejeuner, stationnement', 2, 'ville', null),
(7, 19, 160, 'wifi, dejeuner, stationnement', 2, 'ville', null),

(1, 20, 100, 'wifi, stationnement, café/thé', 2, 'lac', null),
(2, 20, 120, 'wifi, dejeuner, sèche-cheveux', 3, 'ville', null),
(3, 20, 110, 'wifi, stationnement, animaux', 2, 'mer', null),
(4, 20, 130, 'wifi, dejeuner, café/thé', 3, 'ocean', null),
(5, 20, 140, 'wifi, stationnement, sèche-cheveux', 4, 'lac', null),

(1, 21, 100, 'wifi, stationnement, café/thé', 2, 'lac', null),
(2, 21, 120, 'wifi, dejeuner, animaux', 3, 'ville', null),
(3, 21, 110, 'wifi, stationnement, sèche-cheveux', 2, 'mer', null),
(4, 21, 120, 'wifi, dejeuner', 3, 'ocean', null),
(5, 21, 130, 'wifi, stationnement, café/thé', 4, 'lac', null),
(6, 21, 160, 'wifi, dejeuner, stationnement', 2, 'ville', null),

(1, 22, 100, 'wifi, stationnement, café/thé', 2, 'lac', null),
(2, 22, 120, 'wifi, dejeuner, café/thé', 3, 'ville', null),
(3, 22, 110, 'wifi, stationnement, animaux', 2, 'mer', null),
(4, 22, 130, 'wifi, dejeuner, café/thé', 3, 'ocean', null),
(5, 22, 140, 'wifi, stationnement, sèche-cheveux', 4, 'lac', null),

(1, 23, 100, 'wifi, stationnement, café/thé', 2, 'lac', null),
(2, 23, 120, 'wifi, dejeuner, animaux', 3, 'ville', null),
(3, 23, 110, 'wifi, stationnement, sèche-cheveux', 2, 'mer', null),
(4, 23, 130, 'wifi, dejeuner, café/thé', 3, 'ocean', null),
(5, 23, 140, 'wifi, stationnement, café/thé', 4, 'lac', null),

(1, 24, 100, 'wifi, stationnement, café/thé', 2, 'lac', null),
(2, 24, 120, 'wifi, dejeuner, sèche-cheveux', 3, 'ville', null),
(3, 24, 110, 'wifi, stationnement, animaux', 2, 'mer', null),
(4, 24, 130, 'wifi, dejeuner, café/thé', 3, 'ocean', null),
(5, 24, 140, 'wifi, stationnement, sèche-cheveux', 4, 'lac', null),
(6, 24, 160, 'wifi, dejeuner, stationnement', 2, 'ville', null),

(1, 25, 100, 'wifi, stationnement, café/thé', 2, 'lac', null),
(2, 25, 120, 'wifi, dejeuner, café/thé', 3, 'ville', null),
(3, 25, 110, 'wifi, stationnement, animaux', 2, 'mer', null),
(4, 25, 130, 'wifi, dejeuner, café/thé', 3, 'ocean', null),
(5, 25, 140, 'wifi, stationnement, sèche-cheveux', 4, 'lac', null),

(1, 26, 100, 'wifi, stationnement, café/thé', 2, 'lac', null),
(2, 26, 120, 'wifi, dejeuner, animaux', 3, 'ville', null),
(3, 26, 110, 'wifi, stationnement, sèche-cheveux', 2, 'mer', null),
(4, 26, 130, 'wifi, dejeuner, café/thé', 3, 'ocean', null),
(5, 26, 140, 'wifi, stationnement, café/thé', 4, 'lac', null),
(6, 26, 160, 'wifi, dejeuner, stationnement', 2, 'ville', null),
(7, 26, 160, 'wifi, dejeuner, stationnement', 2, 'ville', null),

(1, 27, 100, 'wifi, stationnement, café/thé', 2, 'lac', null),
(2, 27, 120, 'wifi, dejeuner, café/thé', 3, 'ville', null),
(3, 27, 110, 'wifi, stationnement, animaux', 2, 'mer', null),
(4, 27, 130, 'wifi, dejeuner, café/thé', 3, 'ocean', null),
(5, 27, 140, 'wifi, stationnement, sèche-cheveux', 4, 'lac', null),

(1, 28, 100, 'wifi, stationnement, café/thé', 2, 'lac', null),
(2, 28, 120, 'wifi, dejeuner, animaux', 3, 'ville', null),
(3, 28, 110, 'wifi, stationnement, sèche-cheveux', 2, 'mer', null),
(4, 28, 130, 'wifi, dejeuner', 3, 'ocean', null),
(5, 28, 140, 'wifi, stationnement, café/thé', 4, 'lac', null),
(6, 28, 160, 'wifi, dejeuner, stationnement', 2, 'ville', null),
(7, 28, 160, 'wifi, dejeuner, stationnement', 2, 'ville', null),

(1, 29, 100, 'wifi, stationnement, café/thé', 2, 'lac', null),
(2, 29, 120, 'wifi, dejeuner, sèche-cheveux', 3, 'ville', null),
(3, 29, 110, 'wifi, stationnement, animaux', 2, 'mer', null),
(4, 29, 130, 'wifi, dejeuner, café/thé', 3, 'ocean', null),
(5, 29, 140, 'wifi, stationnement, café/thé', 4, 'lac', null),

(1, 30, 100, 'wifi, stationnement, café/thé', 2, 'lac', null),
(2, 30, 120, 'wifi, dejeuner, café/thé', 3, 'ville', null),
(3, 30, 110, 'wifi, stationnement, animaux', 2, 'mer', null),
(4, 30, 130, 'wifi, dejeuner, café/thé', 3, 'ocean', null),
(5, 30, 140, 'wifi, stationnement, sèche-cheveux', 4, 'lac', null),

(1, 31, 100, 'wifi, stationnement, café/thé', 2, 'lac', null),
(2, 31, 120, 'wifi, dejeuner, animaux', 3, 'ville', null),
(3, 31, 110, 'wifi, stationnement, sèche-cheveux', 2, 'mer', null),
(4, 31, 130, 'wifi, dejeuner, café/thé', 3, 'ocean', null),
(5, 31, 140, 'wifi, stationnement, café/thé', 4, 'lac', null),

(1, 32, 100, 'wifi, stationnement, café/thé', 2, 'lac', null),
(2, 32, 120, 'wifi, dejeuner, sèche-cheveux', 3, 'ville', null),
(3, 32, 110, 'wifi, stationnement, animaux', 2, 'mer', null),
(4, 32, 130, 'wifi, dejeuner, café/thé', 3, 'ocean', null),
(5, 32, 140, 'wifi, stationnement, café/thé', 4, 'lac', null),
(6, 32, 160, 'wifi, dejeuner, stationnement', 2, 'ville', null),
(7, 32, 160, 'wifi, dejeuner, stationnement', 2, 'ville', null),

(1, 33, 100, 'wifi, stationnement, café/thé', 2, 'lac', null),
(2, 33, 120, 'wifi, dejeuner, animaux', 3, 'ville', null),
(3, 33, 110, 'wifi, stationnement, sèche-cheveux', 2, 'mer', null),
(4, 33, 130, 'wifi, dejeuner, café/thé', 3, 'ocean', null),
(5, 33, 140, 'wifi, stationnement, café/thé', 4, 'lac', null),

(1, 34, 100, 'wifi, stationnement, café/thé', 2, 'lac', null),
(2, 34, 120, 'wifi, dejeuner, café/thé', 3, 'ville', null),
(3, 34, 110, 'wifi, stationnement, animaux', 2, 'mer', null),
(4, 34, 130, 'wifi, dejeuner, café/thé', 3, 'ocean', null),
(5, 34, 140, 'wifi, stationnement, sèche-cheveux', 4, 'lac', null),
(6, 34, 160, 'wifi, dejeuner, stationnement', 2, 'ville', null),
(7, 34, 160, 'wifi, dejeuner, stationnement', 2, 'ville', null),

(1, 35, 100, 'wifi, stationnement, café/thé', 2, 'lac', null),
(2, 35, 120, 'wifi, dejeuner, sèche-cheveux', 3, 'ville', null),
(3, 35, 110, 'wifi, stationnement, animaux', 2, 'mer', null),
(4, 35, 130, 'wifi, dejeuner, café/thé', 3, 'ocean', null),
(5, 35, 140, 'wifi, stationnement, café/thé', 4, 'lac', null),

(1, 36, 100, 'wifi, stationnement, café/thé', 2, 'lac', null),
(2, 36, 120, 'wifi, dejeuner, café/thé', 3, 'ville', null),
(3, 36, 110, 'wifi, stationnement, animaux', 2, 'mer', null),
(4, 36, 130, 'wifi, dejeuner, café/thé', 3, 'ocean', null),
(5, 36, 140, 'wifi, stationnement, sèche-cheveux', 4, 'lac', null),

(1, 37, 100, 'wifi, stationnement, café/thé', 2, 'lac', null),
(2, 37, 120, 'wifi, dejeuner, animaux', 3, 'ville', null),
(3, 37, 110, 'wifi, stationnement, sèche-cheveux', 2, 'mer', null),
(4, 37, 130, 'wifi, dejeuner, café/thé', 3, 'ocean', null),
(5, 37, 140, 'wifi, stationnement, café/thé', 4, 'lac', null),
(6, 37, 160, 'wifi, dejeuner, stationnement', 2, 'ville', null),

(1, 38, 100, 'wifi, stationnement, café/thé', 2, 'lac', null),
(2, 38, 120, 'wifi, dejeuner, café/thé', 3, 'ville', null),
(3, 38, 110, 'wifi, stationnement, animaux', 2, 'mer', null),
(4, 38, 130, 'wifi, dejeuner, café/thé', 3, 'ocean', null),
(5, 38, 140, 'wifi, stationnement, sèche-cheveux', 4, 'lac', null),

(1, 39, 100, 'wifi, stationnement, café/thé', 2, 'lac', null),
(2, 39, 120, 'wifi, dejeuner, animaux', 3, 'ville', null),
(3, 39, 110, 'wifi, stationnement, sèche-cheveux', 2, 'mer', null),
(4, 39, 130, 'wifi, dejeuner, café/thé', 3, 'ocean', null),
(5, 39, 140, 'wifi, stationnement, café/thé', 4, 'lac', null),

(1, 40, 100, 'wifi, stationnement, café/thé', 2, 'lac', null),
(2, 40, 120, 'wifi, dejeuner, café/thé', 3, 'ville', null),
(3, 40, 110, 'wifi, stationnement, animaux', 2, 'mer', null),
(4, 40, 130, 'wifi, dejeuner, café/thé', 3, 'ocean', null),
(5, 40, 140, 'wifi, stationnement, sèche-cheveux', 4, 'lac', null),

(1, 41, 100, 'wifi, stationnement, café/thé', 2, 'lac', null),
(2, 41, 120, 'wifi, dejeuner, animaux', 3, 'ville', null),
(3, 41, 110, 'wifi, stationnement, sèche-cheveux', 2, 'mer', null),
(4, 41, 130, 'wifi, dejeuner, café/thé', 3, 'ocean', null),
(5, 41, 140, 'wifi, stationnement, café/thé', 4, 'lac', null),
(6, 41, 160, 'wifi, dejeuner, stationnement', 2, 'ville', null),
(7, 41, 160, 'wifi, dejeuner, stationnement', 2, 'ville', null),

-- extra rooms
(6, 12, 160, 'wifi, dejeuner, stationnement', 2, 'ville', null),
(6, 13, 160, 'wifi, dejeuner, stationnement', 2, 'ville', null),
(6, 14, 160, 'wifi, dejeuner, stationnement', 2, 'ville', null),
(6, 22, 160, 'wifi, dejeuner, stationnement', 2, 'ville', null),
(6, 27, 160, 'wifi, dejeuner, stationnement', 2, 'ville', null),
(6, 30, 160, 'wifi, dejeuner, stationnement', 2, 'ville', null),
(6, 35, 160, 'wifi, dejeuner, stationnement', 2, 'ville', null),
(6, 39, 160, 'wifi, dejeuner, stationnement', 2, 'ville', null);

















------------------------------------------------------------------------------------------------------------------
-- USABLE QUERIES AND TRIGGERS -------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------------------



--------------------------------------------
-- Trigger that validates email addresses --
--------------------------------------------
CREATE OR REPLACE FUNCTION validate_email_format()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if the email is valid
  IF NEW.email NOT LIKE '%_@__%.__%' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Then create the trigger
CREATE TRIGGER validate_email
BEFORE INSERT OR UPDATE ON emailchaine
FOR EACH ROW
EXECUTE FUNCTION validate_email_format();


----------------------------------------------------------------------------------
-- Trigger that makes sure that the checkout date is NOT before the checkin date -
----------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION validate_checkout_date()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.checkoutDate <= NEW.checkinDate THEN
        RAISE EXCEPTION 'Check-out date must be after check-in date.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_validate_checkout_date_location
BEFORE INSERT OR UPDATE ON location
FOR EACH ROW EXECUTE FUNCTION validate_checkout_date();

CREATE TRIGGER trigger_validate_checkout_date_reservation
BEFORE INSERT OR UPDATE ON reservation
FOR EACH ROW EXECUTE FUNCTION validate_checkout_date();



----------------------------------------------------------------------------------
-- Trigger that makes sure that there are no duplicate phone numbers -------------
----------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION prevent_duplicate_phone_numbers()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM TelephoneChaine
        WHERE numeroTelephone = NEW.numeroTelephone
    ) THEN
        RAISE EXCEPTION 'Phone number already exists.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_prevent_duplicate_phone_numbers
BEFORE INSERT OR UPDATE ON TelephoneChaine
FOR EACH ROW EXECUTE FUNCTION prevent_duplicate_phone_numbers();


------------
--Indexing--
------------

CREATE INDEX idx_reservation_dates ON reservation (hotelID, numDeChambre, checkinDate, checkoutDate);
