$(function () {
    $('#datetimepicker1').datetimepicker();
    $('#datetimepicker2').datetimepicker();

    $('#submitBtn').on('click', function() {
        console.log($('#task-name').val());
        console.log($('#task-start-time').val());
        console.log($('#task-end-time').val());
        console.log($('input[name=task-status]:checked').val());
    });
});