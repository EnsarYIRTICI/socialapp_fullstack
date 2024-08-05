export class SocketKeys {
  static JOIN = "joinRoom";
  static LEAVE = "leaveRoom";

  static UPDATE_MESSAGE = "sendUpdate";
  static MESSAGE = "sendMessage";
  static WRITING = "sendWriting";

  static ON_UPDATE_MESSAGE = "onUpdate";
  static ON_MESSAGE = "onMessage";
  static ON_DISPLAY = "onDisplay";
  static ON_WRITING = "onWriting";
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
