//companydirectory/libs/php/getDepartmentByID.php

$(document).ready(function() {
    $('#searchButton').click(function(){
        $.ajax({
            type: 'GET',
            url: 'companydirectory/libs/php/filterLocationId.php',
            dataType: 'json',
            data: {
                departmentId: $('#locationSelect').val(),
                locationId: $('#departmentSelect').val()
            },
            success: function(result){
             console.log('success',result);
            }
        });
    
    })
})
