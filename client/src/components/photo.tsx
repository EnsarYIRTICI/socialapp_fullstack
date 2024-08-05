import { useContext } from "react";
import { RoofContextProps, RoofContext } from "../App";
import RyanDahl from "../config/RyanDahl";

function ShowPhoto({ userData }: any) {
  const roof: RoofContextProps | null = useContext(RoofContext);
  const { matches, themeIcons } = roof!;

  const responsive = {
    imageContainer: {
      height: matches ? 175 : 250,
      width: matches ? 175 : 250,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "1px solid white",
      borderRadius: 150,
      cursor: "pointer",
    } as React.CSSProperties,

    emptyImage: {
      height: matches ? 75 : 125,
      width: matches ? 75 : 125,
    } as React.CSSProperties,

    userImage: {
      height: matches ? 175 : 250,
      width: matches ? 175 : 250,
      borderRadius: "50%",
      objectFit: "cover",
    } as React.CSSProperties,
  };

  return (
    <div style={responsive.imageContainer}>
      <img
        style={userData.image ? responsive.userImage : responsive.emptyImage}
        src={
          userData.image
            ? RyanDahl.URL_USER_MEDIA + userData.uid + "/" + userData.image
            : themeIcons.nav_user
        }
      />
    </div>
  );
}

export default ShowPhoto;
