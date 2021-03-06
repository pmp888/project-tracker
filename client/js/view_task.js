const dateFormat = 'DD-MM-YYYY HH:mm';

const table_body = document.querySelector('#table-body');
const task_name = document.querySelector('#task-name');
const task_start_time = document.querySelector('#task-start-time');
const task_end_time = document.querySelector('#task-end-time');
const task_status = document.querySelector('input[name="task-status"]');

const task_start_time_btn = document.querySelector('#task-start-time-btn');
const task_end_time_btn = document.querySelector('#task-end-time-btn');
const status = document.querySelector('#status');


const axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
    }
}

let tasks = [];
let selectedTask = '';
let sortOrder = false;

const getTask = () => {
    return axios.get('/task', axiosConfig).then(response => response.data);
}

const getTaskById = (id) => {
    return axios.get(`/task/${id}`, axiosConfig).then(response => response.data);
}

const updateTaskById = (id, data) => {
    return axios.patch(`/task/${id}`, data, axiosConfig).then(response => response.data);
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

const render_page = (allTasks) => {
    table_body.innerHTML = '';

    allTasks.forEach((task) => {
        const tr = createRowElement(task);
        table_body.appendChild(tr);
    });
}

const isError = (name, start_time, end_time) => {
    if(!name) {
        status.innerHTML = 'Error - Task Name is required!';
        return true;
    }

   if(!start_time && end_time) {
        status.innerHTML = 'Error - Task Start Time is required if you entered Task End Time!';
       return true;
   }

   return false;
}

document.addEventListener('click', function(e) {
    if(e.target.matches('.btn-edit')) {
        console.log(e.target.id);
        selectedTask = e.target.id;

        getTaskById(e.target.id).then((task) => {
            task_name.value = task.task_name;

            if(task.time_start)
                task_start_time.value = moment(task.time_start).format(dateFormat);
            else
                task_start_time.value = '';
            
            if(task.time_end)
                task_end_time.value = moment(task.time_end).format(dateFormat);
            else
                task_end_time.value = '';

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

    if(e.target.matches('#task-end-time-btn')) {
        task_end_time.value = formatTime();
    }

    if(e.target.matches('.btn-save')) {

        let time_start = '';
        let time_end = '';

        if (task_start_time.value) {
            time_start = moment(task_start_time.value, dateFormat).format('MM/DD/YYYY HH:mm');
        }

        if (task_end_time.value) {
            time_end = moment(task_end_time.value, dateFormat).format('MM/DD/YYYY HH:mm');
        }
  
        if(isError(task_name.value, task_start_time.value, task_end_time.value)) {
            return false;
        }

        const data = {
            task_name: task_name.value,
            time_start,
            time_end,
            task_status:  document.querySelector('input[name="task-status"]:checked').value
        };

        updateTaskById(selectedTask, data).then((data) => {
            alert('Task is saved');
            $('#exampleModal').modal('hide');
            document.location.reload(true);
        });
    }

    if(e.target.matches('a.table-header')) {
        sortOrder = !sortOrder;

        console.log('id', e.target.id);
        console.log('tasks', tasks);

        let new_tasks = tasks.sort(function(a, b) {
            let element1 = a[e.target.id];
            let element2 = b[e.target.id];
            console.log(element1, ':', element2);
            if(sortOrder) {
                if(e.target.id == 'time_start' || e.target.id == 'time_end') {
                    let date1 = new Date(element1);
                    let date2 = new Date(element2);
                    return date1 - date2;
                } else {
                    if(element1 > element2)
                        return 1;
                    else
                        return -1;
                }
            } else {
                if(e.target.id == 'time_start' || e.target.id == 'time_end') {
                    let date1 = new Date(element1);
                    let date2 = new Date(element2);
                    return date2 - date1;
                } else {
                    if(element1 > element2)
                        return -1;
                    else
                        return 1;
                }
            }
        });

        tasks = new_tasks;

        console.log('sorted tasks', new_tasks);
        render_page(new_tasks);
    }

});

getTask().then((tasks_returned) => {

    if(tasks.length == 0)
        tasks = tasks_returned;

    render_page(tasks);
});

$('#datetimepicker1').datetimepicker({
    format: dateFormat
});
$('#datetimepicker2').datetimepicker({
    format: dateFormat
});

