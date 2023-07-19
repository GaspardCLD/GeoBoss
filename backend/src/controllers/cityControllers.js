const models = require("../models");

const browse = (req, res) => {
  models.city
    .findAll()
    .then(([rows]) => {
      res.send(rows).status(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const { fetch } = req.body;

  models.city.deleteAll();

  const citiesData = fetch.map((city) => {
    return {
      name: city.nom,
      lon: city.centre.coordinates[0].toString(),
      lat: city.centre.coordinates[1].toString(),
      population: city.population,
    };
  });

  const promises = [];

  citiesData.forEach((city) => {
    promises.push(models.city.createCity(city));
  });

  Promise.all(promises)
    .then((results) => {
      res.status(201).send(results);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const setIsUsed = (req, res) => {
  const { id } = req.params;
  models.city
    .updateUsage(id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const resetUsage = (req, res) => {
  models.city
    .resetAllUsage()
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const randomCities = (req, res) => {
  models.city
    .randomCities()
    .then(([rows]) => {
      models.city
        .updateUsage(rows[0].id)
        .then(() => {
          return models.city.updateUsage(rows[1].id); // Use return here to chain promises
        })
        .then(() => {
          res.status(200).send(rows); // Send the response after both promises are resolved
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  add,
  browse,
  setIsUsed,
  resetUsage,
  randomCities,
};
