-- GROUP 98
-- MEMEBRS: Nargis Habibi and Ethan Hardey

SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;

-- Creates a Customers Table
CREATE OR REPLACE TABLE Customers (
    customer_id int NOT NULL AUTO_INCREMENT,
    first_name varchar(16) NOT NULL,
    last_name varchar(16) NOT NULL,
    street varchar(50) NOT NULL,
    city varchar(50) NOT NULL,
    state varchar(50) NOT NULL,
    zip_code varchar(50) NOT NULL,
    phone_number varchar(50) NOT NULL,
    PRIMARY KEY(customer_id)
);

-- Inserts data into Customers table
INSERT INTO Customers (first_name, last_name, street, city, state, zip_code, phone_number)
VALUES 
('Cordelia', 'Carney', '7728 Fifth Street', 'Northville', 'MI', 48167, '3978331499'),
('Mackenzie', 'Hendricks', '15 Pendergast Ave', 'Beckley', 'WV', 25801, '2946677243'),
('Will', 'Solis', '233 Longfellow St.', 'Oshkosh', 'WI', 54901, '8492468361');

-- Creates Pets Table
CREATE OR REPLACE TABLE Pets (
    pet_id int NOT NULL AUTO_INCREMENT,
    pet_name varchar(16) NOT NULL,
    species varchar(16) NOT NULL,
    age int NOT NULL,
    gender varchar(10) NOT NULL,
    PRIMARY KEY(pet_id)
);

-- Inserts data into Pets table
INSERT INTO Pets(pet_name, species, age, gender)
VALUES
('Zaiba', 'Cat', 5, 'Female'),
('Hunter', 'Dog', 7, 'Male'),
('Mimi', 'Cat', 2, 'Female'),
('Fluffy', 'Dog', 1, 'Male');

-- Creates Employees Table
CREATE OR REPLACE TABLE Employees (
    employee_id int NOT NULL AUTO_INCREMENT,
    first_name varchar(16) NOT NULL,
    last_name varchar(16) NOT NULL,
    PRIMARY KEY(employee_id)
);

-- Inserts data into Employees table
INSERT INTO Employees (first_name, last_name)
VALUES
('Coral', 'Aguirere'),
('Ismail', 'England'),
('Lily', 'Peck');


-- Creates Adoptions Table
CREATE OR REPLACE TABLE Adoptions (
    adoption_id int NOT NULL AUTO_INCREMENT,
    customer_id int NOT NULL,
    date date NOT NULL,
    pet_id int NOT NULL,
    employee_id int DEFAULT NULL,
    PRIMARY KEY(adoption_id),
    FOREIGN KEY(customer_id) REFERENCES Customers(customer_id) ON DELETE CASCADE,
    FOREIGN KEY(pet_id) REFERENCES Pets(pet_id) ON DELETE CASCADE,
    FOREIGN KEY(employee_id) REFERENCES Employees(employee_id) ON DELETE CASCADE
);

-- Inserts data into Adoptions table
INSERT INTO Adoptions(customer_id, date, pet_id, employee_id)
VALUES
((SELECT customer_id FROM Customers WHERE first_name = 'Will' AND last_name = 'Solis'), '2021-2-6', (SELECT pet_id FROM Pets WHERE pet_name = 'Mimi'), (SELECT employee_id FROM Employees WHERE first_name = 'Lily' AND last_name = 'Peck')),
((SELECT customer_id FROM Customers WHERE first_name = 'Mackenzie' AND last_name = 'Hendricks'), '2022-5-11', (SELECT pet_id FROM Pets WHERE pet_name = 'Hunter'), (SELECT employee_id FROM Employees WHERE first_name = 'Ismail' AND last_name = 'England')),
((SELECT customer_id FROM Customers WHERE first_name = 'Will' AND last_name = 'Solis'), '2023-10-1', (SELECT pet_id FROM Pets WHERE pet_name = 'Zaiba'), (SELECT employee_id FROM Employees WHERE first_name = 'Lily' AND last_name = 'Peck'));


-- Creates Vaccinations Table
CREATE OR REPLACE TABLE Vaccinations (
    vaccination_id int NOT NULL AUTO_INCREMENT,
    vaccination_name varchar(50) NOT NULL,
    age_administered  varchar(50) NOT NULL,
    dosage varchar(50) NOT NULL,
    species varchar(50) NOT NULL,
    booster varchar(50) DEFAULT NULL,
    description text DEFAULT NULL,
    PRIMARY KEY(vaccination_id)
);

-- Inserts data into Vaccinations table
INSERT INTO Vaccinations(vaccination_name, age_administered, dosage, species, booster, description)
VALUES
('Rabies', '3 Months', '1 Dose', 'Dog', 'Annual', 'Rabies is 100% fatal to dogs, with no treatment available.'),
('Parvovirus', '6 - 16 Weeks', '3 Doses', 'Dog', '1 Year', 'Canine "parvo" is contagious, and can cause severe vomiting and bloody diarrhea'),
('Parvovirus', 'Over 16 Weeks', '2 Doses', 'Dog', 'Every 3 Years', 'Canine "parvo" is contagious, and can cause severe vomiting and bloody diarrhea'),
('Rabies', '8 - 16 Weeks', '1 Dose', 'Cat', 'Annual', 'Rabies is 100% fatal to cats, with no treatment available.'),
('Feline Herpesvirus', '6 - 20 Weeks', '3 Doses', 'Cat', 'Every 3 Years', 'Feline herpesvirus causes feline viral rhinotracheitis');

-- Creates PetVaccinations Table
CREATE OR REPLACE TABLE PetVaccinations (
    petvaccination_id int NOT NULL AUTO_INCREMENT,
    date date NOT NULL,
    pet_id int NOT NULL,
    vaccination_id int NOT NULL,
    PRIMARY KEY(petvaccination_id),
    FOREIGN KEY(pet_id) REFERENCES Pets(pet_id) ON DELETE CASCADE,
    FOREIGN KEY(vaccination_id) REFERENCES Vaccinations(vaccination_id) ON DELETE CASCADE
);

-- Inserts data into PetVaccination table
INSERT INTO PetVaccinations(date, pet_id, vaccination_id)
VALUES
('2019-2-6', (SELECT pet_id FROM Pets WHERE pet_name = 'Mimi'), (SELECT vaccination_id FROM Vaccinations WHERE vaccination_name = 'Feline Herpesvirus')),
('2015-5-11', (SELECT pet_id FROM Pets WHERE pet_name = 'Hunter'), (SELECT vaccination_id FROM Vaccinations WHERE vaccination_name = 'Parvovirus' AND dosage = '3 Doses')),
('2019-10-1', (SELECT pet_id FROM Pets WHERE pet_name = 'Zaiba'), (SELECT vaccination_id FROM Vaccinations WHERE vaccination_name = 'Rabies' AND species = 'Cat'));


-- TESTS RAN TO CHECK TABLES ARE WORKING
-- SELECT customer_id FROM Customers WHERE first_name = 'Will' AND last_name = 'Solis';
-- SELECT pet_id FROM Pets WHERE pet_name = 'Mimi';
-- SELECT employee_id FROM Employees WHERE first_name = 'Lily' AND last_name = 'Peck';
-- select * from Customers;
-- select * from Employees;
-- select * from Pets;
-- select * from Adoptions;
-- select * from PetVaccinations;

SET FOREIGN_KEY_CHECKS = 1;
COMMIT;