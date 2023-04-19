const eventSection = document.querySelector('#event-container');
const form = document.querySelector('form');
let itemList;

function popUp() {
   let userImg = prompt("Paste img URL here.")
   console.log(userImg)
   document.getElementById("placeholder-img").src= userImg;
}

function editName() {
    let newName = prompt("Type name here:")
    if(newName === '') {
        return alert('Please enter a name.')
    } else{
    document.getElementById("placeholder-name").textContent = newName;
    }
}

function editAge() {
    let newAge = prompt("Type age here:")
    if(newAge === '') {
        return alert('Please enter the age.')
    } else{
    document.getElementById("placeholder-age").textContent = newAge;
}
};

function search() {
    // console.log(itemList)
    let searchQuery = document.getElementById("searchbox").value;
    for(let i = 0; i < itemList.length; i++) {
        console.log(itemList[i].textContent)
        if(itemList[i].textContent.toLowerCase().includes(searchQuery.toLowerCase())){
            itemList[i].classList.remove("is-hidden");
        } else {
            itemList[i].classList.add("is-hidden");
        }
    }
}

let typingTimer;               
let typeInterval = 500;  
let searchInput = document.getElementById('searchbox');

searchInput.addEventListener('keyup', () => {
    console.log(itemList)
    clearTimeout(typingTimer);
    typingTimer = setTimeout(search, typeInterval);
});

const printEventList = () => {
    axios.get('http://localhost:5050/api/events').then((res) => {
        console.log(res.data);
        createListItem(res.data);
        //loop through array of objects, then create html to display the data for each object in that array and append html to dom
    });
}

const deleteEvent = (id) => {
    axios.delete(`http://localhost:5050/api/events/${id}`).then((res) => {
        console.log(res.data)
        createListItem(res.data);
    })
}

const addEvent = (body) => {
    axios.post('http://localhost:5050/api/events', body).then((res) => {
        createListItem(res.data);
    })
}

const createListItem = (item) => {
        eventSection.innerHTML= ''
        for (let i = 0; i < item.length; i++) {
        const eventItem = document.createElement('div');
        eventItem.classList.add('list-item');
        item[i].time = item[i].time.slice(0, 5);
        eventItem.innerHTML = `<p>${item[i].date} - </p>
        <p>${item[i].event} - </p>
        <p>${item[i].description} - </p>
        <p>${item[i].time} - <button onclick=(deleteEvent(${item[i].id}))>Delete</button></p>`
        
        eventSection.appendChild(eventItem);
        }
        itemList = document.querySelectorAll('.list-item');
    console.log(item)
}

const submitForm = (e) => {
    e.preventDefault();
    let date = document.querySelector('#date');
    let events = document.querySelector('#events');
    let description = document.querySelector('#description');
    let time = document.querySelector('#time');

    let newEvent = {
        date: date.value,
        event: events.value,
        description: description.value,
        time: time.value
    }
    addEvent(newEvent);
}
form.addEventListener('submit', submitForm)

printEventList();



