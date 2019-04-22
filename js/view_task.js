const url = 'http://localhost:3000';
const dateFormat = 'DD-MM-YYYY HH:mm';

const table_body = document.querySelector('#table-body');
const task_name = document.querySelector('#task-name');
const task_start_time = document.querySelector('#task-start-time');
const task_end_time = document.querySelector('#task-end-time');
const task_status = document.querySelector('input[name="task-status"]');

const task_start_time_btn = document.querySelector('#task-start-time-btn');
const task_end_time_btn = document.querySelector('#task-end-time-btn');

const axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
    }
}

const getTask = () => {
    return axios.get(`${url}/task`, axiosConfig).then(response => response.data);
}

const getTaskById = (id) => {
    return axios.get(`${url}/task/${id}`, axiosConfig).then(response => response.data);
}

const updateTaskById = (id, data) => {
    return axios.post(`${url}/task/${id}`, data, axiosConfig).then(response => response.data);
}

const formatTime = (date) => {
    return moment(date).format(dateFormat);
}

const createRowElement = (task) => {
    const tr = document.createElement('tr');
    tr.id = task._id;

    let time_start = 'Not Available';
    let time_end = 'Not Available';
    let duration = 'Not Available';
    let task_status;
    
    if(task.time_start)
        time_start = moment(task.time_start).format(dateFormat);
    
    if(task.time_end)
        time_end = moment(task.time_end).format(dateFormat);
    
    if(task.time_start && task.time_end) {
        duration = moment(task.time_end).diff(moment(task.time_start));
        
        let miliSeconds = parseInt(duration, 10);
        let seconds = miliSeconds / 1000;
        let days = Math.floor(seconds / (3600*24));
        seconds  -= days*3600*24;
        let hrs   = Math.floor(seconds / 3600);
        seconds  -= hrs*3600;
        let mnts = Math.floor(seconds / 60);
        seconds  -= mnts*60;

        duration = days+" days, "+hrs+" hours, "+mnts+" minutes";
    }

    if(task.task_status)
        task_status = 'Done';
    else
        task_status = 'Not Done';

    let td = document.createElement('td');
    let text = document.createTextNode(task.task_name);
    td.appendChild(text);
    tr.appendChild(td);

    td = document.createElement('td');
    text = document.createTextNode(time_start);
    td.appendChild(text);
    tr.appendChild(td);

    td = document.createElement('td');
    text = document.createTextNode(time_end);
    td.appendChild(text);
    tr.appendChild(td);

    td = document.createElement('td');
    text = document.createTextNode(duration);
    td.appendChild(text);
    tr.appendChild(td);

    td = document.createElement('td');
    text = document.createTextNode(task_status);
    td.appendChild(text);
    tr.appendChild(td);

    td = document.createElement('td');
    let button = document.createElement('button');
    text = document.createTextNode('Edit');
    button.id = task._id;
    button.classList.add('btn-edit');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#myModal');
    button.appendChild(text);
    td.appendChild(button);
    tr.appendChild(td);

    return tr;
}

document.addEventListener('click', function(e) {
    if(e.target.matches('.btn-edit')) {
        console.log(e.target.id);
        
        getTaskById(e.target.id).then((task) => {
            task_name.value = task.task_name;
            if(task.time_start)
                task_start_time.value = moment(task.time_start).format(dateFormat);
            else
                task_start_time.value = 'Not Available';
            
            if(task.time_end)
                task_end_time.value = moment(task.time_end).format(dateFormat);
            else
                task_end_time.value = 'Not Available';

            if(task.task_status) {
                document.querySelector('#task-status-done').checked = true;
                document.querySelector('#task-status-not-done').checked = false;
            } else {
                document.querySelector('#task-status-done').checked = false;
                document.querySelector('#task-status-not-done').checked = true;
            }

            $('#exampleModal').modal();
        });
    }

    if(e.target.matches('#task-start-time-btn')) {
        task_start_time.value = formatTime();
    }

    if(e.target.matches('#task_end_time_btn')) {
        task_end_time.value = formatTime();
    }

});

getTask().then((tasks) => {

    tasks.forEach((task) => {
        const tr = createRowElement(task);
        table_body.appendChild(tr);
    });

});

$('#datetimepicker1').datetimepicker({
    format: dateFormat
});
$('#datetimepicker2').datetimepicker({
    format: dateFormat
});

