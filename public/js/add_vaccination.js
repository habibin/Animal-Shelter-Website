// Get the objects we need to modify
let addVaccinationForm = document.getElementById("add-vaccination-form-ajax");

// Modify the objects we need
addVaccinationForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputVaccinationName = document.getElementById("input-vaccination_name");
    let inputAge = document.getElementById("input-age_administered");
    let inputDosage = document.getElementById("input-dosage");
    let inputSpecies = document.getElementById("input-species");
    let inputBooster = document.getElementById("input-booster");
    let inputDescription = document.getElementById("input-description");

    // Get the values from the form fields
    let vaccinationNameValue = inputVaccinationName.value;
    let ageValue = inputAge.value;
    let dosageValue = inputDosage.value;
    let speciesValue = inputSpecies.value;
    let boosterValue = inputBooster.value;
    let descriptionValue = inputDescription.value;
  

    // Put our data we want to send in a javascript object
    let data = {
        vaccination_name: vaccinationNameValue,
        age_administered: ageValue,
        dosage: dosageValue,
        species: speciesValue,
        booster: boosterValue,
        description: descriptionValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-vaccination-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputVaccinationName.value = '';
            inputAge.value = '';
            inputDosage.value = '';
            inputSpecies.value = '';
            inputBooster.value = '';
            inputDescription.value = '';
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
    let currentTable = document.getElementById("vaccination-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let vaccinationNameCell = document.createElement("TD");
    let ageCell = document.createElement("TD");
    let dosageCell = document.createElement("TD");
    let speciesCell = document.createElement("TD");
    let boosterCell = document.createElement("TD");
    let descriptionCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.vaccination_id;
    vaccinationNameCell.innerText = newRow.vaccination_name;
    ageCell.innerText = newRow.age_administered;
    dosageCell.innerText = newRow.dosage;
    speciesCell.innerText = newRow.species;
    boosterCell.innerText = newRow.booster;
    descriptionCell.innerText = newRow.description;

    deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = function(){
        deleteVaccination(newRow.vaccination_id);
    };
    deleteCell.appendChild(deleteButton);


    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(vaccinationNameCell);
    row.appendChild(ageCell);
    row.appendChild(dosageCell);
    row.appendChild(speciesCell);
    row.appendChild(boosterCell);
    row.appendChild(descriptionCell);
    row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.vaccination_id);
    
    // Add the row to the table
    currentTable.appendChild(row);
}