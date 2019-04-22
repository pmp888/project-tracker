const url = 'http://localhost:3000';
const dateFormat = 'DD-MM-YYYY HH:mm';

const task_name = document.querySelector('#task-name');
const task_start_time = document.querySelector('#task-start-time');
const task_end_time = document.querySelector('#task-end-time');
const submitBtn = document.querySelector('#submitBtn');
const task_status = document.querySelector('input[name="task-status"]');
const task_start_time_btn = document.querySelector('#task-start-time-btn');
const task_end_time_btn = document.querySelector('#task-end-time-btn');
const status = document.querySelector('#status');

const table_feedback = document.querySelector('#table-feedback');
const table_task_name = document.querySelector('#table-task-name');
const table_task_start_time = document.querySelector('#table-task-start-time');
const table_task_end_time = document.querySelector('#table-task-end-time');
const table_task_status = document.querySelector('#table-task-status');

const axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
    }
}

const postTask = (data) => {
    return axios.post(`${url}/task`, data, axiosConfig).then(response => response.data);
}

const formatTime = (date) => {
    return moment(date).format(dateFormat);
}

const clearAll = () => {
    task_name.value = '';
    task_start_time.value = '';
    task_end_time.value = '';
    task_status.value = 0;
}

task_start_time_btn.onclick = function(e) {
    task_start_time.value = formatTime();
}

task_end_time_btn.onclick = function(e) {
    task_end_time.value = formatTime();
}

submitBtn.onclick = function(e) {
    console.log('task_name', task_name.value);
    console.log('task_start_time', task_start_time.value);
    console.log('task_end_time', task_end_time.value);
    console.log('task_status', document.querySelector('input[name="task-status"]:checked').value);

    let time_start = moment(task_start_time.value, dateFormat).format('MM/DD/YYYY HH:mm');
    .catch console.log ("Pedro")
    let time_end = moment(task_end_time.value, dateFormat).format('MM/DD/YYYY HH:mm');
    .catch console.log ("Pedro")
    console.log('time_start', time_start);
    console.log('time_end', time_end);

    const data = {
        task_name: task_name.value,
        time_start,
        time_end,
        task_status:  document.querySelector('input[name="task-status"]:checked').value
    };

    postTask(data).then((response) => {
        console.log(response);
        status.innerHTML = 'Task created!';
        table_task_name.innerHTML = response.task_name;
        table_task_start_time.innerHTML = response.time_start ? formatTime(response.time_start) : 'Not Available';
        table_task_end_time.innerHTML = response.time_end ? formatTime(response.time_end) : 'Not Available';
        table_task_status.innerHTML = response.task_status == 0 ? 'Not Done' : 'Done';
        table_feedback.classList.remove('hidden');
        clearAll();
    })
}

$('#datetimepicker1').datetimepicker({
    format: dateFormat
});
$('#datetimepicker2').datetimepicker({
    format: dateFormat
});
