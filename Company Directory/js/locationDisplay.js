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
<td id="tableLocation">${result.data[i].name}<a href="#" id="removeUser" onclick="resetVal()"><i class="fas fa-user-alt-slash" style="float:right; margin-left:50px; color:red;" id="iconSettings"></i></a><a href="#" id="editUser" onclick="valReset()" data-toggle="modal" data-target="#updateModal"><i class="fas fa-user-edit" style="float:right;" id="iconSettings"></i></a></td>
</tr>`

              table.append(row);

          }
      }
  });

  function reset(){
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
    <td id="tableLocation">${result.data[i].name}<a href="#" id="removeUser" onclick="resetVal()"><i class="fas fa-user-alt-slash" style="float:right; margin-left:50px; color:red;" id="iconSettings"></i></a><a href="#" id="editUser" onclick="valReset()" data-toggle="modal" data-target="#updateModal"><i class="fas fa-user-edit" style="float:right;" id="iconSettings"></i></a></td>
  </tr>`
  
                  table.append(row);
  
              }
          }
      });
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
    
      var validate = confirm("Are you sure you want to remove this user?");
      var removeIcons = $("i#iconSettings.fas.fa-user-alt-slash");

if(validate == true){
for(var i=0;i<removeIcons.length;i++){
removeIcons[i].onclick = function(){
   console.log(this.parentNode.parentNode.parentNode.querySelector("tr #tableLocation"));;
  var name = this.parentNode.parentNode.parentNode.querySelector("tr #tableLocation");
  
const location = name.innerText;
reset();
  $.ajax({
      type: 'POST',
      url: 'companydirectory/libs/php/deleteLocation.php',
      dataType: 'json',
      data: {
        staff: location,
      },
      success: function (result) {
       //$('#deleteModal').modal('toggle');

      }
      })
}
}
} else {
console.log("Cancel!");
}

})


 $(document).on('click', '#editUser', function(e) {
  const clickedElement = this.parentNode.parentNode.querySelector("tr #tableLocation").innerText;
   localStorage.clear();
   localStorage.setItem("name",clickedElement)
   console.log(clickedElement);
  
  $(document).on('click', '#buttonUpdate', function(e) {
    $('#updateModal').modal('toggle');
                reset();
    $.ajax({
        type: 'POST',
        url: 'companydirectory/libs/php/updateLocation.php',
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
