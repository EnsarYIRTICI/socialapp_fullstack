import { Request, Response } from "express";
import UserService from "../service/user.service.js";
import ProfileService from "../service/profile.service.js";
import FollowService from "../service/follow.service.js";
import moment from "moment";

class UserController {
  userService = new UserService();
  profileService = new ProfileService();
  followService = new FollowService();

  async profile(req: Request, res: Response): Promise<void> {
    try {
      const { myuid, unameoruid, lim, set } = req.body;
      const users = await this.profileService.findByUsernameOrUid(unameoruid);
      if (users.rows.length === 0) {
        res.status(404).send({
          error: "User not found",
        });
      } else {
        const userUid = users.rows[0].uid;
        const saveList = await this.profileService.saves(
          lim,
          set,
          userUid,
          myuid
        );
        const postList = await this.profileService.posts(
          lim,
          set,
          userUid,
          myuid
        );
        const followState = await this.profileService.followState(
          userUid,
          myuid
        );
        res.json({
          userView: users.rows[0],
          followState: followState.rows.length > 0 ? true : false,
          postList: postList.rows,
          saveList: saveList.rows,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async edit(req: Request, res: Response): Promise<void> {
    try {
      if (req.file) {
        const { body } = req.body;
        const jsonData = JSON.parse(body);

        await this.profileService.edit(
          jsonData.image,
          jsonData.displayname,
          jsonData.biography,
          jsonData.uid
        );
      } else {
        const { uid, biography, displayname, image } = req.body;
        await this.profileService.edit(image, displayname, biography, uid);
      }

      res.json({ warn: "Profile updated" });
    } catch (error) {
      console.log("profil güncellenemedi");
    }
  }

  async followSend(req: Request, res: Response): Promise<void> {
    const { myuid, youruid } = req.body;
    try {
      await this.followService.send(youruid, myuid, moment().format());
      res.json({ warn: "you started following" });
    } catch (error: any) {
      if (error.code == "23505") {
        await this.followService.delete(youruid, myuid);
        res.json({ warn: "you unfollowed" });
      } else {
        console.log("kullanici takip edilemedi");
      }
    }
  }

  async followList(req: Request, res: Response): Promise<void> {
    try {
      const { uid, type } = req.body;
      if (type == "Follows") {
        const response = await this.followService.findFollows(uid);
        res.json(response.rows);
      } else {
        const response = await this.followService.findFollowers(uid);
        res.json(response.rows);
      }
    } catch (error) {
      console.log("profil takip listesi yuklenemedi");
    }
  }
}

export default UserController;
