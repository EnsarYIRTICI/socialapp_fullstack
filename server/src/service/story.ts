import postgres from "../db/postgres.js";

class StoryService {
  findAll = async (uid: string, lim: number, set: number) => {
    return await postgres.query(
      `SELECT s.*, u.uid, u.username, u.image 
        FROM stories s
        INNER JOIN users u ON u.uid = s.sender_uid
        LEFT JOIN follows f ON f.followed_uid = s.sender_uid
        WHERE s.visible = true
        AND s.creation_date >= NOW() - INTERVAL '24 HOURS'
        AND (s.sender_uid = $1 OR f.follower_uid = $1)
        GROUP BY s.story_id, u.uid
        ORDER BY s.creation_date, s.sender_uid DESC
        LIMIT ($2) OFFSET ($3) 
    `,
      [uid, lim, set]
    );
  };

  create = async (story_id: string, media: string, uid: string) => {
    await postgres.query(
      `INSERT INTO stories (story_id, media, sender_uid)
      VALUES ($1,$2,$3)
      `,
      [story_id, media, uid]
    );
  };

  delete = async (story_id: string, sender_uid: string) => {
    await postgres.query(
      `DELETE FROM stories s
      WHERE s.story_id = $1 AND s.sender_uid = $2
      `,
      [story_id, sender_uid]
    );
  };

  hide = async (story_id: string, sender_uid: string) => {
    await postgres.query(
      `UPDATE stories SET visible = false
      WHERE s.story_id = $1 AND s.sender_uid = $2
      `,
      [story_id, sender_uid]
    );
  };
}

export default StoryService;
