const AbstractManager = require("./AbstractManager");

class CityManager extends AbstractManager {
  constructor() {
    super({ table: "city" });
  }

  createCity(body) {
    const { name, lat, lon, population } = body;
    return this.database.query(
      `insert into ${this.table} (name, lon, lat, population) values (?, ?, ?, ?)`,
      [name, lon, lat, population]
    );
  }
}

module.exports = CityManager;
