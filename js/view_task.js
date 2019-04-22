const url = 'http://localhost:3000';
const dateFormat = 'DD-MM-YYYY HH:mm';

const table_body = document.querySelector('#table-body');

const axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
    }
}

const getTask = () => {
    return axios.get(`${url}/task`, axiosConfig).then(response => response.data);
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

    return tr;
}

getTask().then((tasks) => {

    tasks.forEach((task) => {
        const tr = createRowElement(task);
        table_body.appendChild(tr);
    });

});