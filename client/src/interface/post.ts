interface PostData {
  id: string;
  view1: string;
  view2: string;
  view3: string;
  view4: string;
  view5: string;
  description: string;
  location: string;
  sender_uid: string;
  creation_date: string;
  updated_date: string;
  visible: boolean;
  edited: boolean;

  liked: boolean;
  saved: boolean;

  likes_count: number;
  comments_count: number;

  username: string;
  image: string;
}

export default PostData;
