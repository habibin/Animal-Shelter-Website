function deletecustomer(customerid) {
  let link = '/delete-customer-ajax/';
  let data = {
    id: customerid
  };

  $.ajax({
    url: link,
    type: 'DELETE',
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    success: function (result) {
      deleteRow(customerid);
    }
  });
}

function deleteRow(customerid) {
  let table = document.getElementById("customer-table");
  for (let i = 0, row; row = table.rows[i]; i++) {
    if (table.rows[i].getAttribute("data-value") == customerid) {
      table.deleteRow(i);
      break;
    }
  }
}


function deleteCustomer(customerid) {
  // Put our data we want to send in a javascript object
  let data = {
    id: customerid
  };

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "/delete-customer-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 204) {

      // Add the new data to the table
      deleteRow(customerid);

    }
    else if (xhttp.readyState == 4 && xhttp.status != 204) {
      console.log("There was an error with the input.")
    }
  }
  // Send the request and wait for the response
  xhttp.send(JSON.stringify(data));
}


function deleteRow(customerid) {

  let table = document.getElementById("customer-table");
  for (let i = 0, row; row = table.rows[i]; i++) {
    //iterate through rows
    //rows would be accessed using the "row" variable assigned in the for loop
    if (table.rows[i].getAttribute("data-value") == customerid) {
      table.deleteRow(i);
      break;
    }
  }
}