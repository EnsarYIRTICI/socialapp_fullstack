import dotenv from "dotenv";

const envFile =
  process.env.NODE_ENV === "docker" ? ".env.docker" : ".env.development";

dotenv.config({ path: envFile });

class SERVER_CONFIG {
  static HTTP: string = "http://";
  static HTTPS: string = "https://";

  static PROTOCOL: string = SERVER_CONFIG.HTTP;

  static IPV4V1 = "192.168.1.111";
  static IPV4V2 = "172.20.10.2";

  static IPV4 = SERVER_CONFIG.IPV4V1;
  static LOCAL = "localhost";
  static MODEM = "78.171.196.32";

  static HOST = SERVER_CONFIG.IPV4;
  static MACHINE: string = SERVER_CONFIG.PROTOCOL + SERVER_CONFIG.HOST;

  static CLIENT_PORT: number = 3000;
  static CLIENT_URL: string =
    SERVER_CONFIG.MACHINE + ":" + SERVER_CONFIG.CLIENT_PORT;

  static MAIN_PORT: number = 5000;
  static MAIN_URL: string =
    SERVER_CONFIG.MACHINE + ":" + SERVER_CONFIG.MAIN_PORT;

  static SOCKET_PORT: number = 7000;
  static SOCKET_PATH_INBOX: string = "/socket/inbox";

  static PEER_PORT: number = 9000;
  static PEER_PATH: string = "/peer";

  static SOCKET_CORS: object = {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 200,
  };
}

export default SERVER_CONFIG;
