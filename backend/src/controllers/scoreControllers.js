const models = require("../models");

const add = (req, res) => {
  const { userID, score } = req.params;
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

const browseScores = (req, res) => {
  models.score
    .browseScores()
    .then(([result]) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getScoresOrdered = (req, res) => {
  models.score
    .getScoresOrdered()
    .then(([result]) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getScores = (req, res) => {
  const { limit } = req.query;
  models.score
    .getScoresByOrder(parseInt(limit, 10))
    .then(([result]) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getUserBestScore = (req, res) => {
  const { userID } = req.params;
  models.score
    .getUserBestScore(userID)
    .then(([result]) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getScoreRank = (req, res) => {
  const { score } = req.params;
  models.score
    .getScoreRank(parseInt(score, 10))
    .then(([result]) => {
      const rank = result[0].score_rank + 1;
      res.status(200).send({ rank });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  add,
  getScores,
  getUserBestScore,
  browseScores,
  getScoreRank,
  getScoresOrdered,
};
