//companydirectory/libs/php/getDepartmentByID.php

$(document).ready(function () {
    $.ajax({
        type: 'GET',
        url: 'companydirectory/libs/php/getDepartmentAlphabetical.php',
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
        url: 'companydirectory/libs/php/getDepartmentAlphabetical.php',
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
  
  $.ajax({
        type: 'GET',
        url: 'companydirectory/libs/php/getDepartmentAlphabetical.php',
        dataType: 'json',
        success: function (result){
          for(i=0;i< result.data.length; i++){ 
                    console.log(result.data[i].id);
               var departments = `
<option value=${result.data[i].id}>${result.data[i].name}</option>
`
               $("#SelectInput3").append(departments);
          }
        }
    })
  
     $(".loader").hide();

     $('#departmentSelect').change(function () {
    if($('#departmentSelect').val() == "Staff"){
      $.ajax({
        type: 'GET',
        url: 'companydirectory/libs/php/getAllPersonnel.php',
        dataType: 'json',
        success: function (result) {
            var table = $("tbody");
            table.empty();

            for (var i = 0; i < result.data.length; i ++) {


                var row = `
<tr>
  <th scope="row" id="tableFirstName">${result.data[i].firstName}</th>
  <td id="tableLastName">${result.data[i].lastName}</td>
  <td id="tableJobTitle">${result.data[i].jobTitle}</td>
  <td id="tableEmail">${result.data[i].email}</td>
  <td id="tableDepartment">${result.data[i].name}</td>
<td><a href="#" id="removeUser" onclick="resetVal()"><i class="fas fa-minus" style="float:right; margin-left:50px; color:red;" id="iconSettings"></i></a><a href="#" id="editUser" onclick="valReset()" data-toggle="modal" data-target="#updateModal"><i class="fas fa-pencil-alt" style="float:right;" id="iconSettings"></i></a></td>
</tr>`

                table.append(row);

            }
        }
    });
    } else {
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
    <td id="tableDepartment">${result.data[i].name}</td>
<td><a href="#" id="removeUser" onclick="resetVal()"><i class="fas fa-minus" style="float:right; margin-left:50px; color:red;" id="iconSettings"></i></a><a href="#" id="editUser" onclick="valReset()" data-toggle="modal" data-target="#updateModal"><i class="fas fa-pencil-alt" style="float:right;" id="iconSettings"></i></a></td>
  </tr>`

                  table.append(row);

              }
          }
      });
    }
  })

  
    function reset(){
    $(".loader").show();
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
      <td id="tableDepartment">${result.data[i].name}</td>
<td><a href="#" id="removeUser" onclick="resetVal()"><i class="fas fa-minus" style="float:right; margin-left:50px; color:red;" id="iconSettings"></i></a><a href="#" id="editUser" onclick="valReset()" data-toggle="modal" data-target="#updateModal"><i class="fas fa-pencil-alt" style="float:right;" id="iconSettings"></i></a></td>
    </tr>`

                    table.append(row);

                }
            }
        });

$(".loader").hide();
  }
  

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
          console.log(this.closest("tr").querySelector("#tableFirstName"));
          var name = this.closest("tr").querySelector("#tableFirstName");
          localStorage.setItem("delete",name.innerText)
          var locationValue = name.dataset.value;
          console.log(locationValue);
          const location = localStorage.getItem("delete")
          $('#ModalConfirm').modal('toggle');
      $(document).on('click', '#deleteConfirm', function(e) {
        $.ajax({
          type: "POST",
          url: "companydirectory/libs/php/deleteStaff.php",
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
    const clickedElement = this.parentNode.parentNode.querySelector("tr #tableFirstName").innerText;
    const ln = this.parentNode.parentNode.querySelector("tr #tableLastName").innerText;
     const mail = this.parentNode.parentNode.querySelector("tr #tableEmail").innerText;
     const department = $("#departmentSelect").val();
     localStorage.clear();
     localStorage.setItem("name",clickedElement)
     console.log(clickedElement);
     
     $("#changeInput4").val(clickedElement);
     $("#changeInput5").val(ln);
     $("#changeInput6").val(mail);
     $("#SelectInput3").val(department);
    
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
              firstName: $('#changeInput4').val(),
              lastName: $('#changeInput5').val(),
              email: $('#changeInput6').val(),
              DepartmentNumber: $('#SelectInput3').val(),
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
