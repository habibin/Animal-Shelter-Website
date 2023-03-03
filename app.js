// App.js

/*
    SETUP
*/

//express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
PORT        = 9131;                 // Set a port number at the top so it's easy to change in the future

//handlerbars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


// Database
var db = require('./database/db-connector')

//static files
app.use(express.static('public'));


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
    let query2 = "SELECT * FROM Pets;";               // Define our query

    db.pool.query(query2, function(error, rows, fields){    // Execute the query

        res.render('pets', {data: rows});                  // Render the index.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
});                                                         // received back from the query


app.get('/employees', function(req, res)
{  
    let query3 = "SELECT * FROM Employees;";               // Define our query

    db.pool.query(query3, function(error, rows, fields){    // Execute the query

        res.render('employees', {data: rows});                  // Render the index.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
});                                                         // received back from the query


app.get('/adoptions', function(req, res)
{  
    let query4 = "SELECT * FROM Adoptions;";               // Define our query

    db.pool.query(query4, function(error, rows, fields){    // Execute the query

        res.render('adoptions', {data: rows});                  // Render the adoptions.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
});                                                         // received back from the query

app.get('/vaccinations', function(req, res)
{  
    let query4 = "SELECT * FROM Vaccinations;";               // Define our query

    db.pool.query(query4, function(error, rows, fields){    // Execute the query

        res.render('vaccinations', {data: rows});                  // Render the index.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
});    

// received back from the query
app.get('/petvaccinations', function(req, res)
{  
    let query5 = "SELECT * FROM PetVaccinations;";               // Define our query

    db.pool.query(query5, function(error, rows, fields){    // Execute the query

        res.render('petvaccinations', {data: rows});                  // Render the index.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
});                                                         // received back from the query

app.post('/add-customer-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Customers(first_name, last_name, city, street, state, zip_code, phone_number) 
    VALUES ('${data['input-first_name']}', '${data['input-last_name']}', '${data['input-street']}', '${data['input-city']}','${data['input-state']}','${data['input-zip_code']}','${data['input-phone_number']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/customers');
        }
    })
});

app.post('/add-pet-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Pets(pet_name, species, age, gender) 
    VALUES ('${data['input-pet_name']}', '${data['input-species']}', '${data['input-age']}', '${data['input-gender']}')`;
    db.pool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/pets');
        }
    })
});

app.post('/add-employee-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Employees(first_name, last_name) 
    VALUES ('${data['input-first_name']}', '${data['input-last_name']}')`;
    db.pool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/employees');
        }
    })
});

app.post('/add-vaccination-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Vaccinations(vaccination_name, age_administered, dosage, species, booster, description) 
    VALUES ('${data['input-vaccination_name']}', '${data['input-age_administered']}', '${data['input-dosage']}', '${data['input-species']}','${data['input-booster']}','${data['input-description']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/vaccination');
        }
    })
});


app.delete('/delete-customer-ajax/', function(req,res,next){
    let data = req.body;
    let customerID = parseInt(data.id);
    let deleteCustomer_pid = `DELETE FROM Customers WHERE pid = ?`;
    let deleteCustomer_id= `DELETE FROM Customers WHERE customer_id = ?`;
  
  
        //   // Run the 1st query
        //   db.pool.query(deleteCustomer_pid, [customerID], function(error, rows, fields){
        //       if (error) {
  
        //       // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        //       console.log(error);
        //       res.sendStatus(400);
        //       }
  
        //       else
              {
                  // Run the second query
                  db.pool.query(deleteCustomer_id, [customerID], function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.sendStatus(204);
                      }
                  })
              }
//   })
});


/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});