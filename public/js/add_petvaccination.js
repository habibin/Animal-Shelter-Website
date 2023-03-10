// Get the objects we need to modify
let addPVACForm = document.getElementById("add-pVaccination-form-ajax");

// Modify the objects we need
addPVACForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputPetName = document.getElementById("input-pet_id");
    let inputDate = document.getElementById("input-date");
    let inputVID = document.getElementById("input-vaccination_id");

    // Get the values from the form fields
    let petID = inputPetName.value;
    let date = inputDate.value;
    let vID = inputVID.value;
  

    // Put our data we want to send in a javascript object
    let data = {
        pet_id: petID,
        date: date,
        VID: vID,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-pVaccination-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputPetName.value = '';
            inputDate.value = '';
            inputVID.value = '';
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
    let currentTable = document.getElementById("petvaccination-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let petCell = document.createElement("TD");
    let dateCell = document.createElement("TD");
    let vaccinationCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");


    // Fill the cells with correct data
    idCell.innerText = newRow.petvaccination_id;
    petCell.innerText = newRow.pet_id;
    dateCell.innerText = newRow.date;
    vaccinationCell.innerText = newRow.vaccination_id;

    deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = function(){
        deletePetVaccination(newRow.petvaccination_id);
    };
    deleteCell.appendChild(deleteButton);


    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(dateCell);
    row.appendChild(petCell);
    row.appendChild(vaccinationCell);
    row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.petvaccination_id);

    // Add the row to the table
    currentTable.appendChild(row);

    document.location.reload(true);
}