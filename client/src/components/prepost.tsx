import { useContext } from "react";
import { RoofContext, RoofContextProps } from "../App";
import { SafaryContext } from "../pages/Safary";
import RyanDahl from "../config/RyanDahl";
import PostData from "../interface/post";
import BrendanEich from "../services/BrendanEich";

interface PerPostProps {
  postData: PostData;
}

function PrePost({ postData }: PerPostProps) {
  const roof: RoofContextProps | null = useContext(RoofContext);
  const { theme, matches } = roof!;

  const { setGlobalPost }: any = useContext(SafaryContext);

  const mediaSource =
    RyanDahl.URL_POST_MEDIA + postData.sender_uid + "/" + postData.view1;

  const mediaType = BrendanEich.mimetypeByName(postData.view1);

  const responsive = {
    post: {
      width: matches ? "33.3vw" : 250,
      height: matches ? "33.3vw" : 250,
      objectFit: "cover",
      cursor: "pointer",
    } as React.CSSProperties,
  };

  const postComponent =
    mediaType === "video" ? (
      <video
        autoPlay={matches ? true : false}
        muted={true}
        loop={true}
        onClick={() => setGlobalPost(postData)}
        style={responsive.post}
        onMouseEnter={(e) => {
          e.currentTarget.style.filter = "brightness(75%)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.filter = "brightness(100%)";
        }}
      >
        <source src={mediaSource} />
      </video>
    ) : (
      <img
        onClick={() => setGlobalPost(postData)}
        onMouseEnter={(e) => {
          e.currentTarget.style.filter = "brightness(75%)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.filter = "brightness(100%)";
        }}
        style={responsive.post}
        src={mediaSource}
      />
    );

  return postComponent;
}

export default PrePost;
