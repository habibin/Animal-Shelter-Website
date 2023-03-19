------------------------------------------------------------------------------
-- Customers queries --
------------------------------------------------------------------------------
-- select all customers --
SELECT  Customers.customer_id,
        Customers.first_name,
        Customers.last_name,
        Customers.street,
        Customers.city,
        Customers.state,
        Customers.zip_code,
        Customers.phone_number
FROM Customers

-- add new customer --
INSERT INTO Customers(first_name, last_name, city, state, zip_code, phone_number)
VALUES (:first_nameInput,
        :last_nameInput,
        :cityInput,
        :stateInput,
        :zip_codeInput,
        :phone_numberInput)

-- update customer data --
SELECT  Customers.customer_id,
        Customers.phone_number
FROM Customers WHERE customer_id = :customer_id_selected_from_browse_customers_page
UPDATE Customers
SET 
    phone_number = :phone_numberInput
WHERE customer_id = :customer_id_from_the_update_form

-- Delete customer --
DELETE FROM Customers
WHERE customer_id = :customer_id_selected_from_browse_customers_page



------------------------------------------------------------------------------
-- Employees queries --
------------------------------------------------------------------------------
-- select all employees --
SELECT  Employees.employee_id,
        Employees.first_name,
        Employees.last_name
FROM Employees

-- add new employees --
INSERT INTO Employees(first_name, last_name)
VALUES (:first_nameInput,
        :last_nameInput)

-- Delete employees --
DELETE FROM Employees
WHERE employee_id = :employee_id_selected_from_browse_employees_page


------------------------------------------------------------------------------
-- Pets queries --
------------------------------------------------------------------------------
-- select all pets --
SELECT  Pets.pet_id,
        Pets.pet_name,
        Pets.species,
        Pets.age,
        Pets.gender
FROM Pets

-- add new pets --
INSERT INTO Pets(pet_name, species, age, gender)
VALUES (:pet_nameInput,
        :speciesInput,
        :ageInput,
        :genderInput)

-- Delete pets --
DELETE FROM Pets
WHERE pet_id = :pet_id_selected_from_browse_pets_page


------------------------------------------------------------------------------
-- Vaccinations queries --
------------------------------------------------------------------------------
-- select all vaccination --
SELECT  Vaccinations.vaccination_id,
        Vaccinations.vaccination_name,
        Vaccinations.age_administered,
        Vaccinations.dosage,
        Vaccinations.species,
        Vaccinations.booster,
        Vaccinations.description
FROM Vaccinations

-- add new vaccination --
INSERT INTO Vaccinations(vaccination_name, age_administered, dosage, species, booster, description)
VALUES (:vaccination_nameInput,
        :age_administeredInput,
        :dosageInput,
        :speciesInput,
        :boosterInput,
        :descriptionInput)

-- Delete vaccination --
DELETE FROM Vaccinations
WHERE vaccination_id = :vaccination_id_selected_from_browse_vaccinations_page



------------------------------------------------------------------------------
-- Adoptions queries --
------------------------------------------------------------------------------
-- select all adoptions --
SELECT  Adoptions.adoption_id,
        Customers.customer_id,
        Adoptions.date,
        Pets.pet_id,
        Employees.employee_id
FROM Adoptions
INNER JOIN Customers ON Adoptions.customer_id = Customers.customer_id
INNER JOIN Pets ON Adoptions.pet_id = Pets.pet_id
INNER JOIN Employees ON Adoptions.employee_id = Employees.employee_id

-- add new adoption --
INSERT INTO Adoptions(customer_id,date, pet_id, employee_id)
VALUES  ((customer_id WHERE customer_id = :customer_idInput), 
        :dateInput,
        (pet_id WHERE pet_id = :pet_idInput),
        (employee_id WHERE employee_id = :employee_idInput))

DELETE FROM Adoptions
WHERE adoption_id = :adoption_id_selected_from_browse_vaccinations_page

------------------------------------------------------------------------------
-- PetVaccinations queries --
------------------------------------------------------------------------------
-- select all petvaccination --
SELECT  PetVaccinations.petvaccination_id,
        PetVaccinations.date,
        Pets.pet_id,
        Vaccinations.vaccination_id
FROM PetVaccinations
INNER JOIN Pets ON PetVaccinations.pet_id = Pets.pet_id
INNER JOIN Vaccinations ON PetVaccinations.vaccination_id = Vaccinations.vaccination_id

-- add new petvaccination --
INSERT INTO PetVaccinations(date, pet_id, vaccination_id)
VALUES (:dateInput,
        (pet_id WHERE pet_id = :pet_idInput),
        (vaccination_id WHERE vaccination_id = :vaccination_idInput))

-- delete petvaccination --
DELETE FROM PetVaccinations
WHERE petvaccination_id = :petvaccination_id_selected_from_browse_vaccinations_page

-- update petvaccination --
SELECT  PetVaccinations.petvaccination_id,
        PetVaccinations.date,
        Pets.pet_id,
        Vaccinations.vaccination_id
FROM PetVaccinations  WHERE petvaccination_id = :petvaccination_id_selected_from_browse_vaccinations_page
UPDATE PetVaccinations
SET date = :date
WHERE petvaccination_id = :petvaccination_id_from_the_update_form
