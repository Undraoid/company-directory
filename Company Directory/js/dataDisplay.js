//companydirectory/libs/php/getDepartmentByID.php

$(document).ready(function () {
    $('#searchButton').click(function () {
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

    $(document).on('click', '#buttonRemove', function(e) {
        const fullName = $("#InputSelect2").val().split(' ');
        const staff = fullName.length > 0 ? fullName[0] : '';
        $.ajax({
            type: 'POST',
            url: 'companydirectory/libs/php/deleteStaff.php',
            dataType: 'json',
            data: {
                staff,
            },
            success: function (result) {
                console.log("Staff Removed!");
               $('#deleteModal').modal('toggle');
            }
        })
    });

    $(document).on('click', '#buttonUpdate', function(e) {
        const fullName = $("#InputSelect4").val().split(' ');
        const staff = fullName.length > 0 ? fullName[0] : '';
        const info = $('#InputInfo4').val();
        const value = $('#changeInput4').val();
        $.ajax({
            type: 'POST',
            url: 'companydirectory/libs/php/updateStaff.php',
            dataType: 'json',
            data: {
                staff,
                info,
                value,
            },
            success: function (result) {
                console.log("Staff updated!");
                $('#updateModal').modal('toggle');
            }
        })
    });
})
