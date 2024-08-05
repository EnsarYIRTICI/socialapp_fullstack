import postgres from "../db/postgres.js";

class FollowService {
  send = async (youruid: string, myuid: string, now: string) => {
    await postgres.query(
      `INSERT INTO follows (id, followed_uid, follower_uid, creation_date) 
              VALUES ($1,$2,$3,$4)`,
      [youruid + myuid, youruid, myuid, now]
    );
  };

  delete = async (youruid: string, myuid: string) => {
    await postgres.query(`DELETE FROM follows WHERE id = $1`, [
      youruid + myuid,
    ]);
  };

  findFollows = async (uid: string) => {
    return await postgres.query(
      `SELECT f.*, u.uid, u.fid, u.username, u.displayname, u.image 
        FROM follows f 
        JOIN users u ON f.followed_uid = u.uid
        WHERE f.follower_uid = $1
        ORDER BY f.creation_date DESC`,
      [uid]
    );
  };

  findFollowers = async (uid: string) => {
    return await postgres.query(
      `SELECT f.*, u.uid, u.fid, u.username, u.displayname, u.image
        FROM follows f 
        JOIN users u ON f.follower_uid = u.uid
        WHERE f.followed_uid = $1
        ORDER BY f.creation_date DESC`,
      [uid]
    );
  };
}

export default FollowService;
