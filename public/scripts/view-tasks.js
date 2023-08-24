let eventSource = new EventSource("/refresh-tasks")

eventSource.onmessage = (event) => {
    const {ticker} = JSON.parse(event.data)
    let html = ''

    Array.from(document.querySelector('.empStatus').children).forEach(elem => elem.remove())
    html = `
        <span class="${ticker.status=='active' ? 'green' : 'red'}">&#9673; &nbsp;</span>
        <span>Current Status: ${ticker.status}
            ${(ticker.status=='inactive' || ticker.status=='suspended') ? `<br><span class='empWork'>Worked ${ticker.attendanceInfo} today</span>` : ``}
        </span>
    `
    document.querySelector('.empStatus').insertAdjacentHTML('beforeend',html)

    document.querySelector('.completedTasks').querySelector('span').innerHTML = `Tasks Completed: ${ticker.tasks.filter(task => task.status=='complete').length}`

    Array.from(document.querySelector('tbody').children).forEach(elem => elem.remove())
    html = ''
    ticker.tasks.forEach((task,index)=> { 
        let timeHTML = task.time=='-' ? '<td>-</td>' : 
        `<td><a class="btn-sm btn-block ${Number(task.time)>(task.desc=='To assemble' ? 15 : 10) ? 'bg-red' : 'bg-green'}" disabled>${task.time} min</a></td>`

        html += `
        <tr>
            <th scope="row">${index+1}</th>
            <td>${task.status}</td>
            <td>${task.desc}</td>
            <td>${task.assigned_at}</td>
            ${timeHTML}
            <td>${task.order.orderNo}</td>
            <td>${task.order.status}</td>
            <td>${task.customerLicenseID}</td>
            <td><span class="color" style='background:${task.customerVehicleColor}'>&nbsp;</span></td>
            <td><a class="btn-sm btn-block btn-info" href="/task/${task._id}/order-details" role="button">Link</a></td>
        </tr>
        `
    })
    document.querySelector('tbody').insertAdjacentHTML('beforeend',html)
}

document.querySelectorAll('.color').forEach((elem)=>{
    elem.style.background = elem.getAttribute('colorAttr')
})