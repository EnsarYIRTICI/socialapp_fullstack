class UserService {
  constructor(postgres) {
    this.postgres = postgres;
  }

  async find() {
    const response = await this.postgres.query(
      `SELECT username, password FROM users`
    );
    response.rows.map((row) => {
      console.log(row);
    });
  }

  async deleteByUsername(username) {
    await this.postgres.query(`DELETE FROM users WHERE username = $1`, [
      username,
    ]);
  }
}

module.exports = UserService;
