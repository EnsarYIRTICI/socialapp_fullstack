class PostService {
  constructor(postgres) {
    this.postgres = postgres;
  }

  async find() {
    const response = await this.postgres.query(
      `SELECT * FROM posts 
      INNER JOIN users ON users.uid = posts.sender_uid`
    );
    response.rows.map((row) => {
      console.log(row);
    });
  }

  async create(post_id, uid, view1, description, visible) {
    await this.postgres.query(
      `INSERT INTO posts
              (id, sender_uid, view1, description, visible) 
              VALUES ($1,$2,$3,$4,$5)`,
      [post_id, uid, view1, description, visible]
    );
  }

  async createIndex() {
    await this.postgres.query(
      "CREATE INDEX index_posts ON posts (visible, sender_uid, creation_date)"
    );
  }

  async indexList() {
    const result = await this.postgres.query(
      "SELECT * FROM pg_indexes WHERE tablename='posts'"
    );
    console.log(result.rows);
  }
}

module.exports = PostService;
