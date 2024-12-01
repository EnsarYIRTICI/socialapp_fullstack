import { Request, Response } from "express";
import moment from "moment";
import CommentService from "../service/comment.service.js";

class CommentController {
  commentService = new CommentService();

  async likeSend(req: Request, res: Response): Promise<void> {
    const { commentid, sender } = req.body;
    try {
      await this.commentService.sendLike(commentid, sender, moment().format());
      res.json("Comment Liked");
    } catch (error: any) {
      if (error.code == "23505") {
        await this.commentService.deleteLike(commentid, sender);
        res.json({ warn: "Comment Unliked" });
      } else {
        console.log("yorum begenilemedi");
      }
    }
  }
}

export default CommentController;
