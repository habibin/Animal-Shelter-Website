// App.js

/*
    SETUP
*/

var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
PORT        = 9125;                 // Set a port number at the top so it's easy to change in the future


const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


// Database
var db = require('./database/db-connector')


/*
    ROUTES
*/
app.get('/', function(req, res)
    {
        res.render('homepage');                    // Note the call to render() and not send(). Using render() ensures the templating engine
    });     
                                        // will process this file, before sending the finished HTML to the client.

app.get('/customers', function(req, res)
{  
    let query1 = "SELECT * FROM Customers;";               // Define our query

    db.pool.query(query1, function(error, rows, fields){    // Execute the query

        res.render('customers', {data: rows});                  // Render the index.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
});                                                         // received back from the query

app.get('/pets', function(req, res)
{  
    let query1 = "SELECT * FROM Pets;";               // Define our query

    db.pool.query(query1, function(error, rows, fields){    // Execute the query

        res.render('pets', {data: rows});                  // Render the index.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
});                                                         // received back from the query


app.get('/employees', function(req, res)
{  
    let query1 = "SELECT * FROM Employees;";               // Define our query

    db.pool.query(query1, function(error, rows, fields){    // Execute the query

        res.render('employees', {data: rows});                  // Render the index.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
});                                                         // received back from the query


app.get('/adoptions', function(req, res)
{  
    let query1 = "SELECT * FROM Adoptions;";               // Define our query

    db.pool.query(query1, function(error, rows, fields){    // Execute the query

        res.render('adoptions', {data: rows});                  // Render the index.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
});                                                         // received back from the query

app.post('/add-adoption-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let employee_id = parseInt(data.employee_id);
    if (isNaN(employee_id))
    {
        employee_id = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Adoptions (customer_id, date, pet_id, employee_id) VALUES (${adoption_id}, ${customer_id}, ${date}, ${pet_id}, ${employee_id})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Adoptions
            query2 = `SELECT * FROM Adoptions;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.get('/vaccinations', function(req, res)
{  
    let query1 = "SELECT * FROM Vaccinations;";               // Define our query

    db.pool.query(query1, function(error, rows, fields){    // Execute the query

        res.render('vaccinations', {data: rows});                  // Render the index.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
});    

// received back from the query
app.get('/petvaccinations', function(req, res)
{  
    let query1 = "SELECT * FROM PetVaccinations;";               // Define our query

    db.pool.query(query1, function(error, rows, fields){    // Execute the query

        res.render('petvaccinations', {data: rows});                  // Render the index.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
});                                                         // received back from the query


/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});