const AbstractManager = require("./AbstractManager");

class CityManager extends AbstractManager {
  constructor() {
    super({ table: "city" });
  }

  createCity(city) {
    const { name, lon, lat, population } = city;
    return this.database.query(
      `INSERT INTO ${this.table} (name, lon, lat, population)
       VALUES (?, ?, ?, ?)`,
      [name, lon, lat, population]
    );
  }

  deleteAll() {
    return this.database.query(`DELETE FROM ${this.table}`);
  }

  updateUsage(id) {
    return this.database.query(
      `UPDATE ${this.table} SET is_used = 1 WHERE id = ?`,
      [id]
    );
  }

  resetAllUsage() {
    return this.database.query(`UPDATE ${this.table} SET is_used = 0`);
  }

  randomCities() {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE is_used = 0 ORDER BY RAND() LIMIT 2`
    );
  }
}

module.exports = CityManager;
