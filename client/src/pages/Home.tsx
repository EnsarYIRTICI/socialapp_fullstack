import { useContext, useEffect, useRef, useState } from "react";
import { RoofContext, RoofContextProps } from "../App";
import Post from "../components/post";
import DrawIcon from "../components/drawButton";
import PostService from "../services/PostService";
import PostData from "../interface/post";
import About from "../components/about";
import StoryService from "../services/StoryService";
import Story from "../components/story";
import { SafaryContext } from "../pages/Safary";

function Home() {
  const roof: RoofContextProps | null = useContext(RoofContext);
  const { theme, matches, colors } = roof!;
  const authData = roof!.authData!;

  const { setGlobalStory }: any = useContext(SafaryContext);

  const [postList, setPostList] = useState([] as PostData[]);
  const [storyList, setStoryList] = useState([] as never[]);

  const storyService = new StoryService();

  const responsive = {
    main: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      overflowY: "scroll",
      marginBottom: matches ? 90 : 0,
    } as React.CSSProperties,

    stories: {
      marginTop: 20,
      marginBottom: 20,
      minHeight: 90,
      width: matches ? "95vw" : 500,
      borderBottom: "1px solid",
      borderColor: colors.border,
      display: "flex",
      alignItems: "center",
    } as React.CSSProperties,

    appbar: {
      backgroundColor: colors.background,
      position: "sticky",
      top: 0,
      right: 0,
      width: "100%",
      minHeight: 65,
      borderBottom: "1px solid",
      borderColor: "#353a45",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      zIndex: 1,
    } as React.CSSProperties,
  };

  const appbarRef = useRef<HTMLDivElement>(null);

  const [prevScrollY, setPrevScrollY] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchStories();
    fetchPosts();
    fetchPostsCount();
  }, []);

  const handleScroll = (currentScrollY: number) => {
    if (currentScrollY > prevScrollY && currentScrollY > 0) hideBar();
    else showBar();
    setPrevScrollY(currentScrollY);
  };

  const hideBar = () => {
    if (appbarRef.current) {
      appbarRef.current.style.animation =
        "appbar-reverse 250ms normal forwards";
    }
  };
  const showBar = () => {
    if (appbarRef.current) {
      appbarRef.current.style.animation = "appbar 250ms normal forwards";
    }
  };

  const showStory = (index: number, storyList: never[]) => {
    setGlobalStory({
      index: index,
      storyList: storyList,
    });
  };

  const fetchStories = async () => {
    try {
      const jsonData: never[] = await storyService.findAll(authData.uid, 10, 0);
      setStoryList(groupStories(jsonData) as never);
    } catch (error) {
      console.log(error);
    }
  };

  const groupStories = (jsonData: never[]) => {
    const groupedStories: any[] = [];

    let senderUid: string;

    jsonData.forEach((story: any) => {
      senderUid = story.sender_uid;

      let group = groupedStories.find(
        (group) => group.sender_uid === senderUid
      );

      if (!group) {
        group = {
          sender_uid: story.sender_uid,
          username: story.username,
          image: story.image,
          stories: [],
        };
        groupedStories.push(group);
      }

      group.stories.push({
        creation_date: story.creation_date,
        media: story.media,
        story_id: story.story_id,
      });
    });

    const isHaveAnyStory = jsonData.find(
      (story: any) => story.sender_uid === authData.uid
    );

    if (!isHaveAnyStory) {
      groupedStories.push({
        sender_uid: authData.uid,
        username: authData.username,
        image: authData.image,
        stories: [],
      });
    }

    return groupedStories;
  };

  const fetchPosts = async () => {
    try {
      const jsonData = await PostService.fetchPosts(10, 0, authData.uid);
      setPostList(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPostsCount = async () => {
    try {
      const jsonData = await PostService.fetchPostsCount(authData.uid);
      setCount(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  const [observerState, setObserverState] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lastElement, setLastElement] = useState(null);

  useEffect(() => {
    fetchMorePosts();
  }, [observerState]);

  const fetchMorePosts = async () => {
    setLoading(true);
    if (postList.length < count) {
      const jsonData = await PostService.fetchMorePosts(
        10,
        postList.length,
        authData.uid
      );
      setPostList((old: any) => [...old, ...jsonData]);
    }
    setLoading(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((element) => {
        if (element.isIntersecting) {
          setObserverState((s) => s + 1);
        }
      });
    });

    if (lastElement) {
      observer.observe(lastElement);
    }

    return () => {
      if (lastElement) {
        observer.unobserve(lastElement);
      }
    };
  }, [lastElement]);

  const loadingComponent = (
    <div style={styles.loadingContainer}>
      <span
        style={styles.loading}
        id="loading"
        className="material-symbols-outlined"
      >
        progress_activity
      </span>
    </div>
  );

  return (
    <div
      className="hidebar"
      onScroll={(e) => matches && handleScroll(e.currentTarget.scrollTop)}
      style={responsive.main}
    >
      {matches && (
        <div ref={appbarRef} style={responsive.appbar}>
          <div style={styles.title}>Social App</div>

          {/* <DrawIcon name="bell" type=".png" /> */}
        </div>
      )}

      <div style={responsive.stories}>
        {storyList.map((story, i) => (
          <Story
            key={i}
            story={story}
            index={i}
            showStory={(index: number) => showStory(index, storyList)}
          />
        ))}
      </div>

      {postList.map((postData: PostData, i: number) => {
        return i === postList.length - 1 &&
          !loading &&
          postList.length < count ? (
          <Post ref={setLastElement} key={postData.id} postData={postData} />
        ) : (
          <Post key={postData.id} postData={postData} />
        );
      })}
      {loading && loadingComponent}
      <About />
    </div>
  );
}

export default Home;

const styles = {
  title: {
    marginLeft: 15,
    fontFamily: "Quicksand, sans-serif",
    fontSize: 25,
    color: "white",
    cursor: "pointer",
    userSelect: "none",
  } as React.CSSProperties,

  loadingContainer: {
    alignSelf: "center",
    padding: 25,
    width: 25,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  } as React.CSSProperties,

  loading: {
    height: 25,
    width: 25,
    fontSize: 25,
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    animation: "spin 500ms infinite linear",
  } as React.CSSProperties,
};
