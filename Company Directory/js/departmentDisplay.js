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
          <th scope="row" id="tableName">${result.data[i].name}</th>
          <td id="tableLocation">${locationResult.data[i].name}<a href="#" id="removeUser" onclick="resetVal()"><i class="fas fa-user-alt-slash" style="float:right; margin-left:50px; color:red;" id="iconSettings"></i></a><a href="#" id="editUser" onclick="valReset()" data-toggle="modal" data-target="#updateModal"><i class="fas fa-user-edit" style="float:right;" id="iconSettings"></i></a></td>
        </tr>`

        
                        table.append(row);
        
                    }
                }
            });


        }
    });


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



    function reset(){
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
              <th scope="row" id="tableName">${result.data[i].name}</th>
              <td id="tableLocation">${locationResult.data[i].name}<a href="#" id="removeUser" onclick="resetVal()"><i class="fas fa-user-alt-slash" style="float:right; margin-left:50px; color:red;" id="iconSettings"></i></a><a href="#" id="editUser" onclick="valReset()" data-toggle="modal" data-target="#updateModal"><i class="fas fa-user-edit" style="float:right;" id="iconSettings"></i></a></td>
            </tr>`
            
                            table.append(row);
            
                        }
                    }
                });
    
    
            }
        });
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
    
        var removeIcons = $("i#iconSettings.fas.fa-user-alt-slash");
        for (var i = 0; i < removeIcons.length; i++) {
          removeIcons[i].onclick = function () {
            console.log(
              this.parentNode.parentNode.parentNode.querySelector("tr #tableName")
            );
            var name =
              this.parentNode.parentNode.parentNode.querySelector("tr #tableName");
        
            const location = name.innerText;
        
            var validate = confirm("Are you sure you want to remove this user?");
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
            }
        
          };
        }
      
      })


  $(document).on('click', '#editUser', function(e) {
    const clickedElement = this.parentNode.parentNode.querySelector("tr #tableName").innerText;
     localStorage.clear();
     localStorage.setItem("name",clickedElement)
     console.log(clickedElement);
    
    $(document).on('click', '#buttonUpdate', function(e) {
      $('#updateModal').modal('toggle');
                  reset();
      $.ajax({
          type: 'POST',
          url: 'companydirectory/libs/php/updateDepartment.php',
          dataType: 'json',
          data: {
              info: $('#InputInfo4').val(),
              staff: $('#changeInput4').val(),
              previous: localStorage.getItem("name")
          },
          success: function (result) {
              console.log("Staff updated!");
              $('#updateModal').modal('toggle');
          }
      })
    })
  });




})
