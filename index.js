const eventSection = document.querySelector("#event-container");
const profileSection = document.querySelector("#profile");
const form = document.querySelector("form");
let itemList;

function search() {
  let searchQuery = document.getElementById("searchbox").value;
  for (let i = 0; i < itemList.length; i++) {
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
    <h4>Name: <p id="placeholder-name">${res.data.name}</p><button id="edit-name-btn"><i class="fa-solid fa-pencil"></i></button><br><br>
    Age: <p id="placeholder-age">${res.data.age}</p><button id="edit-age-btn"><i class="fa-solid fa-pencil"></i></button><br><br>
    <button id="photo-btn">Upload Photo</button>
</h4>`;

  const nameBtn = document.querySelector("#edit-name-btn");
  const ageBtn = document.querySelector("#edit-age-btn");
  const imgBtn = document.querySelector("#photo-btn");

  nameBtn.addEventListener("click", () => {
    let newName = prompt("Type name here:");
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
  let datesObject = {};
  item.forEach((e, i) => {
    if (!(e.date in datesObject)) {
      datesObject[e.date] = [];
    }
    datesObject[e.date].push(item[i]);
  });

  for (let key in datesObject) {
    const newDate = document.createElement("details");
    newDate.classList.add("list-item");
    const summary = document.createElement("summary");
    summary.textContent = key;
    newDate.appendChild(summary);

    for (let i = 0; i < datesObject[key].length; i++) {
      const eventDetails = datesObject[key][i];
      const eventItem = document.createElement("div");
      eventItem.classList.add("event-group");
      eventDetails.time = eventDetails.time.slice(0, 5);
      eventItem.innerHTML = `
        <p>${eventDetails.event} - 
        "${eventDetails.description}" - 
        ${eventDetails.time} </p> <button id="delete-btn" onclick=(deleteEvent(${eventDetails.id}))>Delete</button>
        `;
      newDate.appendChild(eventItem);
    }
    eventSection.appendChild(newDate);
  }
  itemList = document.querySelectorAll(".list-item");
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
