const express = require('express');
const app = express();
const cors = require('cors')

app.use(express.json()); 
app.use(cors());

const { printEvents, deleteEvent, createEvent } = require('./controller.js')
app.get("/api/events", printEvents)
app.delete("/api/events/:id", deleteEvent)
app.post("/api/events", createEvent)

app.listen(5050, () => console.log('Server running on 5050'));


