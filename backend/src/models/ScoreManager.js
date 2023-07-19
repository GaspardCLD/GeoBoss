const AbstractManager = require("./AbstractManager");

class ScoreManager extends AbstractManager {
  constructor() {
    super({ table: "score" });
  }

  addscore(userID, score) {
    return this.database.query(
      `INSERT INTO ${this.table} (user_id, score) VALUES (?, ?)`,
      [userID, score]
    );
  }
}

module.exports = ScoreManager;
