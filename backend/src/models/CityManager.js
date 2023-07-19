const AbstractManager = require("./AbstractManager");

class CityManager extends AbstractManager {
  constructor() {
    super({ table: "city" });
  }

  createCity(body) {
    const { name, lat, lon, population } = body;
    return this.database.query(
      `insert into ${this.table} (name, lat, lon, population) values (?, ?, ?, ?)`,
      [name, lat, lon, population]
    );
  }
}

module.exports = CityManager;
