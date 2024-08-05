import RyanDahl from "../config/RyanDahl";
import TimBernersLee from "../services/TimBernersLee";

class AuthService {
  static KEY_AUTH_DATA: string = "authData";

  static loginWithUsernameAndPassword = async (
    username: string,
    password: string
  ) => {
    return await TimBernersLee.httpPost(RyanDahl.API_AUTH_LOGIN, {
      username,
      password,
    });
  };

  static register = async (
    displayname: string,
    username: string,
    email: string,
    password: string
  ) => {
    return await TimBernersLee.httpPost(RyanDahl.API_AUTH_REGISTER, {
      displayname,
      username,
      email,
      password,
    });
  };
}

export default AuthService;
