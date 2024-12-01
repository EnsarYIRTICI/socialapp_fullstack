import postgres from "../db/postgres.js";

class UserService {
  findByEmail = async (email: string) => {
    return await postgres.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
  };

  findByFid = async (fid: string) => {
    return await postgres.query("SELECT * FROM users WHERE fid = $1", [fid]);
  };

  search = async (value: string) => {
    return await postgres.query(
      `SELECT uid, fid, username, displayname, image FROM users 
        WHERE LOWER(username) LIKE LOWER($1) 
        OR LOWER(displayname) LIKE LOWER($1)
        LIMIT 10 OFFSET 0
      `,
      [`${value}%`]
    );
  };
}

export default UserService;
