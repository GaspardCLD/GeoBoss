// eslint-disable-next-line import/no-extraneous-dependencies
const axios = require("axios");
require("dotenv").config();

const fetchApi = (req, res, next) => {
  const minPopulation = parseInt(req.params.value, 10) || 0;
  axios
    .get("https://geo.api.gouv.fr/communes?fields=nom,population,centre")
    .then((response) => {
      let cities = [];
      if (minPopulation > 0) {
        cities = response.data.filter(
          (item) => item.population > minPopulation
        );
      } else {
        cities = response.data;
      }
      res.send(cities);
      next();
    })

    .catch((err) => {
      console.error(err);
      next(err);
    });
};

const fetchApiNoParams = (req, res, next) => {
  axios
    .get("https://geo.api.gouv.fr/communes?fields=nom,population,centre")
    .then((response) => {
      res.send(response.data);
      next();
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
};

module.exports = {
  fetchApi,
  fetchApiNoParams,
};
