import { Socket } from "socket.io";
import UserService from "../service/user.service.js";
import moment from "moment";
import { ObjectId } from "mongodb";
import { Bubble } from "../objects/bubble.js";
import BubbleService from "../service/bubble.service.js";
import RoomService from "../service/room.service.js";

class SocketController {
  userService = new UserService();
  bubbleService = new BubbleService();
  roomService = new RoomService();

  onConnection(socket: Socket) {
    socket.on("join-room", (roomid) => {
      socket.join(roomid);
    });
    socket.on("leave-room", (roomid) => {
      socket.leave(roomid);
    });

    socket.on("search-users", async (data) => {
      try {
        const response = await this.userService.search(data);
        socket.emit("on-search-users", response.rows);
      } catch (error) {
        console.log("kullanici taramasi basarisiz");
      }
    });

    socket.on("writing", (data) => {
      socket.to(data.roomid).emit("onWriting", data);
      socket.to(data.receiver_uid).emit(data.sender_uid, null);
    });

    socket.on("message", async (data) => {
      // console.log(socket);

      // console.log("Data --> ", data);

      if (data) {
        const sender_uid = data.sender_uid;
        const roomid = data.roomid;
        const message = data.message;

        if (sender_uid && roomid) {
          const currentDate = moment().format();
          const strid = new ObjectId().toHexString();

          let bubble = new Bubble(
            new ObjectId(strid),
            message ?? "",
            sender_uid,
            currentDate,
            true,
            false,
            undefined
          );

          socket.emit("on-message", bubble);
          socket.emit("on-display", null);

          socket.to(roomid).emit("on-message", bubble);
          // socket.to(receiver_uid).emit("on-display", null);

          await this.bubbleService.send(roomid, bubble);
          await this.roomService.update(
            message,
            sender_uid,
            currentDate,
            roomid
          );
        }
      }
    });

    socket.on("update", async (data) => {
      const _id = data._id;
      const roomid = data.roomid;
      const message = data.message;

      socket.emit("on-update", data);
      socket.to(data.roomid).emit("on-update", data);

      await this.bubbleService.update(_id, roomid, message);
    });
  }
}

export default SocketController;
