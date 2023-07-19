const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  findByPseudo(pseudo) {
    return this.database.query(`select * from ${this.table} where pseudo = ?`, [
      pseudo,
    ]);
  }

  createUser(body) {
    const { pseudo, hashedPassword } = body;
    return this.database.query(
      `insert into ${this.table} (pseudo, hashedPassword) values (?, ?)`,
      [pseudo, hashedPassword]
    );
  }
}

module.exports = UserManager;
