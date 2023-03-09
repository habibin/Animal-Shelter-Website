function deleteVaccination(vaccinationID) {
    let link = '/delete-vaccination-ajax/';
    let data = {
      id: vaccinationID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function (result) {
        deleteRow(vaccinationID);
      }
    });
  }
  
  function deleteRow(vaccinationID) {
    let table = document.getElementById("vaccination-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
      if (table.rows[i].getAttribute("data-value") == vaccinationID) {
        table.deleteRow(i);
        break;
      }
    }
    // document.location.reload(true);
  }