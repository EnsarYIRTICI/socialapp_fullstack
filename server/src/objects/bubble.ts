import { ObjectId } from "mongodb";

export class Bubble {
  _id: ObjectId;
  message: string;
  sender_uid: string;
  creation_date: string;
  visible: boolean;
  edited: boolean;
  file?: BubbleFile;

  constructor(
    _id: ObjectId,
    message: string,
    sender_uid: string,
    creation_date: string,
    visible: boolean,
    edited: boolean,
    file?: BubbleFile
  ) {
    this._id = _id;
    this.message = message;
    this.sender_uid = sender_uid;
    this.creation_date = creation_date;
    this.visible = visible;
    this.edited = edited;
    this.file = file;
  }
}

// export class Bubble {
//   message: string;
//   sender_uid: string;
//   creation_date: string;
//   visible: boolean;
//   edited: boolean;
//   file?: BubbleFile;

//   constructor(
//     message: string,
//     sender_uid: string,
//     creation_date: string,
//     visible: boolean,
//     edited: boolean,
//     file?: BubbleFile
//   ) {
//     this.message = message;
//     this.sender_uid = sender_uid;
//     this.creation_date = creation_date;
//     this.visible = visible;
//     this.edited = edited;
//     this.file = file;
//   }
// }

export class BubbleFile {
  top_name: string;
  file_name: string;
  extension: string;
  mimetype: string;
  size: number;

  constructor(
    top_name: string,
    file_name: string,
    extension: string,
    size: number,
    type: string
  ) {
    this.top_name = top_name;
    this.file_name = file_name;
    this.extension = extension;
    this.mimetype = type;
    this.size = size;
  }
}
