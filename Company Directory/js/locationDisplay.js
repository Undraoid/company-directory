$(document).ready(function () {

    $.ajax({
        type: 'GET',
        url: 'companydirectory/libs/php/getLocation.php',
        dataType: 'json',
        success: function (result) {
            var table = $("tbody");
            table.empty();
  
            for (var i = 0; i < result.data.length; i ++) {
  
                var row = `
  <tr>
  <td id="tableLocation" data-value=${result.data[i].id}>${result.data[i].name}</td>
<td><a href="#" id="removeUser" onclick="resetVal()"><i class="fas fa-minus" style="float:right; margin-left:75px; color:red;" id="iconSettings"></i></a><a href="#" id="editUser" onclick="valReset()" data-toggle="modal" data-target="#updateModal"><i class="fas fa-pencil-alt" style="float:right;" id="iconSettings"></i></a></td>
  </tr>`
  
                table.append(row);
  
            }
        }
    });
  
  $(".loader").hide();
  
    function reset(){
      console.log("refreshing")
       $(".loader").show();
        $.ajax({
        type: 'GET',
        url: 'companydirectory/libs/php/getLocation.php',
        dataType: 'json',
        success: function (result) {
            var table = $("tbody");
            table.empty();
  
            for (var i = 0; i < result.data.length; i ++) {
  
                var row = `
  <tr>
  <td id="tableLocation" data-value=${result.data[i].id}>${result.data[i].name}</td>
<td><a href="#" id="removeUser" onclick="resetVal()" data-toggle="modal" data-target="#ModalConfirm"><i class="fas fa-minus" style="float:right; margin-left:75px; color:red;" id="iconSettings"></i></a><a href="#" id="editUser" onclick="valReset()" data-toggle="modal" data-target="#updateModal"><i class="fas fa-pencil-alt" style="float:right;" id="iconSettings"></i></a></td>
  </tr>`
  
                table.append(row);
  
            }
        }
    });
  
  $(".loader").hide();
    }
  
  
  
  $(document).on('click', '#buttonAdd', function(e) {
        $.ajax({
            type: 'POST',
            url: 'companydirectory/libs/php/addLocation.php',
            data: {
                name: $("#fn").val(),
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
          this.parentNode.parentNode.parentNode.querySelector("tr #tableLocation"),
        );
        var name = this.parentNode.parentNode.parentNode.querySelector("tr #tableLocation");
        localStorage.setItem("delete",name.innerText)
        var locationValue = name.dataset.value;
        console.log(locationValue);
        const location = localStorage.getItem("delete")

        $.ajax({
          type: "GET",
          url: "companydirectory/libs/php/countLocation.php",
          dataType: "json",
          data: {
            locationValue,
          },
          success: function (result) {
            var department = result.data[0]['count(*)'];
console.log(result.data[0]['count(*)']);

  if(department == 0){
    $('#ModalConfirm').modal('toggle');
    $(document).on('click', '#deleteConfirm', function(e) {
      $.ajax({
        type: "POST",
        url: "companydirectory/libs/php/deleteLocation.php",
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
    cancelMessage.html(`You cannot delete this location, there are ${department} departments assigned to it`)

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
  const clickedElement = this.parentNode.parentNode.querySelector("tr #tableLocation").innerText;
   localStorage.clear();
   localStorage.setItem("name",clickedElement)
   console.log(clickedElement);
  
   $("#changeInput4").val(clickedElement);
  $(document).on('click', '#buttonUpdate', function(e) {
    $('#updateModal').modal('toggle');
     setTimeout(function(){ reset(); }, 500);
    $.ajax({
        type: 'POST',
        url: 'companydirectory/libs/php/updateLocation.php',
        dataType: 'json',
        data: {
            locationName: $('#changeInput4').val(),
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
    $("* #tableLocation").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
  
  })
  
