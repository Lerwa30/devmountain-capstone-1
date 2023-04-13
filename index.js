const eventSection = document.querySelector('#event-container');

function popUp() {
   let userImg = prompt("Paste img URL here.")
   console.log(userImg)
   document.getElementById("placeholder-img").src= userImg;
}


const printEventList = () => {
    axios.get('http://localhost:5050/api/events').then((res) => {
        console.log(res.data);
        showList(res.data);
        //loop through array of objects, then create html to display the data for each object in that array and append html to dom
    });
}

const deleteEvent = (id) => {
    axios.delete(`http://localhost:5050/api/events/${id}`).then((res) => {
        console.log(res.data)
        showList(res.data);
    })
}

const createListItem = (event) => {
        const eventItem = document.createElement('div');
        eventItem.classList.add('list-item');
        console.log(event.id)
        eventItem.innerHTML = `<p>${event.date} - </p>
        <p>${event.event} - </p>
        <p>${event.description} - </p>
        <p>${event.time} - <button onclick=(deleteEvent(${event.id}))>Delete</button></p>`
        
        eventSection.appendChild(eventItem);
    
}

const showList = (event) => {
    eventSection.innerHTML= ''
    for (let i = 0; i < event.length; i++) {
        createListItem(event[i])
}
}

printEventList();



