import { Request, Response } from "express";
import moment from "moment";
import AuthService from "../service/auth.service.js";
import HandleManager from "../methods/hm.js";
import { tables } from "../sequelize/migration.js";
import Mailer from "../methods/nodemailer.js";
import UserService from "../service/user.service.js";
import SERVER_CONFIG from "../config/config.js";

class AuthController {
  private authService: AuthService;
  private userService: UserService;

  constructor() {
    this.authService = new AuthService();
    this.userService = new UserService();
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;

      const response = await this.authService.signIn(username, password);

      if (response.rows.length > 0) {
        await this.authService.updateLoginDate(username, moment().format());

        res.json(response.rows[0]);
      } else {
        res.status(401).send({ error: "Username or password is incorrect" });
      }
    } catch (error) {
      console.log("\n--> Kullanici Giris Saglayamadi --> \n\n", error);

      res.status(401).send({
        error: "Something went wrong",
      });
    }
  }

  async register(req: Request, res: Response): Promise<void> {
    const uid = HandleManager.strid(25);
    const fid = HandleManager.numberid(15);
    try {
      const { displayname, username, email, password } = req.body;

      await this.authService.signUp(
        uid,
        fid,
        username,
        displayname,
        email,
        password,
        moment().format()
      );

      const response = await this.authService.signIn(username, password);

      res.json(response.rows[0]);
    } catch (error: any) {
      if (error.code == "23505") {
        let data = error.constraint.split("_")[1];
        res.status(401).send({
          error:
            data === "email"
              ? "Email Adress Already Taken"
              : data === "username"
              ? "Username Already Taken"
              : error.detail,
        });
      } else {
        this.authService.delete(uid);

        console.log("kullanici olusturulamadi");

        res.status(401).send({
          error: "Something went wrong",
        });
      }
    }
  }

  async temporary(req: Request, res: Response): Promise<void> {
    const { id } = req.body;

    let temporaryRecord = await tables.Temporaries.findOne({
      where: { id: id },
    });

    if (temporaryRecord) {
      const now = moment();
      const jsonData = temporaryRecord.toJSON();
      const targetDate = moment(jsonData.creation_date);
      const difference = now.diff(targetDate, "minutes");
      const differenceState = difference > 4;

      if (!jsonData.disable && !differenceState) {
        res.json(temporaryRecord);
      } else {
        res.status(404).send({ error: "Request timed out" });
      }
    } else {
      res.status(404).send({ error: "Key is incorrect" });
    }
  }

  async updatePassword(req: Request, res: Response): Promise<void> {
    try {
      const { id, uid, password } = req.body;

      let userRecord = await tables.Users.findOne({ where: { uid: uid } });

      if (userRecord) {
        await userRecord.update({
          password: password,
        });

        await tables.Temporaries.update(
          { disable: true },
          { where: { id: id } }
        );
      } else {
        res.status(404).send({ error: "User not found" });
      }

      res.json("Perfect");
    } catch (error) {
      console.log("sifre guncellenemedi");

      res.status(404).send({ error: "error" });
    }
  }

  async mailResetPassword(req: Request, res: Response): Promise<void> {
    const { email } = req.body;

    const user = await this.userService.findByEmail(email);

    if (user.rows.length > 0) {
      const KEY = HandleManager.strid(30);
      const uid = user.rows[0].uid;

      tables.Temporaries.update(
        { disable: true },
        { where: { sender_uid: uid } }
      );

      tables.Temporaries.create({
        id: KEY,
        sender_uid: uid,
        creation_date: moment().format(),
      });

      const URL = SERVER_CONFIG.CLIENT_URL + "/accounts/reset/password/" + KEY;

      const mailOptions = {
        from: Mailer.MAIL,
        to: email,
        subject: "SocialApp Password Reset",
        html: `
        <h3>Click here to reset password</h3>
        <a href="${URL}">Here</a>
        `,
      };

      Mailer.transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          res.send({ body: info.response });
        }
      });
    } else {
      res.status(401).send({ error: "User not found" });
    }
  }
}

export default AuthController;
