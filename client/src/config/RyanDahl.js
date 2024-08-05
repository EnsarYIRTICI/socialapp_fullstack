class RyanDahl {
  static HTTP = "http://";
  static HTTPS = "https://";

  static PROTOCOL = RyanDahl.HTTP;

  static IPV4V1 = "192.168.1.111";
  static IPV4V2 = "172.20.10.2";

  static IPV4 = RyanDahl.IPV4V1;
  static LOCAL = "localhost";
  static MODEM = "78.162.61.104";

  static HOST = RyanDahl.LOCAL;
  static MACHINE = RyanDahl.PROTOCOL + RyanDahl.HOST;

  //MAIN

  static MAIN_PORT = 5000;
  static MAIN_URL = RyanDahl.MACHINE + ":" + RyanDahl.MAIN_PORT;

  //SOCKET

  static SOCKET_PORT = 7000;
  static SOCKET_URL = RyanDahl.MACHINE + ":" + RyanDahl.SOCKET_PORT;
  static SOCKET_PATH_INBOX = "/socket/inbox";

  //PEER

  static PEER_PORT = 9000;
  static PEER_PATH = "/peer";

  //STATIC

  static URL_USER_MEDIA = RyanDahl.MAIN_URL + "/users/";
  static URL_POST_MEDIA = RyanDahl.MAIN_URL + "/posts/";
  static URL_ROOM_MEDIA = RyanDahl.MAIN_URL + "/rooms/";
  static URL_STORIES_MEDIA = RyanDahl.MAIN_URL + "/stories/";

  static URL_MEDIA_USER(uid, image) {
    return RyanDahl.MAIN_URL + "/users/" + uid + "/" + image;
  }

  //GET

  static API_BUBBLE_FILE_DOWNLOAD =
    RyanDahl.MAIN_URL + "/bubble/file/download/";

  //POST

  static API_USER_MEDIA = RyanDahl.MAIN_URL + "/users";
  static API_POST_MEDIA = RyanDahl.MAIN_URL + "/posts";
  static API_ROOM_MEDIA = RyanDahl.MAIN_URL + "/rooms";
  static API_STORIES_MEDIA = RyanDahl.MAIN_URL + "/stories";

  static API_STORY_LIST = RyanDahl.MAIN_URL + "/story/list";
  static API_STORY_CREATE = RyanDahl.MAIN_URL + "/story/create";
  static API_STORY_HIDE = RyanDahl.MAIN_URL + "/story/hide";

  static API_POST_COUNT = RyanDahl.MAIN_URL + "/post/count";
  static API_POST_LAST = RyanDahl.MAIN_URL + "/post/list";
  static API_POST_MORE = RyanDahl.MAIN_URL + "/post/list/more";
  static API_POST_CREATE = RyanDahl.MAIN_URL + "/post/create";
  static API_POST_HIDE = RyanDahl.MAIN_URL + "/post/hide";
  static API_POST_SAVE = RyanDahl.MAIN_URL + "/post/save";
  static API_POST_LIKE_SEND = RyanDahl.MAIN_URL + "/post/like/send";
  static API_POST_LIKE_LIST = RyanDahl.MAIN_URL + "/post/like/list";
  static API_POST_COMMENT_SEND = RyanDahl.MAIN_URL + "/post/comment/send";
  static API_POST_COMMENT_LIST = RyanDahl.MAIN_URL + "/post/comment/list";

  static API_COMMENT_LIKE_SEND = RyanDahl.MAIN_URL + "/comment/like/send";

  static API_ROOM_COUNT = RyanDahl.MAIN_URL + "/room/count";
  static API_ROOM_LIST = RyanDahl.MAIN_URL + "/room/list";
  static API_ROOM_FIND = RyanDahl.MAIN_URL + "/room/find";
  static API_ROOM_SEARCH = RyanDahl.MAIN_URL + "/room/search";

  static API_BUBBLE_LIST = RyanDahl.MAIN_URL + "/bubble/list";
  static API_BUBBLE_LIST_MORE = RyanDahl.MAIN_URL + "/bubble/list/more";
  static API_BUBBLE_COUNT = RyanDahl.MAIN_URL + "/bubble/count";
  static API_BUBBLE_SEND = RyanDahl.MAIN_URL + "/bubble/send";
  static API_BUBBLE_UPDATE = RyanDahl.MAIN_URL + "/bubble/update";
  static API_BUBBLE_SEND_FILE = RyanDahl.MAIN_URL + "/bubble/send/file";

  static API_USER_PROFILE = RyanDahl.MAIN_URL + "/user/profile";
  static API_USER_EDIT = RyanDahl.MAIN_URL + "/user/edit";
  static API_USER_FOLLOW_LIST = RyanDahl.MAIN_URL + "/user/follow/list";
  static API_USER_FOLLOW_SEND = RyanDahl.MAIN_URL + "/user/follow/send";
  static API_USER_SEARCH = RyanDahl.MAIN_URL + "/user/search";

  static API_AUTH_LOGIN = RyanDahl.MAIN_URL + "/auth/login";
  static API_AUTH_REGISTER = RyanDahl.MAIN_URL + "/auth/register";
  static API_AUTH_TEMPORARY = RyanDahl.MAIN_URL + "/auth/temporary";
  static API_AUTH_UPDATE_PASSWORD = RyanDahl.MAIN_URL + "/auth/update/password";
  static API_AUTH_MAIL_RESET_PASSWORD =
    RyanDahl.MAIN_URL + "/auth/mail/reset/password";
}

export default RyanDahl;
