import { useContext, useEffect } from "react";
import { RoofContextProps, RoofContext } from "../App";
import { SafaryContext } from "../pages/Safary";
import StoryService from "../services/StoryService";
import Button from "../components/PostOptionButton";

function StoryOption() {
  const roof: RoofContextProps | null = useContext(RoofContext);
  const { theme, matches } = roof!;
  const authData = roof!.authData!;

  const { storyOption, setStoryOption }: any = useContext(SafaryContext);

  const isMyStory = storyOption.sender_uid === authData.uid ? true : false;

  const storyService = new StoryService();

  const responsive = {
    main: {
      width: matches ? 300 : 500,
      backgroundColor: "#282c34",
    } as React.CSSProperties,
  };

  const deleteStory = async () => {
    try {
      await storyService.hide(storyOption.story_id, authData.uid);
    } catch (error) {
      console.log(error);
    } finally {
      window.location.reload();
    }
  };

  return (
    <div style={responsive.main}>
      {isMyStory && (
        <Button name={"Delete"} color={"red"} press={deleteStory} />
      )}
      <Button name={"Cancel"} press={() => setStoryOption(null)} />
    </div>
  );
}

export default StoryOption;
