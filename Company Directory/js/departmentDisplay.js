$(document).ready(function () {


    $.ajax({
        type: 'GET',
        url: 'companydirectory/libs/php/locationID.php',
        dataType: 'json',
        success: function (locationResult) {

            $.ajax({
                type: 'GET',
                url: 'companydirectory/libs/php/getAllDepartments.php',
                dataType: 'json',
                success: function (result) {
                    var table = $("tbody");
                    table.empty();
        
                    for (var i = 0; i < result.data.length; i ++) {
        
                        var row = `
        <tr>
          <th scope="row" id="tableName" data-value=${result.data[i].id}>${result.data[i].name}</th>
          <td id="tableLocation" data-value=${locationResult.data[i].id}>${locationResult.data[i].name}</td>
<td><a href="#" id="removeUser" onclick="resetVal() data-toggle="modal" data-target="#ModalConfirm"><i class="fas fa-minus" style="float:right; margin-left:50px; color:red;" id="iconSettings"></i></a><a href="#" id="editUser" onclick="valReset()" data-toggle="modal" data-target="#updateModal"><i class="fas fa-pencil-alt" style="float:right;" id="iconSettings"></i></a></td>
        </tr>`

        
                        table.append(row);
        
                    }
                }
            });


        }
    });

  $(".loader").hide();
  
   $.ajax({
        type: 'GET',
        url: 'companydirectory/libs/php/getLocation.php',
        dataType: 'json',
        success: function (result) {
var addSelect = $("#InputSelect");

for(i=0;i<result.data.length; i++){
    var options = `
  <option value=${result.data[i].id}>${result.data[i].name}</option>
    `
  addSelect.append(options);
}

       

        }
    });


    $.ajax({
        type: 'GET',
        url: 'companydirectory/libs/php/getLocation.php',
        dataType: 'json',
        success: function (result) {
var addSelect = $("#SelectInput3");

for(i=0;i<result.data.length; i++){
    var options = `
  <option value=${result.data[i].id}>${result.data[i].name}</option>
    `
  addSelect.append(options);
}

       

        }
    });



    function reset(){
      $(".loader").show();
        $.ajax({
        type: 'GET',
        url: 'companydirectory/libs/php/locationID.php',
        dataType: 'json',
        success: function (locationResult) {

            $.ajax({
                type: 'GET',
                url: 'companydirectory/libs/php/getAllDepartments.php',
                dataType: 'json',
                success: function (result) {
                    var table = $("tbody");
                    table.empty();
        
                    for (var i = 0; i < result.data.length; i ++) {
        
                        var row = `
        <tr>
          <th scope="row" id="tableName" data-value=${result.data[i].id}>${result.data[i].name}</th>
          <td id="tableLocation">${locationResult.data[i].name}</td>
<td><a href="#" id="removeUser" onclick="resetVal() data-toggle="modal" data-target="#ModalConfirm"><i class="fas fa-minus" style="float:right; margin-left:50px; color:red;" id="iconSettings"></i></a><a href="#" id="editUser" onclick="valReset()" data-toggle="modal" data-target="#updateModal"><i class="fas fa-pencil-alt" style="float:right;" id="iconSettings"></i></a></td>
        </tr>`

        
                        table.append(row);
        
                    }
                }
            });


        }
    });

  $(".loader").hide();
    }




    $(document).on('click', '#buttonAdd', function(e) {
        $.ajax({
            type: 'POST',
            url: 'companydirectory/libs/php/addDepartment.php',
            data: {
                name: $("#fn").val(),
                locationID: $("#InputSelect").val()
            },
            success: function (result) {
                console.log("New Staff Added!" + result.data);
               $('#myModal').modal('toggle');
               reset();
            }
        })
        $(this).unbind('submit').submit()
    })


  
          $(document).on('click', '#removeUser', function(e) {
    
      var removeIcons = $("i#iconSettings.fas.fa-minus");
      for (var i = 0; i < removeIcons.length; i++) {
        removeIcons[i].onclick = function () {
          console.log(
            this.parentNode.parentNode.parentNode.querySelector("tr #tableName"),
          );
          var name = this.parentNode.parentNode.parentNode.querySelector("tr #tableName");
          localStorage.setItem("delete",name.innerText)
          var departmentValue = name.dataset.value;
          const location = localStorage.getItem("delete")

          $.ajax({
            type: "GET",
            url: "companydirectory/libs/php/countDepartment.php",
            dataType: "json",
            data: {
              departmentValue,
            },
            success: function (result) {
              var employees = result.data[0]['count(*)'];
  console.log(result.data[0]['count(*)']);

    if(employees == 0){
      $('#ModalConfirm').modal('toggle');
      $(document).on('click', '#deleteConfirm', function(e) {
        $.ajax({
          type: "POST",
          url: "companydirectory/libs/php/deleteDepartment.php",
          dataType: "json",
          data: {
            staff: location,
          },
          success: function (result) {
            $('#ModalConfirm').modal('toggle');
            reset();
          },
        });
      })

    } else {
      $('#ModalCancel').modal('toggle');
      var cancelMessage = $("#cancelMessage")
      cancelMessage.html(`You cannot delete this department, there are ${employees} employees assigned to it`)

    }
            },
          });

      
         /* var validate = confirm("Are you sure you want to remove this user?");
          if (validate == true) {
            $.ajax({
              type: "POST",
              url: "companydirectory/libs/php/deleteDepartment.php",
              dataType: "json",
              data: {
                staff: location,
              },
              success: function (result) {
                //$('#deleteModal').modal('toggle');
                reset();
              },
            });
          } else {
            console.log("Cancel!");
          } */
      
        };
      }
    
    })



  $(document).on('click', '#editUser', function(e) {
    const clickedElement = this.parentNode.parentNode.querySelector("tr #tableName").innerText;
    const location = this.parentNode.parentNode.querySelector("tr #tableLocation");
     localStorage.clear();
     localStorage.setItem("name",clickedElement)
     console.log(clickedElement);
    
    $("#changeInput4").val(clickedElement);
    $("#SelectInput3").val(location.dataset.value);
    $(document).on('click', '#buttonUpdate', function(e) {
      $('#updateModal').modal('toggle');
                  reset();
      $.ajax({
          type: 'POST',
          url: 'companydirectory/libs/php/updateDepartment.php',
          dataType: 'json',
          data: {
              departmentName: $('#changeInput4').val(),
              locationName: $('#SelectInput3').val(),
              previous: localStorage.getItem("name")
          },
          success: function (result) {
              console.log("Staff updated!");
              $('#updateModal').modal('toggle');
          }
      })
    })
  });

  
  $("#searchBar").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("tbody tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });



})
