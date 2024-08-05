import { Socket } from "socket.io";
import UserService from "../service/user.js";
import moment from "moment";
import { ObjectId } from "mongodb";
import { Bubble } from "../objects/bubble.js";
import BubbleService from "../service/bubble.js";
import RoomService from "../service/room.js";

class SocketController {
  userService = new UserService();

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
      socket.emit("onMessage", null);
      socket.emit("onDisplay", null);

      socket.to(data.roomid).emit("onMessage", null);
      socket.to(data.receiver_uid).emit("onDisplay", null);
    });

    socket.on("sendUpdate", async (data) => {
      socket.emit("onUpdate", data);
      socket.to(data.roomid).emit("onUpdate", data);
    });
  }
}

export default SocketController;
