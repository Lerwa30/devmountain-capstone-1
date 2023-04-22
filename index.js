const eventSection = document.querySelector("#event-container");
const profileSection = document.querySelector("#profile");
const form = document.querySelector("form");
let itemList;

function search() {
  let searchQuery = document.getElementById("searchbox").value;
  for (let i = 0; i < itemList.length; i++) {
    console.log(itemList[i].textContent);
    if (
      itemList[i].textContent.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      itemList[i].classList.remove("hidden");
    } else {
      itemList[i].classList.add("hidden");
    }
  }
}

let typingTimer;
let searchInput = document.getElementById("searchbox");

searchInput.addEventListener("keyup", () => {
  console.log(itemList);
  clearTimeout(typingTimer);
  typingTimer = setTimeout(search, 500);
});

const printEventList = () => {
  axios.get("http://localhost:5050/api/events").then((res) => {
    createListItem(res.data);
  });
};

const deleteEvent = (id) => {
  axios.delete(`http://localhost:5050/api/events/${id}`).then((res) => {
    createListItem(res.data);
  });
};

const addEvent = (body) => {
  axios.post("http://localhost:5050/api/events", body).then((res) => {
    createListItem(res.data);
  });
};

async function getProfile() {
  let res = await axios.get("http://localhost:5050/api/profile");

  profileSection.innerHTML = `<img id="placeholder-img" src="${res.data.imgUrl}">
    <h4>Name: <p id="placeholder-name">${res.data.name}</p><button id="edit-name-btn"><i class="fa-solid fa-pencil"></i></button><br>
    Age: <p id="placeholder-age">${res.data.age}</p><button id="edit-age-btn"><i class="fa-solid fa-pencil"></i></button><br><br>
    <button id="photo-btn">Upload Photo</button>
</h4>`;

  const nameBtn = document.querySelector("#edit-name-btn");
  const ageBtn = document.querySelector("#edit-age-btn");
  const imgBtn = document.querySelector("#photo-btn");

  nameBtn.addEventListener("click", () => {
    let newName = prompt("Type name here:");
    console.log(newName);
    if (newName === "") {
      return alert("Please enter a name.");
    } else {
      axios
        .put(`http://localhost:5050/api/profile?newName=${newName}`)
        .then((res) => {
          document.querySelector("#placeholder-name").textContent =
            res.data.name;
        });
    }
  });

  ageBtn.addEventListener("click", () => {
    let newAge = prompt("Type age here:");
    if (newAge === "") {
      return alert("Please enter the age.");
    } else {
      axios
        .put(`http://localhost:5050/api/profile?newAge=${newAge}`)
        .then((res) => {
          document.querySelector("#placeholder-age").textContent = res.data.age;
        });
    }
  });

  imgBtn.addEventListener("click", () => {
    let userImg = prompt("Paste img URL here.");
    if (userImg === "") {
      return alert("Please enter a URL");
    } else {
      axios
        .put(`http://localhost:5050/api/profile?newImg=${userImg}`)
        .then((res) => {
          document.querySelector("#placeholder-img").src = res.data.imgUrl;
        });
    }
  });
}

getProfile();

const createListItem = (item) => {
  eventSection.innerHTML = "";
  for (let i = 0; i < item.length; i++) {
    const eventItem = document.createElement("div");
    eventItem.classList.add("list-item");
    item[i].time = item[i].time.slice(0, 5);
    eventItem.innerHTML = `<div id="event-group">
        <p>${item[i].date} - </p>
        <p>${item[i].event} - </p>
        <p>"${item[i].description}" - </p>
        <p>${item[i].time} - <button onclick=(deleteEvent(${item[i].id}))>Delete</button></p>
        </div>`;

    eventSection.appendChild(eventItem);
  }
  itemList = document.querySelectorAll(".list-item");
  console.log(item);
};

const submitForm = (e) => {
  e.preventDefault();
  let date = document.querySelector("#date");
  let events = document.querySelector("#events");
  let description = document.querySelector("#description");
  let time = document.querySelector("#time");

  let newEvent = {
    date: date.value,
    event: events.value,
    description: description.value,
    time: time.value,
  };

  addEvent(newEvent);
};

form.addEventListener("submit", submitForm);

printEventList();
