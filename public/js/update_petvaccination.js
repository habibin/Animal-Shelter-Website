// Get the objects we need to modify
let updatePersonForm = document.getElementById('update-pVac-form-ajax');

// Modify the objects we need
updatePersonForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let customer = document.getElementById("idInput");
    let inputDate = document.getElementById("input-update-date");

    // Get the values from the form fields
    let customerValue = customer.value;
    let userDate = inputDate.value;
    
    // Put our data we want to send in a javascript object
    let data = {
        customerID: customerValue,
        date: userDate,
    }

    console.log(JSON.stringify(data));

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-petvaccination-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, customerValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, personID){
    let parsedData = JSON.parse(data);
    console.log(parsedData);
    let table = document.getElementById("petvaccination-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == personID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            // Get td of homeworld value
            let td = updateRowIndex.getElementsByTagName("td")[1];
            console.log(td);
            // Reassign homeworld to our value we updated to
            td.innerHTML = parsedData[0].date.toString().slice(0,10); 

            console.log(td);
       }
    }

    document.location.reload(true);
}
