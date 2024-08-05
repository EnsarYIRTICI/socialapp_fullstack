import postgres from "../db/postgres.js";

class RoomService {
  create = async (roomid: string, now: string) => {
    await postgres.query(
      `INSERT INTO
        rooms (id, first_fid, second_fid, creation_date)
        VALUES ($1, $2, $3, $4)`,
      [roomid, roomid.substring(0, 15), roomid.substring(15, 30), now]
    );
  };

  update = async (
    message: string,
    sender_uid: string,
    now: string,
    roomid: string
  ) => {
    await postgres.query(
      `UPDATE rooms 
      SET displaymessage = $1, visible = $2, sender_uid = $3, updated_date = $4
      WHERE id = $5`,
      [message.substring(0, 100), true, sender_uid, now, roomid]
    );
  };

  countAll = async (myfid: string) => {
    return await postgres.query(
      `SELECT COUNT(*) FROM rooms r
        JOIN users u1 ON r.first_fid = u1.fid
        JOIN users u2 ON r.second_fid = u2.fid
        WHERE r.visible = true AND ($1 IN (r.first_fid, r.second_fid))
      `,
      [myfid]
    );
  };

  findAll = async (myfid: string, lim: number, set: number) => {
    return await postgres.query(
      `SELECT r.*, 
        CASE WHEN r.first_fid = $1 THEN u2.username ELSE u1.username END username,
        CASE WHEN r.first_fid = $1 THEN u2.displayname ELSE u1.displayname END displayname,
        CASE WHEN r.first_fid = $1 THEN u2.image ELSE u1.image END image,
        CASE WHEN r.first_fid = $1 THEN u2.fid ELSE u1.fid END fid,
        CASE WHEN r.first_fid = $1 THEN u2.uid ELSE u1.uid END uid
        FROM rooms r
        JOIN users u1 ON r.first_fid = u1.fid
        JOIN users u2 ON r.second_fid = u2.fid
        WHERE r.visible = true AND ($1 IN (r.first_fid, r.second_fid)) 
        ORDER BY r.updated_date DESC
        LIMIT $2 OFFSET $3
        `,
      [myfid, lim, set]
    );
  };

  findByRoomid = async (roomid: string) => {
    return await postgres.query(`SELECT * FROM rooms WHERE id = $1`, [roomid]);
  };

  search = async (myfid: string, lim: number, set: number, value: string) => {
    return await postgres.query(
      `SELECT r.*, 
        CASE WHEN r.first_fid = $1 THEN u2.username ELSE u1.username END username,
        CASE WHEN r.first_fid = $1 THEN u2.displayname ELSE u1.displayname END displayname,
        CASE WHEN r.first_fid = $1 THEN u2.image ELSE u1.image END image,
        CASE WHEN r.first_fid = $1 THEN u2.fid ELSE u1.fid END fid,
        CASE WHEN r.first_fid = $1 THEN u2.uid ELSE u1.uid END uid
        FROM rooms r
        JOIN users u1 ON r.first_fid = u1.fid
        JOIN users u2 ON r.second_fid = u2.fid
        WHERE r.visible = true
        AND ($1 IN (r.first_fid, r.second_fid))
        AND (LOWER(username) LIKE LOWER($4) OR LOWER(displayname) LIKE LOWER($4))
        ORDER BY r.updated_date DESC
        LIMIT $2 OFFSET $3
        `,
      [myfid, lim, set, `${value}%`]
    );
  };
}

export default RoomService;
