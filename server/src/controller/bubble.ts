import { Request, Response } from "express";
import BubbleService from "../service/bubble.js";
import moment from "moment";
import { Bubble, BubbleFile } from "../objects/bubble.js";
import RoomService from "../service/room.js";
import HM from "../methods/hm.js";
import FM from "../methods/fm.js";
import busboy from "busboy";
import fs from "fs";
import { ObjectId } from "mongodb";

class BubbleController {
  bubbleService = new BubbleService();
  roomService = new RoomService();

  async count(req: Request, res: Response): Promise<void> {
    try {
      const { roomid } = req.body;
      const count = await this.bubbleService.countByRoomid(roomid);
      res.json(count);
    } catch (error) {
      console.log("mesaj liste uzunlugu alinamadi");
    }
  }

  async list(req: Request, res: Response): Promise<void> {
    try {
      const { lim, set, roomid } = req.body;
      if (lim == 0) {
        res.json([]);
      } else {
        const findResult = await this.bubbleService.findByRoomid(
          lim,
          set,
          roomid
        );
        res.json(findResult);
      }
    } catch (error) {
      console.log("room kurulumu basarisiz");
    }
  }

  async listMore(req: Request, res: Response): Promise<void> {
    try {
      const { roomid, lim, set } = req.body;
      const findResult = await this.bubbleService.findByRoomid(
        lim,
        set,
        roomid
      );
      res.json(findResult);
    } catch (error) {
      console.log("daha fazla bubble yuklenemedi");
    }
  }

  async send(req: Request, res: Response): Promise<void> {
    try {
      const { message, sender_uid, roomid } = req.body;
      const currentDate = moment().format();

      const strid = new ObjectId().toHexString();

      const bubble = new Bubble(
        new ObjectId(strid),
        message,
        sender_uid,
        currentDate,
        true,
        false,
        undefined
      );

      await this.bubbleService.send(roomid, bubble);
      await this.roomService.update(message, sender_uid, currentDate, roomid);

      res.json("Bubble has been sent");
    } catch (error) {
      console.log("mesaj yollanamadi");
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id, roomid, message } = req.body;
      this.bubbleService.update(id, roomid, message);
      res.json("Message has been updated");
    } catch (error) {
      console.log("mesaj guncellenemedi");
    }
  }

  async sendFile(req: Request, res: Response): Promise<void> {
    try {
      const bb = busboy({ headers: req.headers });

      let jsonData: any;
      let filesLength: number;
      let counter = 0;

      let bubbleList: Bubble[] = [];

      bb.on("field", (name, value, info) => {
        jsonData = JSON.parse(value);
        filesLength = jsonData.files.length;
      });

      bb.on("file", (field, stream, info) => {
        const fileData = jsonData.files[counter];
        const isLastIndex = filesLength - 1 === counter;

        const file_name = fileData.file_name;
        const file_size = fileData.file_size;

        const top_name = HM.dateid(7);
        const roomPath = FM.roomsPath + jsonData.roomid + "/";

        FM.createFolderIfExist(roomPath);

        const topPath = roomPath + top_name + "/";
        const currentDate = moment().format();
        const strid = new ObjectId().toHexString();
        const extension = HM.extname(file_name);
        const file_type = fileData.file_type;

        const bubble = new Bubble(
          new ObjectId(strid),
          isLastIndex
            ? jsonData.message.length > 0
              ? jsonData.message
              : null
            : null,
          jsonData.sender_uid,
          currentDate,
          true,
          false,
          new BubbleFile(top_name, file_name, extension, file_size, file_type)
        );

        fs.mkdir(topPath, (err) => {
          if (err) {
            console.log(err);
          } else {
            stream.pipe(fs.createWriteStream(topPath + file_name));

            stream.on("close", async () => {
              await this.bubbleService.send(jsonData.roomid, bubble);
              await this.roomService.update(
                isLastIndex
                  ? jsonData.message.length > 0
                    ? jsonData.message
                    : file_name
                  : file_name,
                jsonData.sender_uid,
                currentDate,
                jsonData.roomid
              );
            });
          }
        });

        bubbleList.push(bubble);

        counter += 1;
      });

      bb.on("close", () => {
        res.writeHead(200, { Connection: "close" });

        const jsonStr = JSON.stringify({
          message: "Successful",
          data: bubbleList,
        });

        res.end(jsonStr);
      });

      req.pipe(bb);
    } catch (error) {
      console.log("mesaj ile dosya yollanamadi");
    }
  }

  async bubbleFileDownload(req: Request, res: Response): Promise<void> {
    try {
      const { roomid, top_name, file_name } = req.params;
      const filepath = `${FM.roomsPath}${roomid}/${top_name}/${file_name}`;
      res.download(filepath, (err) => {
        if (err) res.send("<h1>File Not Found</h1> ");
      });
    } catch (error) {
      console.log("dosya indirilemedi");
    }
  }
}

export default BubbleController;
