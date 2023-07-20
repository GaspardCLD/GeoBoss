const AbstractManager = require("./AbstractManager");

class ScoreManager extends AbstractManager {
  constructor() {
    super({ table: "score" });
  }

  addScore(userID, score) {
    return this.database.query(
      `INSERT INTO ${this.table} (user_id, score) VALUES (?, ?)`,
      [userID, score]
    );
  }

  browseScores() {
    return this.database.query(`SELECT * FROM ${this.table}`);
  }

  getScoresByOrder(limit) {
    return this.database.query(
      `SELECT * FROM ${this.table} ORDER BY score DESC LIMIT ?`,
      [limit]
    );
  }

  getScoreRank(score) {
    return this.database.query(
      `SELECT COUNT(*) AS score_rank FROM ${this.table} WHERE score > ?`,
      [score]
    );
  }

  getUserBestScore(userID) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE user_id = ? ORDER BY score DESC LIMIT 1`,
      [userID]
    );
  }
}

module.exports = ScoreManager;
