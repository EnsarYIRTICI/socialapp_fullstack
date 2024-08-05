import RyanDahl from "../config/RyanDahl";
import TimBernersLee from "../services/TimBernersLee";

class CommentService {
  static sendLike = async (commentid: string, sender: string) => {
    return TimBernersLee.httpPost(RyanDahl.API_COMMENT_LIKE_SEND, {
      commentid,
      sender,
    });
  };
}

export default CommentService;
