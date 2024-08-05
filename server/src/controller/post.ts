import { Request, Response } from "express";
import PostService from "../service/post.js";
import HandleManager from "../methods/hm.js";
import moment from "moment";

class PostController {
  postService = new PostService();

  async count(req: Request, res: Response): Promise<void> {
    try {
      const { uid } = req.body;
      const response = await this.postService.countAll(uid);
      const count = parseInt(response.rows["0"].count);
      res.json(count);
    } catch (error) {
      console.log("post liste uzunlugu yüklenemedi");
    }
  }

  async list(req: Request, res: Response): Promise<void> {
    try {
      const { lim, set, uid } = req.body;
      const response = await this.postService.findAll(lim, set, uid);
      res.json(response.rows);
    } catch (error) {
      console.log("postlar yüklenemedi");
    }
  }

  async listMore(req: Request, res: Response): Promise<void> {
    try {
      const { lim, set, uid } = req.body;
      const response = await this.postService.findAll(lim, set, uid);
      res.json(response.rows);
    } catch (error) {
      console.log("daha fazla post yüklenemedi");
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { body } = req.body;
      const jsonData = JSON.parse(body);
      await this.postService.create(
        HandleManager.strid(25),
        jsonData.uid,
        jsonData.view1,
        jsonData.description
      );
      res.json("Post Created");
    } catch (error) {
      console.log("post yaratilamadi");
    }
  }

  async hide(req: Request, res: Response): Promise<void> {
    try {
      const { postid, sender } = req.body;
      // await postService.hide(postid, sender);
      await this.postService.delete(postid, sender);
      res.json("Post Hidden");
    } catch (error) {
      console.log("post gizlenemedi");
    }
  }

  async save(req: Request, res: Response): Promise<void> {
    const { postid, sender } = req.body;
    try {
      await this.postService.sendSave(postid, sender, moment().format());
      res.json({ warn: "Post Saved" });
    } catch (error: any) {
      if (error.code == "23505") {
        this.postService.deleteSave(postid, sender);
        res.json({ warn: "Post Unsaved" });
      } else {
        console.log("post kaydedilemedi");
      }
    }
  }

  async likeSend(req: Request, res: Response): Promise<void> {
    const { postid, sender } = req.body;
    try {
      await this.postService.sendLike(postid, sender, moment().format());
      res.json({ warn: "Post Liked" });
    } catch (error: any) {
      if (error.code == "23505") {
        this.postService.deleteLike(postid, sender);
        res.json({ warn: "Post Unliked" });
      } else {
        console.log("post begenilemedi");
      }
    }
  }

  async likeList(req: Request, res: Response): Promise<void> {
    try {
      const { postid, lim, set } = req.body;
      const response = await this.postService.findLikes(postid, lim, set);
      res.json(response.rows);
    } catch (error) {
      console.log("post like listesi yuklenemedi");
    }
  }

  async commentSend(req: Request, res: Response): Promise<void> {
    try {
      const { postid, sender, comment } = req.body;
      await this.postService.sendComment(
        postid,
        sender,
        comment,
        moment().format()
      );
      res.json("Comment has been sent");
    } catch (error) {
      console.log("post yorumu gonderilemedi");
    }
  }

  async commentList(req: Request, res: Response): Promise<void> {
    try {
      const { lim, set, postid, myuid } = req.body;
      const response = await this.postService.findComments(
        lim,
        set,
        postid,
        myuid
      );
      res.json(response.rows);
    } catch (error) {
      console.log("post comment list yuklenemedi");
    }
  }
}

export default PostController;
