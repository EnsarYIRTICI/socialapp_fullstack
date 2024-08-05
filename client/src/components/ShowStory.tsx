import { CSSProperties, useContext, useEffect, useState } from "react";
import { SafaryContext } from "../pages/Safary";
import RyanDahl from "../config/RyanDahl";
import StoryGroup from "../components/storygroup";

function ShowStory() {
  const { globalStory, setGlobalStory }: any = useContext(SafaryContext);

  const storyGroups = globalStory.storyList;
  const selectedIndex: number = globalStory.index;

  const [groupIndex, setGroupIndex] = useState(selectedIndex);

  const nextGroup = () => {
    setGroupIndex((prevIndex) => {
      let group = storyGroups[prevIndex + 1];
      if (group) {
        if (group.stories.length > 0) {
          return prevIndex + 1;
        }
      }
      setGlobalStory(null);
      return 0;
    });
  };

  const prevGroup = () => {
    setGroupIndex((prevIndex) => {
      let group = storyGroups[prevIndex - 1];
      if (group) {
        if (group.stories.length > 0) {
          return prevIndex - 1;
        }
      }
      setGlobalStory(null);
      return 0;
    });
  };

  return (
    <div style={styles.main}>
      <StoryGroup
        group={storyGroups[groupIndex]}
        nextGroup={nextGroup}
        prevGroup={prevGroup}
      />
    </div>
  );
}

export default ShowStory;

const styles = {
  main: {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as CSSProperties,
};
