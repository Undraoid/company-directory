//companydirectory/libs/php/getDepartmentByID.php

$(document).ready(function () {
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
      <td id="tableDepartment">${result.data[i].name}<a href="#" id="removeUser" onclick="resetVal()"><i class="fas fa-user-alt-slash" style="float:right; margin-left:50px; color:red;" id="iconSettings"></i></a><a href="#" id="editUser" onclick="valReset()" data-toggle="modal" data-target="#updateModal"><i class="fas fa-user-edit" style="float:right;" id="iconSettings"></i></a></td>
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
                console.log(result.data[i]);
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
            }
        })
        $(this).unbind('submit').submit()
    })

    $(document).on('click', '#removeUser', function(e) {
      
        var validate = confirm("Are you sure you want to remove this user?");
        var removeIcons = $("i#iconSettings.fas.fa-user-alt-slash");

if(validate == true){
for(var i=0;i<removeIcons.length;i++){
  removeIcons[i].onclick = function(){
    console.log(this.parentNode.parentNode.parentNode.querySelector("tr #tableLastName"));
    var firstName = this.parentNode.parentNode.parentNode.querySelector("tr #tableFirstName");
    var lastName = this.parentNode.parentNode.parentNode.querySelector("tr #tableEmail");
    var email = this.parentNode.parentNode.parentNode.querySelector("tr #tableJobTitle");
    var department = this.parentNode.parentNode.parentNode.querySelector("tr #tableDepartment");
    
const staff = firstName.innerText;

    $.ajax({
        type: 'POST',
        url: 'companydirectory/libs/php/deleteStaff.php',
        dataType: 'json',
        data: {
          staff,
        },
        success: function (result) {
         //$('#deleteModal').modal('toggle');
        var value = $("#departmentSelect").val()
        function valChange() {
  setTimeout(function(){ $("#departmentSelect").val(value).change(); }, 500);
}
          
          valChange();
        
        }
        })
  }
}
} else {
  console.log("Cancel!");
}


});

   $(document).on('click', '#editUser', function(e) {
    const clickedElement = this.parentNode.parentNode.parentNode.querySelector("tr #tableFirstName");
     console.log(clickedElement.innerText.toString());
    
    $(document).on('click', '#buttonUpdate', function(e) {
      $('#updateModal').modal('toggle');

      $.ajax({
          type: 'POST',
          url: 'companydirectory/libs/php/updateStaff.php',
          dataType: 'json',
          data: {
              info: $('#InputInfo4').val(),
              staff: $('#changeInput4').val(),
              previous: clickedElement.innerText.toString()
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
})
