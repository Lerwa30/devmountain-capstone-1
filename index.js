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
        for (let i = 0; i < res.length; i++) {

        }
      
    });
}
printEventList();