import dotenv from "dotenv";

const envFile =
  process.env.NODE_ENV === "docker" ? ".env.docker" : ".env.development";

dotenv.config({ path: envFile });

class SERVER_CONFIG {
  static IPV4V1 = "192.168.1.111";
  static IPV4V2 = "172.20.10.2";

  static MODEM = "78.171.196.32";
  static LOCAL = "localhost";

  static SERVER_PORT: number = 5000;
  static SERVER_URL: string =
    "http://" + SERVER_CONFIG.IPV4V1 + ":" + SERVER_CONFIG.SERVER_PORT;

  static CLIENT_PORT: number = 3000;
  static CLIENT_URL: string =
    "http://" + SERVER_CONFIG.IPV4V1 + ":" + SERVER_CONFIG.CLIENT_PORT;
}

export default SERVER_CONFIG;
