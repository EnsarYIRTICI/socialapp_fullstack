import http from "http";
import express from "express";
import cors from "cors";

import { Server as SocketServer } from "socket.io";
import { PeerServer } from "peer";

import SERVER_CONFIG from "./config/config.js";

import mongo from "./db/mongo.js";

import { sequelize } from "./sequelize/migration.js";

import FileManager from "./methods/fm.js";
import Storage from "./methods/multer.js";
import Limiter from "./methods/slowdown.js";

import StoryController from "./controller/story.js";
import SocketController from "./controller/socket.js";
import PeerController from "./controller/peer.js";
import PostController from "./controller/post.js";
import CommentController from "./controller/comment.js";
import RoomController from "./controller/room.js";
import BubbleController from "./controller/bubble.js";
import UserController from "./controller/user.js";
import AuthController from "./controller/auth.js";
import FM from "./methods/fm.js";

const app = express();

const app2 = express();
const socketServer = http.createServer(app2);

app.enable("trust proxy");
app.use(cors());
app.use(express.json({ limit: 1024 * 1024 * 1 }));
app.use("/users", express.static(FileManager.usersPath));
app.use("/posts", express.static(FileManager.postsPath));
app.use("/rooms", express.static(FileManager.roomsPath));
app.use("/stories", express.static(FileManager.storiesPath));

const socketController = new SocketController();
const peerController = new PeerController();

const storyController = new StoryController();
const postController = new PostController();
const commentController = new CommentController();
const roomController = new RoomController();
const bubbleController = new BubbleController();
const userController = new UserController();
const authController = new AuthController();

const io = new SocketServer(socketServer, {
  cors: SERVER_CONFIG.SOCKET_CORS,
  path: SERVER_CONFIG.SOCKET_PATH_INBOX,
});

const peerServer = PeerServer({
  path: SERVER_CONFIG.PEER_PATH,
});

io.on("connection", (socket) => socketController.onConnection(socket));

peerServer.on("connection", (client) => peerController.onConnection(client));
peerServer.on("disconnect", (client) => peerController.onDisconnect(client));

app.post("/story/list", async (req, res) => storyController.list(req, res));
app.post("/story/create", async (req, res) => storyController.create(req, res));
app.post("/story/hide", async (req, res) => storyController.hide(req, res));

app.post("/post/count", async (req, res) => postController.count(req, res));
app.post("/post/list", async (req, res) => postController.list(req, res));
app.post("/post/list/more", Limiter.quarter, async (req, res) =>
  postController.listMore(req, res)
);
app.post("/post/create", Storage.Post.single("file"), async (req, res) =>
  postController.create(req, res)
);
app.post("/post/hide", async (req, res) => postController.hide(req, res));
app.post("/post/save", async (req, res) => postController.save(req, res));
app.post("/post/like/send", async (req, res) =>
  postController.likeSend(req, res)
);
app.post("/post/like/list", async (req, res) =>
  postController.likeList(req, res)
);
app.post("/post/comment/send", async (req, res) =>
  postController.commentSend(req, res)
);
app.post("/post/comment/list", async (req, res) =>
  postController.commentList(req, res)
);

app.post("/comment/like/send", async (req, res) =>
  commentController.likeSend(req, res)
);

app.post("/room/count", async (req, res) => roomController.count(req, res));
app.post("/room/list", async (req, res) => roomController.list(req, res));
app.post("/room/find", async (req, res) => roomController.find(req, res));
app.post("/room/search", async (req, res) => roomController.find(req, res));

app.post("/bubble/count", async (req, res) => bubbleController.count(req, res));
app.post("/bubble/list", async (req, res) => bubbleController.list(req, res));
app.post("/bubble/list/more", Limiter.room, async (req, res) =>
  bubbleController.listMore(req, res)
);
app.post("/bubble/send", async (req, res) => {
  bubbleController.send(req, res);
});
app.post("/bubble/update", async (req, res) =>
  bubbleController.update(req, res)
);
app.post("/bubble/send/file", async (req, res) =>
  bubbleController.sendFile(req, res)
);

app.post("/bubble/archive/download", (req, res) => {});

app.get("/bubble/file/download/:roomid/:top_name/:file_name", (req, res) =>
  bubbleController.bubbleFileDownload(req, res)
);

app.post("/user/profile", async (req, res) => userController.profile(req, res));
app.post("/user/edit", Storage.User.single("file"), async (req, res) =>
  userController.edit(req, res)
);
app.post("/user/follow/send", async (req, res) =>
  userController.followSend(req, res)
);
app.post("/user/follow/list", async (req, res) =>
  userController.followList(req, res)
);

app.post("/auth/login", async (req, res) => authController.login(req, res));
app.post("/auth/register", async (req, res) =>
  authController.register(req, res)
);
app.post("/auth/temporary", async (req, res) =>
  authController.temporary(req, res)
);
app.post("/auth/update/password", async (req, res) =>
  authController.updatePassword(req, res)
);
app.post("/auth/mail/reset/password", async (req, res) =>
  authController.mailResetPassword(req, res)
);

if (FM.setupAppFolders()) {
  console.log("--> Folders Created");

  sequelize
    .sync({ force: false, alter: true, logging: false })
    .then(() => console.log("--> Tables Updated"))
    .catch((err) => console.log(err))
    .then(() =>
      mongo
        .connect()
        .then(() => console.log("--> Connected MongoDB"))
        .catch((err) => console.log(err))
        .then(() => {
          socketServer.listen(SERVER_CONFIG.SOCKET_PORT, () =>
            console.log(
              `--> Socket Server has started on port ${SERVER_CONFIG.SOCKET_PORT}`
            )
          );
          app.listen(SERVER_CONFIG.MAIN_PORT, () =>
            console.log(
              `--> Main Server has started on port ${SERVER_CONFIG.MAIN_PORT}`
            )
          );
        })
    );
}
