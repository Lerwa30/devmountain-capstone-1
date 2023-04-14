require("dotenv").config();
const {CONNECTION_STRING} = process.env;
const Sequelize = require("sequelize");
const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
  });

// let eventList = require('./db.json');
// id = 3;

module.exports = {
    printEvents: (req, res) => {
        sequelize.query(`
        SELECT * FROM events`)
            .then(dbResult => {
                res.status(200).send(dbResult[0])
            })
    },

    deleteEvent: (req, res) => {
        let { id } = req.params;
        sequelize.query(`
        DELETE
        FROM events
        WHERE id = ${id};`)
            .then(dbResult => {
            sequelize.query(`
            SELECT * FROM events;`)
                .then(dbResult => {
                    res.status(200).send(dbResult[0])
                })
            })
    },

    createEvent: (req, res) => {
        let { date, event, description, time } = req.body;
        console.log(date, event, description, time)
        sequelize.query(`INSERT INTO events (date, event, description, time)
        VALUES ('${date}', '${event}', '${description}', '${time}');`)
            .then(dbResult => {sequelize.query(`
            SELECT * FROM events;`)
                .then(dbResult => {
                    res.status(200).send(dbResult[0])
                })
            })
    }
}