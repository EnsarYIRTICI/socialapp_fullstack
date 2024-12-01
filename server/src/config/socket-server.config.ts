export const socket_server_config = {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 200,
  },
  path: "/socket/inbox",
  port: 7000,
};
