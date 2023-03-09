function deleteEmployee(employeeID) {
    let link = '/delete-employee-ajax/';
    let data = {
      id: employeeID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function (result) {
        deleteRow(employeeID);
      }
    });
  }
  
  function deleteRow(employeeID) {
    let table = document.getElementById("employee-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
      if (table.rows[i].getAttribute("data-value") == employeeID) {
        table.deleteRow(i);
        break;
      }
    }
    // document.location.reload(true);
  }