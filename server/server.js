require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors')
const {SERVER_PORT} = process.env


app.use(express.json()); 
app.use(cors());

const { printEvents, deleteEvent, createEvent, editProfile, getProfile } = require('./controller.js')
app.get("/api/events", printEvents)
app.delete("/api/events/:id", deleteEvent)
app.post("/api/events", createEvent)
app.get("/api/profile", getProfile)
app.put("/api/profile", editProfile)

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))

