import http from "http";
import express from "express";
import cors from "cors";

import SERVER_CONFIG from "./config/config.js";

import { Server as SocketServer } from "socket.io";
import { PeerServer } from "peer";

import mongo from "./db/mongo.js";
import { sequelize } from "./sequelize/migration.js";

import FileManager from "./methods/fm.js";
import Storage from "./methods/multer.js";
import Limiter from "./methods/slowdown.js";

import StoryController from "./controller/story.controller.js";
import SocketController from "./controller/socket.controller.js";
import PeerController from "./controller/peer.controller.js";
import PostController from "./controller/post.controller.js";
import CommentController from "./controller/comment.controller.js";
import RoomController from "./controller/room.controller.js";
import BubbleController from "./controller/bubble.controller.js";
import UserController from "./controller/user.controller.js";
import AuthController from "./controller/auth.controller.js";

import FM from "./methods/fm.js";

import { peer_server_config } from "./config/peer-server.config.js";
import { socket_server_config } from "./config/socket-server.config.js";

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

const io = new SocketServer(socketServer, socket_server_config);

const peerServer = PeerServer(peer_server_config);

io.on("connection", socketController.onConnection.bind(socketController));

peerServer.on("connection", peerController.onConnection.bind(peerController));
peerServer.on("disconnect", peerController.onDisconnect.bind(peerController));

app.post("/story/list", storyController.list.bind(storyController));
app.post("/story/create", storyController.create.bind(storyController));
app.post("/story/hide", storyController.hide.bind(storyController));

app.post("/post/count", postController.count.bind(postController));
app.post("/post/list", postController.list.bind(postController));
app.post(
  "/post/list/more",
  Limiter.quarter,
  postController.listMore.bind(postController)
);
app.post(
  "/post/create",
  Storage.Post.single("file"),
  postController.create.bind(postController)
);
app.post("/post/hide", postController.hide.bind(postController));
app.post("/post/save", postController.save.bind(postController));
app.post("/post/like/send", postController.likeSend.bind(postController));
app.post("/post/like/list", postController.likeList.bind(postController));
app.post("/post/comment/send", postController.commentSend.bind(postController));
app.post("/post/comment/list", postController.commentList.bind(postController));

app.post(
  "/comment/like/send",
  commentController.likeSend.bind(commentController)
);

app.post("/room/count", roomController.count.bind(roomController));
app.post("/room/list", roomController.list.bind(roomController));
app.post("/room/find", roomController.find.bind(roomController));
app.post("/room/search", roomController.search.bind(roomController));

app.post("/bubble/count", (req, res) =>
  bubbleController.count.bind(bubbleController)(req, res)
);
app.post("/bubble/list", (req, res) =>
  bubbleController.list.bind(bubbleController)(req, res)
);
app.post(
  "/bubble/list/more",
  Limiter.room,
  bubbleController.listMore.bind(bubbleController)
);
app.post("/bubble/send", bubbleController.send.bind(bubbleController));
app.post("/bubble/update", bubbleController.update.bind(bubbleController));
app.post("/bubble/send/file", bubbleController.sendFile.bind(bubbleController));
app.get(
  "/bubble/file/download/:roomid/:top_name/:file_name",
  bubbleController.bubbleFileDownload.bind(bubbleController)
);

app.post("/user/profile", userController.profile.bind(userController));
app.post(
  "/user/edit",
  Storage.User.single("file"),
  userController.edit.bind(userController)
);
app.post("/user/follow/send", userController.followSend.bind(userController));
app.post("/user/follow/list", userController.followList.bind(userController));

app.post("/auth/login", authController.login.bind(authController));
app.post("/auth/register", authController.register.bind(authController));
app.post("/auth/temporary", authController.temporary.bind(authController));
app.post(
  "/auth/update/password",
  authController.updatePassword.bind(authController)
);
app.post(
  "/auth/mail/reset/password",
  authController.mailResetPassword.bind(authController)
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
          socketServer.listen(socket_server_config.port, () =>
            console.log(
              `--> Socket Server has started on port ${socket_server_config.port}`
            )
          );
          app.listen(SERVER_CONFIG.SERVER_PORT, () =>
            console.log(
              `--> Main Server has started on port ${SERVER_CONFIG.SERVER_PORT}`
            )
          );
        })
    );
}
