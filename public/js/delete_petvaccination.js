function deletePetVaccination(petVaccinationID) {
    let link = '/delete-petvaccination-ajax/';
    let data = {
      id: petVaccinationID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function (result) {
        deleteRow(petVaccinationID);
      }
    });
}
  
  function deleteRow(petVaccinationID) {
    let table = document.getElementById("petvaccination-table");
    console.log(table);
    for (let i = 0, row; row = table.rows[i]; i++) {
      if (table.rows[i].getAttribute("data-value") == petVaccinationID) {
        table.deleteRow(i);
        break;
      }
    }
    // document.location.reload(true);
  }