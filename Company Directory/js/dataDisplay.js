//companydirectory/libs/php/getDepartmentByID.php

$(document).ready(function() {
    $('#searchButton').click(function(){
        $.ajax({
            type: 'GET',
            url: 'companydirectory/libs/php/getDepartmentByID.php',
            dataType: 'json',
            data: {
                id: $('#departmentSelect').val(),
            },
            success: function(result){
             console.log('success',result);
            }
        });
    
    })
})
