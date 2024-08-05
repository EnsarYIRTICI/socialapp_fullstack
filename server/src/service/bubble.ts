import { ObjectId } from "mongodb";
import mongo from "../db/mongo.js";
import { Bubble } from "../objects/bubble.js";

class BubbleService {
  rooms = mongo.db("rooms");

  countByRoomid = async (roomid: string) => {
    return await this.rooms.collection(roomid).countDocuments();
  };

  findByRoomid = async (lim: number, set: number, roomid: string) => {
    return await this.rooms
      .collection(roomid)
      .find({})
      .sort({ _id: -1 })
      .skip(set)
      .limit(lim)
      .toArray();
  };

  createRoom = async (roomid: string) => {
    await this.rooms.createCollection(roomid);
  };

  send = async (roomid: string, bubble: Bubble) => {
    await this.rooms.collection(roomid).insertMany([bubble]);
  };

  update = async (id: string, roomid: string, message: string) => {
    await this.rooms
      .collection(roomid)
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { message: message, edited: true } }
      );
  };
}

export default BubbleService;
