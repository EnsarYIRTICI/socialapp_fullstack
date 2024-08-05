import postgres from "../db/postgres.js";

class ProfileService {
  findByUsernameOrUid = async (unameoruid: string) => {
    return await postgres.query(
      `SELECT u.uid, u.fid, u.username, u.displayname, u.image, u.biography,
        COUNT(DISTINCT p) as posts_count,
        COUNT(DISTINCT f) as follows_count,
        COUNT(DISTINCT fr) as followers_count
        FROM users u
        LEFT JOIN posts p on p.sender_uid = u.uid
        LEFT JOIN follows f on f.follower_uid = u.uid
        LEFT JOIN follows fr on fr.followed_uid  = u.uid
        WHERE (p.visible = true OR p.visible IS NULL) 
        AND (u.uid = $1 or u.username = $1)
        GROUP BY u.uid
          `,
      [unameoruid]
    );
  };

  edit = async (
    image: string,
    displayname: string,
    biography: string,
    uid: string
  ) => {
    await postgres.query(
      `UPDATE users 
        SET image = $1, displayname = $2, biography = $3 
        WHERE uid = $4`,
      [image, displayname, biography, uid]
    );
  };

  posts = async (lim: number, set: number, sender: string, myuid: string) => {
    return await postgres.query(
      `SELECT posts.*, users.uid, users.username, users.image,
        COUNT(DISTINCT comments) as comments_count,
        COUNT(DISTINCT post_likes) as likes_count,
        EXISTS (
          SELECT 1
          FROM post_likes pl
          WHERE pl.post_id = posts.id AND pl.sender_uid = $4
        ) as liked,
        EXISTS (
          SELECT 1
          FROM post_saves ps
          WHERE ps.post_id = posts.id AND ps.sender_uid = $4
        ) as saved
        FROM posts 
        INNER JOIN users on posts.sender_uid = users.uid
        LEFT JOIN post_saves on posts.id = post_saves.post_id
        LEFT JOIN comments on posts.id = comments.post_id
        LEFT JOIN post_likes on posts.id = post_likes.post_id
        WHERE posts.visible = true AND posts.sender_uid = $3
        GROUP BY posts.id, users.uid
        ORDER BY posts.creation_date DESC
        LIMIT ($1) OFFSET ($2)
      `,
      [lim, set, sender, myuid]
    );
  };

  saves = async (lim: number, set: number, sender: string, myuid: string) => {
    return await postgres.query(
      `SELECT posts.*, users.uid, users.username, users.image,
        COUNT(DISTINCT comments) as comments_count,
        COUNT(DISTINCT post_likes) as likes_count,
        EXISTS (
          SELECT 1
          FROM post_likes pl
          WHERE pl.post_id = posts.id AND pl.sender_uid = $4
        ) as liked,
        EXISTS (
          SELECT 1
          FROM post_saves ps
          WHERE ps.post_id = posts.id AND ps.sender_uid = $4
        ) as saved
        FROM post_saves ps
        INNER JOIN posts ON ps.post_id = posts.id 
        INNER JOIN users ON posts.sender_uid = users.uid
        LEFT JOIN post_saves on ps.post_id = post_saves.post_id
        LEFT JOIN comments on ps.post_id = comments.post_id
        LEFT JOIN post_likes on ps.post_id = post_likes.post_id
        WHERE ps.sender_uid = $3
        GROUP BY ps.id, posts.id, users.uid
        ORDER BY ps.creation_date DESC 
        LIMIT ($1) OFFSET ($2)
      `,
      [lim, set, sender, myuid]
    );
  };

  followState = async (youruid: string, myuid: string) => {
    return await postgres.query(`SELECT * FROM follows WHERE id = $1`, [
      youruid + myuid,
    ]);
  };
}

export default ProfileService;
