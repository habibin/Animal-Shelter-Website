// App.js

/*
    SETUP
*/

//express
var express = require('express');   // We are using the express library for the web server
var app = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
PORT = 9864;                 // Set a port number at the top so it's easy to change in the future

//handlerbars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({ extname: ".hbs" }));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


// Database
var db = require('./database/db-connector')

/*
    ROUTES
*/
app.get('/', function (req, res) {
    res.render('homepage');                    // Note the call to render() and not send(). Using render() ensures the templating engine
});
// will process this file, before sending the finished HTML to the client.

app.get('/customers', function (req, res) {
    let query1 = "SELECT * FROM Customers;";               // Define our query

    let query2 = "SELECT * FROM Customers;"

    db.pool.query(query1, function (error, rows, fields) {
        let customers = rows;    // Execute the query
        db.pool.query(query2, (error, rows, fields) => {

            // Save the planets
            let names = rows;

            return res.render('customers', { data: customers, people: names });
        })               // Render the index.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
});                                                         // received back from the query

app.post('/add-customer-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Customers(first_name, last_name, street, city, state, zip_code, phone_number) 
    VALUES ('${data.first_name}', '${data.last_name}', '${data.street}', '${data.city}','${data.state}','${data.zip_code}','${data.phone_number}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        else {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Customers;`;
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }

                // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
                // presents it on the screen
                else {
                    res.send(rows);
                }
            })
        }
    })
});

app.put('/put-customer-ajax', function (req, res, next) {
    let data = req.body;

    let phoneNumber = parseInt(data.phone_number);
    let person = parseInt(data.customerID);

    let queryUpdateCustomer = `UPDATE Customers SET phone_number = ? WHERE customer_id = ?`;
    let selectCustomers = `SELECT * FROM Customers WHERE customer_id = ?`

    // Run the 1st query
    db.pool.query(queryUpdateCustomer, [phoneNumber, person], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }else{
            db.pool.query(selectCustomers, [person], function(error, rows, fields)
            {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});

app.delete('/delete-customer-ajax/', function (req, res, next) {
    let data = req.body;
    let customerID = parseInt(data.id);
    console.log(customerID);
    let deleteAdoption = `DELETE FROM Adoptions WHERE customer_id = ?`;
    console.log(deleteAdoption);
    let deleteCustomer_id = `DELETE FROM Customers WHERE customer_id = ?`;
    console.log(deleteCustomer_id);


    // Run the 1st query
    db.pool.query(deleteAdoption, [customerID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        else {
            //Run the second query
            db.pool.query(deleteCustomer_id, [customerID], function (error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.sendStatus(204);
                }
            })
        }
    })
});

// ----------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------

app.get('/pets', function (req, res) {
    let query1 = "SELECT * FROM Pets;";               // Define our query

    let query2 = "SELECT * FROM Pets;"

    db.pool.query(query1, function (error, rows, fields) {
        let pets = rows;    // Execute the query
        db.pool.query(query2, (error, rows, fields) => {

            return res.render('pets', { data: pets});
        })               // Render the index.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
});                                                         // received back from the query

app.post('/add-pet-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Pets(pet_name, species, age, gender) 
    VALUES ('${data.pet_name}', '${data.species}', '${data.age}', '${data.gender}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        else {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Pets;`;
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }

                // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
                // presents it on the screen
                else {
                    res.send(rows);
                }
            })
        }
    })
});


app.delete('/delete-pet-ajax/', function (req, res, next) {
    let data = req.body;
    let petID = parseInt(data.id);
    let deleteAdoption = `DELETE FROM Adoptions WHERE pet_id = ?`;
    let deletePet_id = `DELETE FROM Pets WHERE pet_id = ?`;


    // Run the 1st query
    db.pool.query(deleteAdoption, [petID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        else {
            //Run the second query
            db.pool.query(deletePet_id, [petID], function (error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.sendStatus(204);
                }
            })
        }
    })
});

// ----------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------

app.get('/employees', function (req, res) {
    let query1 = "SELECT * FROM Employees;";               // Define our query

    let query2 = "SELECT * FROM Employees;"

    db.pool.query(query1, function (error, rows, fields) {
        let employees = rows;    // Execute the query
        db.pool.query(query2, (error, rows, fields) => {

            return res.render('employees', { data: employees});
        })               // Render the index.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
});                                                         // received back from the query

app.post('/add-employee-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Employees(first_name, last_name) 
    VALUES ('${data.first_name}', '${data.last_name}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        else {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Employees;`;
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }

                // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
                // presents it on the screen
                else {
                    res.send(rows);
                }
            })
        }
    })
});


app.delete('/delete-employee-ajax/', function (req, res, next) {
    let data = req.body;
    let employeeID = parseInt(data.id);
    let deleteAdoption = `DELETE FROM Adoptions WHERE employee_id = ?`;
    let deleteEmployee_id = `DELETE FROM Employees WHERE employee_id = ?`;


    // Run the 1st query
    db.pool.query(deleteAdoption, [employeeID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        else {
            //Run the second query
            db.pool.query(deleteEmployee_id, [employeeID], function (error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.sendStatus(204);
                }
            })
        }
    })
});

// ----------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------

