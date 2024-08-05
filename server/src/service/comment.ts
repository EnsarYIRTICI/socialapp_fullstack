import postgres from "../db/postgres.js";

class CommentService {
  sendLike = async (
    commentid: string,
    sender: string,
    creation_date: string
  ) => {
    await postgres.query(
      `INSERT INTO comment_likes
              (id, commentid, sender_uid, creation_date) 
              VALUES ($1,$2,$3,$4)`,
      [commentid + sender, commentid, sender, creation_date]
    );
  };

  deleteLike = async (commentid: string, sender: string) => {
    await postgres.query(`DELETE FROM comment_likes WHERE id = $1`, [
      commentid + sender,
    ]);
  };
}

export default CommentService;
