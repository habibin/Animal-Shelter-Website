// Get the objects we need to modify
let addAdoptionForm = document.getElementById('add-adoption-form-ajax');

// Modify the objects we need
addAdoptionForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputcustomer_id = document.getElementById("input-customer_id");
    let inputdate = document.getElementById("input-date");
    let inputpet_id = document.getElementById("input-pet_id");
    let inputemployee_id = document.getElementById("input-employee_id");

    // Get the values from the form fields
    let customer_idValue = inputcustomer_id.value;
    let dateValue = inputdate.value;
    let pet_idValue = inputpet_id.value;
    let employee_idValue = inputemployee_id.value;

    // Put our data we want to send in a javascript object
    let data = {
        customer_id: customer_idValue,
        date: dateValue,
        pet_id: pet_idValue,
        employee_id: employee_idValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-adoption-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction

            inputcustomer_id.value = '';
            inputdate.value = '';
            inputpet_id.value = '';
            inputemployee_id.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("adoptions-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let customer_idCell = document.createElement("TD");
    let dateCell = document.createElement("TD");
    let pet_idCell = document.createElement("TD");
    let employee_idCell = document.createElement("TD");

    // Fill the cells with correct data
    customer_idCell.innerText = newRow.customer_id;
    dateCell.innerText = newRow.date;
    pet_idCell.innerText = newRow.pet_id;
    employee_idCell.innerText = newRow.employee_id;

    // Add the cells to the row 
    row.appendChild(customer_idCell);
    row.appendChild(dateCell);
    row.appendChild(pet_idCell);
    row.appendChild(employee_idCell);
    
    // Add the row to the table
    currentTable.appendChild(row);
}