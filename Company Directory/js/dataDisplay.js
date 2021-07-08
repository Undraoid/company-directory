//companydirectory/libs/php/getDepartmentByID.php

$(document).ready(function() {
    $('#searchButton').click(function(){
        $.ajax({
            type: 'GET',
            url: 'companydirectory/libs/php/filterLocationId.php',
            dataType: 'json',
            data: {
             departmentId: $('#departmentSelect').val()
            },
            success: function(result){
var table = $("tbody");
table.empty();
              
for(var i=0; i<result.data.length; i+=5){
    console.log(result.data[i]);
 
  
  var row = `
    <tr>
      <th scope="row">${result.data[i].firstName}</th>
      <td>${result.data[i].lastName}</td>
      <td>${result.data[i].jobTitle}</td>
      <td>${result.data[i].email}</td>
      <td>${result.data[i].name}</td>
    </tr>`

     table.append(row);
  
}
            }
        });
    
    })
})
