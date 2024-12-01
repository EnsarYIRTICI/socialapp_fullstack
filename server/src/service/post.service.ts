import postgres from "../db/postgres.js";

class PostService {
  countAll = async (uid: string) => {
    return await postgres.query(
      `SELECT COUNT(DISTINCT p) FROM posts p
       LEFT JOIN follows on  p.sender_uid = follows.followed_uid 
       WHERE p.visible = true 
       AND (p.sender_uid = $1 OR follows.follower_uid = $1)
      `,
      [uid]
    );
  };

  findAll = async (lim: number, set: number, uid: string) => {
    return await postgres.query(
      `SELECT posts.*, users.uid, users.username, users.image,
        COUNT(DISTINCT comments) as comments_count,
        COUNT(DISTINCT post_likes) as likes_count,
        EXISTS (
          SELECT 1
          FROM post_likes pl
          WHERE pl.post_id = posts.id AND pl.sender_uid = $3
        ) as liked,
        EXISTS (
          SELECT 1
          FROM post_saves ps
          WHERE ps.post_id = posts.id AND ps.sender_uid = $3
        ) as saved
        FROM posts
        INNER JOIN users on posts.sender_uid = users.uid
        LEFT JOIN follows on posts.sender_uid = follows.followed_uid
        LEFT JOIN post_saves on posts.id = post_saves.post_id
        LEFT JOIN comments on posts.id = comments.post_id
        LEFT JOIN post_likes on posts.id = post_likes.post_id
        WHERE posts.visible = true
        AND (posts.sender_uid = $3 OR follows.follower_uid = $3)
        GROUP BY posts.id, users.uid
        ORDER BY posts.creation_date DESC
        LIMIT ($1) OFFSET ($2)
      `,
      [lim, set, uid]
    );
  };

  findLikes = async (post_id: string, lim: number, set: number) => {
    return await postgres.query(
      `SELECT * FROM post_likes pl JOIN users u
        ON pl.sender_uid = u.uid
        WHERE pl.post_id = $1
        ORDER BY creation_date DESC
        LIMIT ($2) OFFSET ($3)`,
      [post_id, lim, set]
    );
  };

  findComments = async (
    lim: number,
    set: number,
    post_id: string,
    myuid: string
  ) => {
    return await postgres.query(
      `SELECT comments.*, users.username, users.image,
        COUNT(DISTINCT comment_likes) as likes_count,
        COUNT(DISTINCT replies) as replies_count,
        EXISTS (
          SELECT 1
          FROM comment_likes cl
          WHERE cl.commentid = comments.id AND cl.sender_uid = $4
        ) as liked
        FROM comments 
        INNER JOIN users on comments.sender_uid = users.uid
        LEFT JOIN comment_likes on comments.id = comment_likes.commentid 
        LEFT JOIN replies on comments.id = replies.commentid
        WHERE comments.post_id = $3
        GROUP BY comments.id, users.uid
        ORDER BY likes_count DESC
        LIMIT ($1) OFFSET ($2)
      `,
      [lim, set, post_id, myuid]
    );
  };

  create = async (
    post_id: string,
    uid: string,
    view1: string,
    description: string
  ) => {
    await postgres.query(
      `INSERT INTO posts
              (id, sender_uid, view1, description) 
              VALUES ($1,$2,$3,$4)`,
      [post_id, uid, view1, description]
    );
  };

  hide = async (post_id: string, sender_uid: string) => {
    await postgres.query(
      `UPDATE posts SET visible = false
        WHERE id = $1 and sender_uid = $2`,
      [post_id, sender_uid]
    );
  };

  delete = async (post_id: string, sender_uid: string) => {
    await postgres.query(
      `DELETE FROM posts WHERE id = $1 AND sender_uid = $2`,
      [post_id, sender_uid]
    );
  };

  sendComment = async (
    post_id: string,
    sender_uid: string,
    comment: string,
    creation_date: string
  ) => {
    await postgres.query(
      `INSERT INTO comments
              (post_id, text, sender_uid, creation_date) 
              VALUES ($1,$2,$3,$4)`,
      [post_id, comment, sender_uid, creation_date]
    );
  };

  sendLike = async (post_id: string, uid: string, creation_date: string) => {
    await postgres.query(
      `INSERT INTO post_likes
              (id, post_id, sender_uid, creation_date) 
              VALUES ($1,$2,$3,$4)`,
      [post_id + uid, post_id, uid, creation_date]
    );
  };

  sendSave = async (post_id: string, uid: string, creation_date: string) => {
    await postgres.query(
      `INSERT INTO post_saves
              (id, post_id, sender_uid, creation_date) 
              VALUES ($1,$2,$3,$4)`,
      [post_id + uid, post_id, uid, creation_date]
    );
  };

  deleteLike = async (post_id: string, sender_uid: string) => {
    await postgres.query(
      `DELETE FROM post_likes
        WHERE id = $1`,
      [post_id + sender_uid]
    );
  };

  deleteSave = async (post_id: string, sender_uid: string) => {
    await postgres.query(
      `DELETE FROM post_saves
        WHERE id = $1`,
      [post_id + sender_uid]
    );
  };
}

export default PostService;
