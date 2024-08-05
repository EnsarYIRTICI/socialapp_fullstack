interface CommentData {
  id: string;
  postid: string;
  sender_uid: string;
  text: string;
  creation_date: string;
  updated_date: string;
  visible: boolean;
  edited: boolean;

  username: string;
  image: string;

  likes_count: number;
  replies_count: number;

  liked: boolean;
}

export default CommentData;