app.get('/adoptions', function (req, res) {
    let query1 = "SELECT * FROM Adoptions;";               // Define our query
    let query2 = "SELECT * FROM Customers;";               // Define our query
    let query3 = "SELECT * FROM Pets;";               // Define our query
    let query4 = "SELECT * FROM Employees;";               // Define our query


    db.pool.query(query1, function (error, adoptions, fields) {    // Execute the query
        
        db.pool.query(query2, (error, customers, field) => {

            let customermap = {}
            customers.map(customer => {
                let id = parseInt(customer.customer_id, 10);

                customermap[id] = customer["first_name"] + ' ' + customer["last_name"];
            })

            adoptions = adoptions.map(adoption =>{
                return Object.assign(adoption, {customer_id: customermap[adoption.customer_id]});
            })

            db.pool.query(query3, (error, pets, field) => {
                let petmap = {}
                pets.map(pet =>{
                    let id = parseInt(pet.pet_id, 10);
                    
                    petmap[id] = pet["pet_name"];
                })
                
                adoptions = adoptions.map(adoption =>{
                    return Object.assign(adoption, {pet_id: petmap[adoption.pet_id]});
                })

                db.pool.query(query4, (error, employees, field) => {
                    let employeemap = {}
                    employees.map(employee => {
                        let id = parseInt(employee.employee_id, 10);

                        employeemap[id] = employee["first_name"] + ' ' + employee["last_name"];
                    })

                    adoptions = adoptions.map(adoption =>{
                        return Object.assign(adoption, {employee_id: employeemap[adoption.employee_id]});
                    })

                    return res.render('adoptions', { data: adoptions, customer: customers, pet: pets, employee: employees });                  // Render the adoptions.hbs file, and also send the renderer
                });
            });
        });
    });
});

app.post('/add-adoption-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let employee_id = parseInt(data['employee_id']);
    if (isNaN(employee_id)) {
        employee_id_check = null
    }
    else {
        employee_id_check = parseInt(data['employee_id'])
    }
    // Create the query and run it on the database


    let query1 = `INSERT INTO Adoptions(customer_id, date, pet_id, employee_id) 
    VALUES ('${data['customer_id']}', '${data['date']}', '${data['pet_id']}', ${employee_id_check})`;
    let query2 = "SELECT * FROM Adoptions";
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else {
            db.pool.query(query2, function (error, rows, fields){
                if (error) {
        
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
        
                else {
                    res.send(rows);
                }
            })
        }
    })
});

app.delete('/delete-adoption-ajax/', function (req, res, next) {
    let data = req.body;
    let adoptionID = parseInt(data.id);
    let deleteAdoption = `DELETE FROM Adoptions WHERE adoption_id = ?`;

    // Run the 1st query
    db.pool.query(deleteAdoption, [adoptionID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        else {
            res.sendStatus(204);
        }
    })
});

// ----------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------


app.get('/vaccinations', function (req, res) {
    let query1 = "SELECT * FROM Vaccinations;";               // Define our query

    let query2 = "SELECT * FROM Vaccinations;"

    db.pool.query(query1, function (error, rows, fields) {
        let vaccinations = rows;    // Execute the query
        db.pool.query(query2, (error, rows, fields) => {

            return res.render('vaccinations', { data: vaccinations});
        })               // Render the index.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
});                                                         // received back from the query

app.post('/add-vaccination-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Vaccinations(vaccination_name, age_administered, dosage, species, booster, description) 
    VALUES ('${data.vaccination_name}', '${data.age}', '${data.dosage}', '${data.species}', '${data.booster}', '${data.description}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        else {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Vaccinations;`;
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }

                // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
                // presents it on the screen
                else {
                    res.send(rows);
                }
            })
        }
    })
});


app.delete('/delete-vaccination-ajax/', function (req, res, next) {
    let data = req.body;
    let vaccinationID = parseInt(data.id);
    let deleteAdoption = `DELETE FROM Adoptions WHERE vaccination_id = ?`;
    let deleteVaccination_id = `DELETE FROM Vaccinations WHERE vaccination_id = ?`;


    // Run the 1st query
    db.pool.query(deleteAdoption, [vaccinationID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        else {
            //Run the second query
            db.pool.query(deleteVaccination_id, [vaccinationID], function (error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.sendStatus(204);
                }
            })
        }
    })
});

// ----------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------

app.get('/petvaccinations', function (req, res) {
    let query1 = "SELECT * FROM PetVaccinations;";               // Define our query
    let query2 = "SELECT * FROM Pets;";               // Define our query
    let query3 = "SELECT * FROM Vaccinations;";               // Define our query             // Define our query


    db.pool.query(query1, function (error, petvaccinations, fields) {    // Execute the query

        db.pool.query(query2, (error, pet, field) => {

            db.pool.query(query3, (error, vaccination, field) => {

                return res.render('petvaccinations', { data: petvaccinations, pet: pet, vaccination: vaccination });                  // Render the adoptions.hbs file, and also send the renderer

            });
        });
    });
});                                                         // received back from the query


app.post('/add-pVaccination-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    // Create the query and run it on the database
    query1 = `INSERT INTO PetVaccinations(date, pet_id, vaccination_id) 
    VALUES ('${data['date']}', '${data['pet_id']}', '${data['VID']}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else {
            let query2 = "SELECT * FROM PetVaccinations;";               // Define our query         // Define our query             // Define our query

            db.pool.query(query2, function (error, petvaccinations, fields) {    // Execute the query
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error)
                    res.sendStatus(400);
                }else
                {
                    res.send(petvaccinations);
                }
               
            });
        }
    })
});

app.delete('/delete-petvaccination-ajax/', function (req, res, next) {
    let data = req.body;
    let pVaccinationID = parseInt(data.id);
    console.log(pVaccinationID);
    let deletePetVaccination = `DELETE FROM PetVaccinations WHERE petvaccination_id = ?`;


    // Run the 1st query
    db.pool.query(deletePetVaccination, [pVaccinationID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        else {
            res.sendStatus(204);
        }
    })
});

/*
    LISTENER
*/
app.listen(PORT, function () {            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});