const moment = require("moment");
const pg = require("pg");
const PostService = require("./service/post");
const UserService = require("./service/user");
const StoryService = require("./service/story");
const HM = require("./methods/hm");

const PG_CONFIG = {
  user: "postgres",
  password: "1453",
  host: "localhost",
  port: 5432,
  database: "socialapp",
};

const postgres = new pg.Pool(PG_CONFIG);

const postService = new PostService(postgres);
const userService = new UserService(postgres);
const storyService = new StoryService(postgres);

async function main() {
  await storyService.find();
  await postgres.end();
}

async function indexList(tableName) {
  const result = await postgres.query(
    `SELECT * FROM pg_indexes WHERE tablename='${tableName}'`
  );
  console.log(result.rows);
}

async function deleteIndex(value) {
  await postgres.query(`DROP INDEX ${value};`);
}

async function clearTable(tableName) {
  await postgres.query(`DELETE FROM ${tableName}`);
}

async function dropTable(tableName) {
  await postgres.query(`DROP TABLE ${tableName}`);
}

async function countTable(tableName) {
  const response = await postgres.query(`SELECT COUNT(*) FROM ${tableName}`);
  console.log("TABLE COUNT:", response.rows[0].count);
}

async function milionPostsCreate() {
  const bilion = Math.pow(10, 6);

  for (let i = 0; i < bilion; i++) {
    let post_id = HM.strid(25);
    await postService.create(
      post_id,
      "Wkva3qNHFf5RNuLHsdMyasg9B",
      "March13th2024111231pmmGlNY.jpg",
      i.toString(),
      false
    );
    console.log(i, post_id);
  }
}

main();
