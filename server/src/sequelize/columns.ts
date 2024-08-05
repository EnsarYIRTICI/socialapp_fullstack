import { DataTypes, literal } from "sequelize";

class Columns {
  static Users = {
    uid: {
      primaryKey: true,
      type: DataTypes.STRING,
    },
    fid: {
      type: DataTypes.STRING,
    },
    private: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    phonenumber: {
      type: DataTypes.STRING,
      unique: true,
    },
    countrycode: { type: DataTypes.INTEGER },
    image: {
      type: DataTypes.STRING,
    },
    displayname: {
      type: DataTypes.STRING,
    },
    biography: {
      type: DataTypes.STRING,
      defaultValue: "hey there i use social app too",
    },
    title: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
    adress: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.STRING,
    },
    dateofbirth: {
      type: DataTypes.DATE,
    },
    dateoflogin: {
      type: DataTypes.DATE,
    },
    dateofregister: {
      type: DataTypes.DATE,
      defaultValue: literal("CURRENT_TIMESTAMP"),
    },
  };

  static Follows = {
    id: {
      primaryKey: true,
      type: DataTypes.STRING,
    },
    followed_uid: {
      type: DataTypes.STRING,
    },
    follower_uid: {
      type: DataTypes.STRING,
    },
    creation_date: {
      type: DataTypes.DATE,
      defaultValue: literal("CURRENT_TIMESTAMP"),
    },
  };

  static Rooms = {
    id: {
      primaryKey: true,
      type: DataTypes.STRING(30),
    },
    first_fid: {
      type: DataTypes.STRING(15),
    },
    second_fid: {
      type: DataTypes.STRING(15),
    },
    sender_uid: {
      type: DataTypes.STRING(25),
    },
    displaymessage: {
      type: DataTypes.STRING(100),
    },
    visible: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    updated_date: {
      type: DataTypes.DATE,
    },
    creation_date: {
      type: DataTypes.DATE,
      defaultValue: literal("CURRENT_TIMESTAMP"),
    },
  };

  static Stories = {
    story_id: {
      type: DataTypes.STRING(25),
      primaryKey: true,
      allowNull: false,
    },
    media: {
      type: DataTypes.STRING,
    },
    sender_uid: {
      type: DataTypes.STRING(50),
    },
    visible: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    creation_date: {
      type: DataTypes.DATE,
      defaultValue: literal("CURRENT_TIMESTAMP"),
    },
  };

  static Story_Reads = {
    story_reads_id: {
      type: DataTypes.STRING(25),
      primaryKey: true,
      allowNull: false,
    },
    story_id: {
      type: DataTypes.STRING(25),
    },
    sender_uid: {
      type: DataTypes.STRING(50),
    },
    creation_date: {
      type: DataTypes.DATE,
      defaultValue: literal("CURRENT_TIMESTAMP"),
    },
  };

  static Posts = {
    id: {
      type: DataTypes.STRING(25),
      primaryKey: true,
      allowNull: false,
    },
    view1: {
      type: DataTypes.STRING,
    },
    view2: {
      type: DataTypes.STRING,
    },
    view3: {
      type: DataTypes.STRING,
    },
    view4: {
      type: DataTypes.STRING,
    },
    view5: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING(150),
    },
    sender_uid: {
      type: DataTypes.STRING(50),
    },
    visible: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    edited: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    updated_date: {
      type: DataTypes.DATE,
    },
    creation_date: {
      type: DataTypes.DATE,
      defaultValue: literal("CURRENT_TIMESTAMP"),
    },
  };

  static Post_Likes = {
    id: {
      type: DataTypes.STRING(255),
      primaryKey: true,
    },
    post_id: {
      type: DataTypes.STRING(25),
    },
    sender_uid: {
      type: DataTypes.STRING(50),
    },
    creation_date: {
      type: DataTypes.DATE,
      defaultValue: literal("CURRENT_TIMESTAMP"),
    },
  };

  static Post_Saves = {
    id: {
      type: DataTypes.STRING(255),
      primaryKey: true,
    },
    post_id: {
      type: DataTypes.STRING(25),
    },
    sender_uid: {
      type: DataTypes.STRING(50),
    },
    creation_date: {
      type: DataTypes.DATE,
      defaultValue: literal("CURRENT_TIMESTAMP"),
    },
  };

  static Comments = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    post_id: {
      type: DataTypes.STRING(25),
    },
    sender_uid: {
      type: DataTypes.STRING(50),
    },
    text: {
      type: DataTypes.STRING(500),
    },
    visible: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    edited: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    updated_date: {
      type: DataTypes.DATE,
    },
    creation_date: {
      type: DataTypes.DATE,
      defaultValue: literal("CURRENT_TIMESTAMP"),
    },
  };

  static Comment_Likes = {
    id: {
      type: DataTypes.STRING(255),
      primaryKey: true,
    },
    commentid: {
      type: DataTypes.INTEGER,
    },
    sender_uid: {
      type: DataTypes.STRING,
    },
    creation_date: {
      type: DataTypes.DATE,
      defaultValue: literal("CURRENT_TIMESTAMP"),
    },
  };

  static Replies = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    commentid: {
      type: DataTypes.INTEGER,
    },
    sender_uid: {
      type: DataTypes.STRING(50),
    },
    text: {
      type: DataTypes.STRING(500),
    },
    visible: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    creation_date: {
      type: DataTypes.DATE,
      defaultValue: literal("CURRENT_TIMESTAMP"),
    },
  };

  static Reply_Likes = {
    id: {
      type: DataTypes.STRING(255),
      primaryKey: true,
    },
    replyid: {
      type: DataTypes.INTEGER,
    },
    sender_uid: {
      type: DataTypes.STRING(50),
    },
    creation_date: {
      type: DataTypes.DATE,
      defaultValue: literal("CURRENT_TIMESTAMP"),
    },
  };

  static Temporaries = {
    id: {
      primaryKey: true,
      type: DataTypes.STRING,
    },
    sender_uid: {
      type: DataTypes.STRING,
    },
    disable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    creation_date: {
      type: DataTypes.DATE,
      defaultValue: literal("CURRENT_TIMESTAMP"),
    },
  };
}

export default Columns;
