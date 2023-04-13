let eventList = require('./db.json');
id = 3;

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
    },

    createEvent: (req, res) => {
        let formEvent = req.body;
        formEvent.id = id;
        eventList.push(formEvent)
        id++;
        res.status(200).send(eventList);
    }
}