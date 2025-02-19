import { Request, Response } from "express";
import RoomService from "../service/room.service.js";
import HandleManager from "../methods/hm.js";
import moment from "moment";
import BubbleService from "../service/bubble.service.js";
import UserService from "../service/user.service.js";

class RoomController {
  roomService = new RoomService();
  bubbleService = new BubbleService();
  userService = new UserService();

  async count(req: Request, res: Response): Promise<void> {
    try {
      const { fid } = req.body;
      const response = await this.roomService.countAll(fid);
      const count = parseInt(response.rows["0"].count);
      res.json(count);
    } catch (error) {
      console.log("room kurulamadi");
    }
  }

  async list(req: Request, res: Response): Promise<void> {
    try {
      const { fid, lim, set } = req.body;
      const response = await this.roomService.findAll(fid, lim, set);
      res.json(response.rows);
    } catch (error) {
      console.log("room kurulamadi");
    }
  }

  async find(req: Request, res: Response): Promise<void> {
    try {
      const { myfid, yourfid } = req.body;
      const roomid = HandleManager.calcroom(myfid, yourfid);
      const response = await this.roomService.findByRoomid(roomid);
      const userData = await this.userService.findByFid(yourfid);
      if (response.rows.length > 0) {
        res.json({ roomid: roomid, userData: userData.rows[0] });
      } else {
        await this.bubbleService.createRoom(roomid);
        await this.roomService.create(roomid, moment().format());
        res.json({ roomid: roomid, userData: userData.rows[0] });
      }
    } catch (error) {
      console.log("room bulunamadi");
    }
  }

  async search(req: Request, res: Response): Promise<void> {
    try {
      const { fid, lim, set, value } = req.body;
      const rooms = await this.roomService.search(fid, lim, set, value);
      res.json(rooms.rows);
    } catch (error) {
      console.log("room aramasi basarisiz");
    }
  }
}

export default RoomController;
