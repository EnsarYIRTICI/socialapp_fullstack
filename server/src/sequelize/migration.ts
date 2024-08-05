import { Sequelize } from "sequelize";
import Columns from "./columns.js";
import NAMES from "./names.js";
import DB_CONFIG from "../config/db.js";

const PG: any = DB_CONFIG.PG;

const _sequelize = new Sequelize(PG.database, PG.user, PG.password, {
  host: PG.host,
  port: PG.port,
  dialect: "postgres",
  logging: false,
});

class Tables {
  Users = _sequelize.define(NAMES.USERS, Columns.Users, {
    timestamps: false,
  });

  Follows = _sequelize.define(NAMES.FOLLOWS, Columns.Follows, {
    timestamps: false,
  });

  Rooms = _sequelize.define(NAMES.ROOMS, Columns.Rooms, {
    timestamps: false,
  });

  Stories = _sequelize.define(NAMES.STORIES, Columns.Stories, {
    timestamps: false,
  });

  Story_Reads = _sequelize.define(NAMES.STORY_READS, Columns.Stories, {
    timestamps: false,
  });

  Posts = _sequelize.define(NAMES.POSTS, Columns.Posts, {
    timestamps: false,
  });

  Post_Saves = _sequelize.define(NAMES.POST_SAVES, Columns.Post_Saves, {
    timestamps: false,
  });

  Post_Likes = _sequelize.define(NAMES.POST_LIKES, Columns.Post_Likes, {
    timestamps: false,
  });

  Comments = _sequelize.define(NAMES.COMMENTS, Columns.Comments, {
    timestamps: false,
  });

  Comment_likes = _sequelize.define(
    NAMES.COMMENT_LIKES,
    Columns.Comment_Likes,
    {
      timestamps: false,
    }
  );

  Replies = _sequelize.define(NAMES.REPLIES, Columns.Replies, {
    timestamps: false,
  });

  Reply_Likes = _sequelize.define(NAMES.REPLY_LIKES, Columns.Reply_Likes, {
    timestamps: false,
  });

  Temporaries = _sequelize.define(NAMES.TEMPORARIES, Columns.Temporaries, {
    timestamps: false,
  });
}

export const tables = new Tables();

export const sequelize = _sequelize;
