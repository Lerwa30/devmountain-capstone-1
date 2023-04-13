let eventList = require('./db.json');

module.exports = {
    printEvents: (req, res) => {
        res.status(200).send(eventList)
    },

    deleteEvent: (req, res) => {
        for (let i = 0; i < eventList.length; i++) {
            if(eventList[i].id === +req.params.id) {
                eventList.splice(i, 1)
                res.status(200).send(eventList)
            }
        }
    }
}