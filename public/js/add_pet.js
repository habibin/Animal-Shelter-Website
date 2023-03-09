// Get the objects we need to modify
let addCustomerForm = document.getElementById("add-pet-form-ajax");

// Modify the objects we need
addCustomerForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputPetName = document.getElementById("input-pet_name");
    let inputSpecies = document.getElementById("input-species");
    let inputAge = document.getElementById("input-age");
    let inputGender = document.getElementById("input-gender");

    // Get the values from the form fields
    let petNameValue = inputPetName.value;
    let speciesValue = inputSpecies.value;
    let ageValue = inputAge.value;
    let genderValue = inputGender.value;
  

    // Put our data we want to send in a javascript object
    let data = {
        pet_name: petNameValue,
        species: speciesValue,
        age: ageValue,
        gender: genderValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-pet-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputPetName.value = '';
            inputSpecies.value = '';
            inputAge.value = '';
            inputGender.value = '';
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
    let currentTable = document.getElementById("pet-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let petNameCell = document.createElement("TD");
    let speciesCell = document.createElement("TD");
    let ageCell = document.createElement("TD");
    let genderCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.pet_id;
    petNameCell.innerText = newRow.pet_name;
    speciesCell.innerText = newRow.species;
    ageCell.innerText = newRow.age;
    genderCell.innerText = newRow.gender;

    deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = function(){
        deletePet(newRow.pet_id);
    };
    deleteCell.appendChild(deleteButton);


    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(petNameCell);
    row.appendChild(speciesCell);
    row.appendChild(ageCell);
    row.appendChild(genderCell);
    row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.pet_id);
    
    // Add the row to the table
    currentTable.appendChild(row);
    // let selectMenu = document.getElementById("nameInput");
    // let option = document.createElement("option");
    // option.text = newRow.first_name + ' ' + newRow.last_name;
    // option.value = newRow.customer_id;
    // selectMenu.add(option);
}