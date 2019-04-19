const url = 'http://localhost:3000';

$(function () {
    $('#datetimepicker1').datetimepicker();
    $('#datetimepicker2').datetimepicker();

    $('#submitBtn').on('click', function() {
        console.log($('#task-name').val());
        console.log($('#task-start-time').val());
        console.log($('#task-end-time').val());
        console.log($('input[name=task-status]:checked').val());

        $.ajax({
            url: url + '/task',
            method: 'POST',
            data: JSON.stringify({
                task_name: $('#task-name').val(),
                task_status: $('#task_status').val()
            }),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
          }).done(function(data) {
              console.log('data', data);
            $('#status').html('Task saved!');
          });
    });
});