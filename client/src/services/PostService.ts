import RyanDahl from "../config/RyanDahl";
import TimBernersLee from "../services/TimBernersLee";

class PostService {
  static create = async (
    file: File,
    uid: string,
    description: string,
    view1: string
  ) => {
    await TimBernersLee.axiosFormData(
      RyanDahl.API_POST_CREATE,
      { uid, description, view1 },
      [file],
      undefined,
      null
    );
  };

  static fetchPostsCount = async (uid: string) => {
    return await TimBernersLee.httpPost(RyanDahl.API_POST_COUNT, { uid });
  };

  static fetchPosts = async (lim: number, set: number, uid: string) => {
    return await TimBernersLee.httpPost(RyanDahl.API_POST_LAST, {
      lim,
      set,
      uid,
    });
  };

  static fetchMorePosts = async (lim: number, set: number, uid: string) => {
    return await TimBernersLee.httpPost(RyanDahl.API_POST_MORE, {
      lim,
      set,
      uid,
    });
  };

  static savePost = async (postid: string, sender: string) => {
    await TimBernersLee.httpPost(RyanDahl.API_POST_SAVE, {
      postid,
      sender,
    });
  };

  static likePost = async (postid: string, sender: string) => {
    await TimBernersLee.httpPost(RyanDahl.API_POST_LIKE_SEND, {
      postid,
      sender,
    });
  };

  static deletePost = async (postid: string, sender: string) => {
    await TimBernersLee.httpPost(RyanDahl.API_POST_HIDE, {
      postid,
      sender,
    });
  };

  static commentPost = async (
    postid: string,
    sender: string,
    comment: string
  ) => {
    await TimBernersLee.httpPost(RyanDahl.API_POST_COMMENT_SEND, {
      postid,
      sender,
      comment,
    });
  };

  static fetchComments = async (
    lim: number,
    set: number,
    postid: string,
    myuid: string
  ) => {
    return await TimBernersLee.httpPost(RyanDahl.API_POST_COMMENT_LIST, {
      lim,
      set,
      postid,
      myuid,
    });
  };

  static fetchLikes = async (lim: number, set: number, postid: string) => {
    return await TimBernersLee.httpPost(RyanDahl.API_POST_LIKE_LIST, {
      lim,
      set,
      postid,
    });
  };
}

export default PostService;
