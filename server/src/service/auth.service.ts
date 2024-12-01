import postgres from "../db/postgres.js";

class AuthService {
  signIn = async (username: string, password: string) => {
    return await postgres.query(
      `SELECT uid, fid, username, password, displayname, image, biography
      FROM users WHERE username = $1 AND password = $2`,
      [username, password]
    );
  };

  signUp = async (
    uid: string,
    fid: string,
    username: string,
    displayname: string,
    email: string,
    password: string,
    now: string
  ) => {
    await postgres.query(
      `INSERT INTO 
          users (uid, fid, username, displayname, email, password, dateoflogin, dateofregister) 
          VALUES ($1,$2,$3,$4,$5,$6,$7,$7)`,
      [uid, fid, username, displayname, email, password, now]
    );
  };

  updateLoginDate = async (username: string, now: string) => {
    await postgres.query(
      `UPDATE users
      SET dateoflogin = $2
      WHERE username = $1`,
      [username, now]
    );
  };

  delete = async (uid: string) => {
    await postgres.query(`DELETE FROM users WHERE uid = $1`, [uid]);
  };
}

export default AuthService;
