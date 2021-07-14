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
  
  $('#InputSelect3').change(function(){
    $.ajax({
        type: 'GET',
            url: 'companydirectory/libs/php/filterLocationId.php',
            dataType: 'json',
            data: {
             departmentId: $('#InputSelect3').val()
            },
            success: function(result){
              console.log(result.data[i]);
                var closeButton = $("#InputSelect2");
                closeButton.empty();

                for(var i=0; i<result.data.length; i+=5){

                   var select = `
                    <option>${result.data[i].firstName + " " + result.data[i].lastName}</option>
                    `
                
                     closeButton.append(select);
                  
                }
            }
    })
})
  
  
$('#buttonAdd').click(function(){
    $('form').submit(function (evt) {
        evt.preventDefault();
        $.ajax({
            type: 'POST',
            url: 'companydirectory/libs/php/addStaff.php',
            data: {
             name: $("#fn").val(),
             surname: $("#ln").val(),
             titleJob: $('#jobtitle').val(),
             email: $("#email").val(),
             departmentId: $("#InputSelect3").val()
            },
            success: function(result){
    console.log("New Staff Added!" + result.data);
            }
        })
        $(this).unbind('submit').submit()
    })
    })
  
  
$('#buttonRemove').click(function() {
      $('.form2').submit(function (evt) {
        console.log("event prevent");
    evt.preventDefault();
    $.ajax({
        type: 'POST',
        url: 'companydirectory/libs/php/deleteStaff.php',
        data: {
            staff: $("#InputSelect2").val().split(" ")[0]
        },
        success: function(result){
            console.log("Staff Removed!" + result.data);
        }
    })
    $(this).unbind('submit').submit()
})
  })


  
})
