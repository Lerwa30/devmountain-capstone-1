const eventSection = document.querySelector('#event-container');

function popUp() {
    let userImg = prompt("Paste img URL here.")
   console.log(userImg)
   document.getElementById("placeholder-img").src= userImg;
}


const printEventList = () => {
    axios.get('http://localhost:5050/api/events').then((res) => {
        console.log(res.data);
        //loop through array of objects, then create html to display the data for each object in that array and append html to dom
        for (let i = 0; i < res.data.length; i++) {
            const eventItem = document.createElement('div');
            eventItem.classList.add('list-item');
            console.log(res.data[i])
            eventItem.innerHTML = `<p>${res.data[i].date} - </p>
            <p>${res.data[i].event} - </p>
            <p>${res.data[i].description} - </p>
            <p>${res.data[i].time}</p>`
            
            eventSection.appendChild(eventItem);
        }
    });
}
printEventList();