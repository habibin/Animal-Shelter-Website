function deleteAdoption(adoptionID) {
    let link = '/delete-adoption-ajax/';
    let data = {
      id: adoptionID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function (result) {
        deleteRow(adoptionID);
      }
    });
}
  
  function deleteRow(adoptionID) {
    let table = document.getElementById("adoption-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
      if (table.rows[i].getAttribute("data-value") == adoptionID) {
        table.deleteRow(i);
        break;
      }
    }
    // document.location.reload(true);
  }