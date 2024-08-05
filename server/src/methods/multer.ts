import multer, { diskStorage } from "multer";
import FM from "./fm.js";

class Storage {
  static Post = multer({
    storage: diskStorage({
      destination: (req, file, callback) => {
        const { body } = req.body;
        const jsonData = JSON.parse(body);
        const path = FM.postsPath + jsonData.uid;
        FM.createFolderIfExist(path);
        callback(null, path);
      },
      filename: (req, file, callback) => {
        const { body } = req.body;
        const jsonData = JSON.parse(body);
        callback(null, jsonData.view1);
      },
    }),
  });

  static User = multer({
    storage: diskStorage({
      destination: (req, file, callback) => {
        const { body } = req.body;
        const jsonData = JSON.parse(body);
        const path = FM.usersPath + jsonData.uid;
        FM.createFolderIfExist(path);
        callback(null, path);
      },
      filename: (req, file, callback) => {
        const { body } = req.body;
        const jsonData = JSON.parse(body);
        callback(null, jsonData.image);
      },
    }),
  });
}

export default Storage;
