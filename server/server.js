const express = require('express');
const app = express();
const cors = require('cors')

app.use(express.json()); 
app.use(cors());

const { printEvents } = require('./controller.js')
app.get("/api/events", printEvents)





app.listen(5050, () => console.log('Server running on 5050'));


