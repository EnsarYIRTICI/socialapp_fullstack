import { useContext, useEffect } from "react";
import { RoofContext, RoofContextProps } from "../App";
import { SafaryContext } from "../pages/Safary";
import PostService from "../services/PostService";
import Button from "../components/PostOptionButton";

function PostOptions() {
  const roof: RoofContextProps | null = useContext(RoofContext);
  const { theme, matches } = roof!;
  const authData = roof!.authData!;

  const { postOption, setPostOption }: any = useContext(SafaryContext);

  const isMyPost = postOption.sender === authData.uid ? true : false;

  const responsive = {
    main: {
      width: matches ? 300 : 500,
      backgroundColor: "#282c34",
    } as React.CSSProperties,
  };

  const deletePost = async () => {
    try {
      await PostService.deletePost(postOption.postid, authData.uid);
    } catch (error) {
      console.log(error);
    } finally {
      window.location.reload();
    }
  };

  return (
    <div style={responsive.main}>
      {isMyPost && <Button name={"Delete"} color={"red"} press={deletePost} />}
      <Button name={"Cancel"} press={() => setPostOption(null)} />
    </div>
  );
}

export default PostOptions;
