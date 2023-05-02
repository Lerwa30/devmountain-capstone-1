require("dotenv").config();
const { CONNECTION_STRING } = process.env;
const Sequelize = require("sequelize");
const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

let name = "Maggie";
let age = "6 Months";
let imgUrl = "https://cdn-icons-png.flaticon.com/512/3787/3787150.png";

module.exports = {
  getProfile: (req, res) => {
    res.status(200).send({ name, age, imgUrl });
  },

  editProfile: (req, res) => {
    const { newName, newAge, newImg } = req.query;
    if (newName) {
      name = newName;
    }
    if (newAge) {
      age = newAge;
    }
    if (newImg) {
      imgUrl = newImg;
    }
    res.status(200).send({ name, age, imgUrl });
  },

  printEvents: (req, res) => {
    sequelize
      .query(
        `
        SELECT * FROM events`
      )
      .then((dbResult) => {
        res.status(200).send(dbResult[0]);
      });
  },

  deleteEvent: (req, res) => {
    let { id } = req.params;
    sequelize
      .query(
        `
        DELETE
        FROM events
        WHERE id = ${id};`
      )
      .then((dbResult) => {
        sequelize
          .query(
            `
            SELECT * FROM events;`
          )
          .then((dbResult) => {
            res.status(200).send(dbResult[0]);
          });
      });
  },

  createEvent: (req, res) => {
    let { date, event, description, time } = req.body;
    sequelize
      .query(
        `INSERT INTO events (date, event, description, time)
        VALUES ('${date}', '${event}', '${description}', '${time}');`
      )
      .then((dbResult) => {
        sequelize
          .query(
            `
            SELECT * FROM events;`
          )
          .then((dbResult) => {
            res.status(200).send(dbResult[0]);
          });
      });
  },
};
