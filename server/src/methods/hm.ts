import moment from "moment";
import FM from "./fm.js";

class HM {
  static newFileName = (oldFileName: string) => {
    return (
      moment().format("MMMMDoYYYY") +
      "_" +
      HM.strid(13) +
      HM.extname(oldFileName)
    );
  };

  static extname = (fileName: string) => {
    if (fileName) {
      let extension = fileName.split(".").pop();
      if (extension) return extension;
    }
    return "extension";
  };

  static calcroom = (myfid: string, yourfid: string) => {
    const myint = parseInt(myfid);
    const yourint = parseInt(yourfid);
    if (myint - yourint > 0) return myfid + yourfid;
    else return yourfid + myfid;
  };

  static strid(length: number) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  static numberid(length: number) {
    let result = "";
    const characters = "0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  static dateid(length: number) {
    return moment().format("MMMMDoYYYY_h_mm_ss_a_") + HM.strid(length);
  }
}

export default HM;
