import RyanDahl from "../config/RyanDahl";
import TimBernersLee from "../services/TimBernersLee";

class UserService {
  static userProfile = async (
    lim: number,
    set: number,
    myuid: string,
    unameoruid: string
  ) => {
    return await TimBernersLee.httpPost(RyanDahl.API_USER_PROFILE, {
      myuid,
      unameoruid,
      lim,
      set,
    });
  };

  static editProfile = async (
    uid: string,
    displayname: string,
    biography: string,
    image: string | null
  ) => {
    await TimBernersLee.httpPost(RyanDahl.API_USER_EDIT, {
      uid,
      displayname,
      biography,
      image,
    });
  };

  static editProfileWithImage = async (
    uid: string,
    displayname: string,
    biography: string,
    image: string | null,
    file: File
  ) => {
    await TimBernersLee.axiosFormData(
      RyanDahl.API_USER_EDIT,
      { uid, displayname, biography, image },
      [file],
      undefined,
      null
    );
  };

  static followUser = async (myuid: string, youruid: string) => {
    return await TimBernersLee.httpPost(RyanDahl.API_USER_FOLLOW_SEND, {
      myuid,
      youruid,
    });
  };

  static followList = async (uid: string, type: string) => {
    return await TimBernersLee.httpPost(RyanDahl.API_USER_FOLLOW_LIST, {
      uid,
      type,
    });
  };
}

export default UserService;
