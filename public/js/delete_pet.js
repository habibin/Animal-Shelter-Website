function deletePet(petID) {
    let link = '/delete-pet-ajax/';
    let data = {
      id: petID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function (result) {
        deleteRow(petID);
      }
    });
  }
  
  function deleteRow(petID) {
    let table = document.getElementById("pet-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
      if (table.rows[i].getAttribute("data-value") == petID) {
        table.deleteRow(i);
        break;
      }
    }
    // document.location.reload(true);
  }