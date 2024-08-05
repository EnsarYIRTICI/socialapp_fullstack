import { Socket } from "socket.io";
import UserService from "../service/user.js";
import moment from "moment";
import { ObjectId } from "mongodb";
import { Bubble } from "../objects/bubble.js";
import BubbleService from "../service/bubble.js";
import RoomService from "../service/room.js";

class SocketController {
  userService = new UserService();
  bubbleService = new BubbleService();
  roomService = new RoomService();

  onConnection(socket: Socket) {
    socket.on("joinRoom", (roomid) => socket.join(roomid));
    socket.on("leaveRoom", (roomid) => socket.leave(roomid));

    socket.on("searchUsers", async (data) => {
      try {
        const response = await this.userService.search(data);
        socket.emit("onSearchUsers", response.rows);
      } catch (error) {
        console.log("kullanici taramasi basarisiz");
      }
    });

    socket.on("sendWriting", (data) => {
      socket.to(data.roomid).emit("onWriting", data);
      socket.to(data.receiver_uid).emit(data.sender_uid, null);
    });

    socket.on("sendMessage", async (data) => {
      const sender_uid = data.sender_uid;
      const receiver_uid = data.receiver_uid;
      const message = data.message;
      const roomid = data.roomid;
      const file = data.file;
      const _id = data._id;
      const isSaveDb = data.isSaveDb;

      const currentDate = moment().format();

      const strid = new ObjectId().toHexString();

      let bubble = new Bubble(
        new ObjectId(strid),
        message,
        sender_uid,
        currentDate,
        true,
        false,
        undefined
      );

      if (_id) {
        bubble["_id"] = _id;
      }

      if (file) {
        bubble["file"] = file;
      }

      socket.emit("onMessage", bubble);
      socket.emit("onDisplay", null);

      socket.to(roomid).emit("onMessage", bubble);
      socket.to(receiver_uid).emit("onDisplay", null);

      if (isSaveDb) {
        await this.bubbleService.send(roomid, bubble);
        await this.roomService.update(message, sender_uid, currentDate, roomid);
      }
    });

    socket.on("sendUpdate", async (data) => {
      const _id = data._id;
      const roomid = data.roomid;
      const message = data.message;

      socket.emit("onUpdate", data);
      socket.to(data.roomid).emit("onUpdate", data);

      await this.bubbleService.update(_id, roomid, message);
    });
  }
}

export default SocketController;
