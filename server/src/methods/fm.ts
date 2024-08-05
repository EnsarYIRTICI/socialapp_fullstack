import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

class FM {
  static __filename = fileURLToPath(import.meta.url);
  static __dirname = path.dirname(FM.__filename);
  static serverPath = path.join(FM.__dirname, "../../");

  static staticPath = FM.serverPath + "/uploads/";

  static usersPath = FM.staticPath + "/users/";
  static postsPath = FM.staticPath + "/posts/";
  static roomsPath = FM.staticPath + "/rooms/";
  static storiesPath = FM.staticPath + "/stories/";

  static createFolderIfExist(path: string) {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
  }

  static setupAppFolders() {
    if (!fs.existsSync(FM.staticPath)) {
      fs.mkdir(FM.staticPath, (err) => {
        if (err) return false;
      });
    }

    if (!fs.existsSync(FM.usersPath)) {
      fs.mkdir(FM.usersPath, (err) => {
        if (err) return false;
      });
    }

    if (!fs.existsSync(FM.roomsPath)) {
      fs.mkdir(FM.roomsPath, (err) => {
        if (err) return false;
      });
    }

    if (!fs.existsSync(FM.postsPath)) {
      fs.mkdir(FM.postsPath, (err) => {
        if (err) return false;
      });
    }

    if (!fs.existsSync(FM.storiesPath)) {
      fs.mkdir(FM.storiesPath, (err) => {
        if (err) return false;
      });
    }

    return true;
  }
}

export default FM;
