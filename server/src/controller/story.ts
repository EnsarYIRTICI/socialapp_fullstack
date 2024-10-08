import busboy from "busboy";
import StoryService from "../service/story.js";
import { Request, Response } from "express";
import HandleManager from "../methods/hm.js";
import FileManager from "../methods/fm.js";
import fs from "fs";
import FM from "../methods/fm.js";

class StoryController {
  storyService = new StoryService();

  async list(req: Request, res: Response): Promise<void> {
    try {
      const { uid, lim, set } = req.body;
      const response = await this.storyService.findAll(uid, lim, set);
      res.json(response.rows);
    } catch (error) {
      console.log("storyler yüklenemedi");
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const bb = busboy({ headers: req.headers });

      let jsonData: any;
      let savePath: string;
      let file_name: string;

      bb.on("field", (name, value, info) => {
        jsonData = JSON.parse(value);
      });

      bb.on("file", (name, stream, info) => {
        file_name = HandleManager.newFileName(info.filename);

        savePath = FileManager.storiesPath + jsonData.uid + "/";

        FM.createFolderIfExist(savePath);

        stream.pipe(fs.createWriteStream(savePath + file_name));
      });

      bb.on("finish", async () => {
        await this.storyService.create(
          HandleManager.strid(25),
          file_name,
          jsonData.uid
        );
      });

      bb.on("close", () => {
        res.writeHead(200, { Connection: "close" });
        res.end("Successful");
      });

      req.on("aborted", async () => {
        fs.unlinkSync(savePath + file_name);
      });

      req.pipe(bb);
    } catch (error) {
      console.log("storyler oluşturulamadi");
    }
  }

  async hide(req: Request, res: Response): Promise<void> {
    try {
      const { story_id, sender_uid } = req.body;
      // await storyService.hide(story_id, sender_uid);
      await this.storyService.delete(story_id, sender_uid);
      res.json("Story Hidden");
    } catch (error) {
      console.log("storyler gizlenemedi");
    }
  }
}

export default StoryController;
