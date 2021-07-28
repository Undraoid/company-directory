//companydirectory/libs/php/getDepartmentByID.php

$(document).ready(function () {
    $.ajax({
        type: 'GET',
        url: 'companydirectory/libs/php/getAllDepartments.php',
        dataType: 'json',
        success: function (result){
          for(i=0;i< result.data.length; i++){ 
                    console.log(result.data[i].id);
               var departments = `
<option value=${result.data[i].id}>${result.data[i].name}</option>
`
               $("#departmentSelect").append(departments);
          }
        }
    })
  
  $.ajax({
        type: 'GET',
        url: 'companydirectory/libs/php/getAllDepartments.php',
        dataType: 'json',
        success: function (result){
          for(i=0;i< result.data.length; i++){ 
                    console.log(result.data[i].id);
               var departments = `
<option value=${result.data[i].id}>${result.data[i].name}</option>
`
               $("#InputSelect").append(departments);
          }
        }
    })
  
     $(".loader").hide();

    $('#departmentSelect').change(function () {
        $.ajax({
            type: 'GET',
            url: 'companydirectory/libs/php/filterLocationId.php',
            dataType: 'json',
            data: {
                departmentId: $('#departmentSelect').val()
            },
            success: function (result) {
                var table = $("tbody");
                table.empty();

                for (var i = 0; i < result.data.length; i += 5) {
                    console.log(result.data[i]);


                    var row = `
    <tr>
      <th scope="row" id="tableFirstName">${result.data[i].firstName}</th>
      <td id="tableLastName">${result.data[i].lastName}</td>
      <td id="tableJobTitle">${result.data[i].jobTitle}</td>
      <td id="tableEmail">${result.data[i].email}</td>
      <td id="tableDepartment">${result.data[i].name}<a href="#" id="removeUser" onclick="resetVal()"><i class="fas fa-minus" style="float:right; margin-left:50px; color:red;" id="iconSettings"></i></a><a href="#" id="editUser" onclick="valReset()" data-toggle="modal" data-target="#updateModal"><i class="fas fa-pencil-alt" style="float:right;" id="iconSettings"></i></a></td>
    </tr>`

                    table.append(row);

                }
            }
        });

    })
  

    $('#InputSelect3').change(function () {
        $.ajax({
            type: 'GET',
            url: 'companydirectory/libs/php/filterLocationId.php',
            dataType: 'json',
            data: {
                departmentId: $('#InputSelect3').val()
            },
            success: function (result) {
                var closeButton = $("#InputSelect2");
                closeButton.empty();

                for (var i = 0; i < result.data.length; i += 5) {

                    var select = `
                    <option>${result.data[i].firstName + " " + result.data[i].lastName}</option>
                    `

                    closeButton.append(select);


                }
            }
        })
    })


    $('#InputSelect5').change(function () {
        $.ajax({
            type: 'GET',
            url: 'companydirectory/libs/php/filterLocationId.php',
            dataType: 'json',
            data: {
                departmentId: $('#InputSelect5').val()
            },
            success: function (result) {
                console.log(result.data[i]);
                var closeButton = $("#InputSelect4");
                closeButton.empty();

                for (var i = 0; i < result.data.length; i += 5) {

                    var select = `
                    <option>${result.data[i].firstName + " " + result.data[i].lastName}</option>
                    `

                    closeButton.append(select);

                }
            }
        })
    })


   
    $(document).on('click', '#buttonAdd', function(e) {
        $.ajax({
            type: 'POST',
            url: 'companydirectory/libs/php/addStaff.php',
            data: {
                name: $("#fn").val(),
                surname: $("#ln").val(),
                email: $("#email").val(),
                departmentId: $("#InputSelect").val()
            },
            success: function (result) {
                console.log("New Staff Added!" + result.data);
               $('#myModal').modal('toggle');
              var value = $("#departmentSelect").val()
        function valChange() {
  setTimeout(function(){ $("#departmentSelect").val(value).change(); }, 500);
}
          
          valChange();
            }
        })
        $(this).unbind('submit').submit()
    })
  

    $(document).on('click', '#removeUser', function(e) {
    
        var removeIcons = $("i#iconSettings.fas.fa-minus");
        for (var i = 0; i < removeIcons.length; i++) {
          removeIcons[i].onclick = function () {
            console.log(
              this.parentNode.parentNode.parentNode.querySelector("tr #tableFirstName")
            );
            var name =
              this.parentNode.parentNode.parentNode.querySelector("tr #tableFirstName");
        
            const staff = name.innerText;
        
            var validate = confirm("Are you sure you want to remove this user?");
            if (validate == true) {
              $.ajax({
                type: "POST",
                url: "companydirectory/libs/php/deleteStaff.php",
                dataType: "json",
                data: {
                  staff: staff,
                },
                success: function (result) {
                  //$('#deleteModal').modal('toggle');
                },
              });
            } else {
              console.log("Cancel!");
            }
        
          };
        }
      
      })
   $(document).on('click', '#editUser', function(e) {
    const clickedElement = this.parentNode.parentNode.querySelector("tr #tableFirstName").innerText;
     localStorage.clear();
     localStorage.setItem("name",clickedElement)
     console.log(clickedElement);
    
    $(document).on('click', '#buttonUpdate', function(e) {
      $('#updateModal').modal('toggle');
      var value = $("#departmentSelect").val()
        function valChange() {
  setTimeout(function(){ $("#departmentSelect").val(value).change(); }, 500);
}
          
          valChange();
      $.ajax({
          type: 'POST',
          url: 'companydirectory/libs/php/updateStaff.php',
          dataType: 'json',
          data: {
              info: $('#InputInfo4').val(),
              staff: $('#changeInput4').val(),
              previous: localStorage.getItem("name")
          },
          success: function (result) {
              console.log("Staff updated!");
              $('#updateModal').modal('toggle');
            var value = $("#departmentSelect").val()
        function valChange() {
  setTimeout(function(){ $("#departmentSelect").val(value).change(); }, 500);
}
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
