//companydirectory/libs/php/getDepartmentByID.php


    $.ajax({
        type: 'GET',
        url: 'companydirectory/libs/php/getDepartmentByID.php',
        success: function(data){
         console.log('success',data);
        }
    });
