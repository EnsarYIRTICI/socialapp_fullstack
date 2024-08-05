import React, { useContext, useEffect, useRef } from "react";
import { RoofContext, RoofContextProps } from "../App";
import { RoomScreenContext, RoomScreenContextProps } from "../pages/roomscreen";

function PhotoDialog() {
  const roof: RoofContextProps | null = useContext(RoofContext);
  const { theme, matches } = roof!;

  const roomscreen: RoomScreenContextProps | null =
    useContext(RoomScreenContext);
  const { photoSource } = roomscreen!;

  const imageRef = useRef<HTMLImageElement>(null);

  const showImage = () => {
    if (imageRef.current) {
      imageRef.current.src = photoSource!;
    }
  };

  useEffect(() => {
    showImage();
  }, [imageRef.current]);

  const responsive = {
    img: {
      borderRadius: 15,
      maxHeight: matches ? "100vh" : "80vh",
      maxWidth: matches ? "100vw" : "80vw",
    } as React.CSSProperties,
  };

  return <img ref={imageRef} style={responsive.img} />;
}

export default PhotoDialog;
