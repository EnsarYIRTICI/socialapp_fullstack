import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import RyanDahl from "../config/RyanDahl";
import TimBernersLee from "../services/TimBernersLee";
import { SocketKeys, SocketMessage, SocketWriting } from "../objects/socket";

class BubbleService {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;

  constructor(socket: Socket<DefaultEventsMap, DefaultEventsMap>) {
    this.socket = socket;
  }

  socketWriting = (
    roomid: string,
    sender_uid: string,
    receiver_uid: string
  ) => {
    this.socket.emit(
      SocketKeys.WRITING,
      new SocketWriting(roomid, sender_uid, receiver_uid)
    );
  };

  socketSend = (roomid: string, sender_uid: string, receiver_uid: string) => {
    this.socket.emit(
      SocketKeys.MESSAGE,
      new SocketMessage(roomid, sender_uid, receiver_uid)
    );
  };

  count = async (roomid: string) => {
    return TimBernersLee.httpPost(RyanDahl.API_BUBBLE_COUNT, { roomid });
  };

  findAll = async (lim: number, set: number, roomid: string) => {
    return TimBernersLee.httpPost(RyanDahl.API_BUBBLE_LIST, {
      roomid,
      lim,
      set,
    });
  };

  findMore = async (lim: number, set: number, roomid: string) => {
    return TimBernersLee.httpPost(RyanDahl.API_BUBBLE_LIST_MORE, {
      roomid,
      lim,
      set,
    });
  };

  send = async (message: string, sender_uid: string, roomid: string) => {
    return TimBernersLee.httpPost(RyanDahl.API_BUBBLE_SEND, {
      message,
      sender_uid,
      roomid,
    });
  };

  update = async (
    id: string,
    message: string,
    roomid: string,
    sendate: string,
    sender_uid: string
  ) => {
    return TimBernersLee.httpPost(RyanDahl.API_BUBBLE_UPDATE, {
      id,
      message,
      roomid,
      sendate,
      sender_uid,
    });
  };
}

export default BubbleService;
