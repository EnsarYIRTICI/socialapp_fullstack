class StoryService {
  constructor(postgres) {
    this.postgres = postgres;
  }

  async find() {
    const response = await this.postgres.query("SELECT * FROM stories");
    if (response.rows.length === 0) {
      console.log("Empty Table");
    }

    response.rows.map((row) => {
      console.log(row);
    });
  }

  async create(media, uid) {
    await this.postgres.query(
      `INSERT INTO stories (media, sender_uid)
      VALUES ($1,$2)
      `,
      [media, uid]
    );
  }
}

module.exports = StoryService;
