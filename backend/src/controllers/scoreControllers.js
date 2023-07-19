const models = require("../models");

const add = (req, res) => {
  const { userID, score } = req.body;
  models.score
    .addScore(userID, score)
    .then(([result]) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  add,
};
