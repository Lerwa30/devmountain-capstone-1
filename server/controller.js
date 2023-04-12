let eventList = require('./db.json');

module.exports = {
    printEvents: (req, res) => {
        res.status(200).send(eventList)
    }
}