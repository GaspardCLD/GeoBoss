// eslint-disable-next-line import/no-extraneous-dependencies
const axios = require("axios");
require("dotenv").config();

const { API_URL } = process.env;

const fetchApi = (req, res, next) => {
  const minPopulation = parseInt(req.params.value, 10) || 0;
  axios
    .get(`${API_URL}`)
    .then((response) => {
      let cities;
      if (minPopulation > 0) {
        cities = response.data.filter(
          (item) => item.population > minPopulation
        );
      } else {
        cities = response.data;
      }
      req.body.fetch = cities;
      next();
    })

    .catch((err) => {
      console.error(err);
      next(err);
    });
};

const fetchApiNoParams = (req, res, next) => {
  axios
    .get(`${API_URL}`)
    .then((response) => {
      const cities = response.data.filter((item) => item.population > 120000);
      req.body.fetch = cities;
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
