export class SocketKeys {
  static JOIN = "join-room";
  static LEAVE = "leave-room";

  static UPDATE_MESSAGE = "update";
  static MESSAGE = "message";
  static WRITING = "writing";

  static ON_UPDATE_MESSAGE = "on-update";
  static ON_MESSAGE = "on-message";
  static ON_DISPLAY = "on-display";
  static ON_WRITING = "on-writing";
}

export class SocketMessage {
  constructor(roomid, receiver_fid, sender_fid) {
    this.roomid = roomid;
    this.receiver_fid = receiver_fid;
    this.sender_fid = sender_fid;
  }
}

export class SocketWriting {
  constructor(roomid, receiver_fid, sender_fid) {
    this.roomid = roomid;
    this.receiver_fid = receiver_fid;
    this.sender_fid = sender_fid;
  }
}

export class SocketUpdateMessage {
  constructor(_id, roomid, message) {
    this._id = _id;
    this.roomid = roomid;
    this.message = message;
  }
}
