import { CSSProperties, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RoofContext, RoofContextProps } from "../App";
import RoomScreen from "./roomscreen";
import { SafaryContext } from "../pages/Safary";
import RoomService from "../services/RoomService";
import UserData from "../interface/user";
import RoomPageSkeleton from "./RoomPageSkeleton";

export type RoomScreenProps = {
  roomid: string;
  userData: UserData;
  ID_F: string;
};

export function RoomFinder() {
  const roof: RoofContextProps | null = useContext(RoofContext);
  const authData = roof!.authData!;

  const { ID_F, setID_F }: any = useContext(SafaryContext);

  const [roomData, setRoomData]: any = useState<RoomScreenProps | null>(null);

  const navigate = useNavigate();

  const findRoom = async () => {
    if (authData.fid == ID_F) {
      navigate("/inbox");
    } else if (ID_F == null) {
      setID_F(localStorage.getItem("ID_F"));
    } else {
      setRoomData(null);
      const jsonData = await RoomService.findByFid(authData.fid, ID_F);
      localStorage.setItem("ID_F", ID_F);
      setRoomData(jsonData);
    }
  };

  useEffect(() => {
    findRoom();
  }, [ID_F]);

  const component = roomData ? (
    <RoomScreen
      roomid={roomData.roomid}
      userData={roomData.userData}
      ID_F={ID_F}
    />
  ) : (
    <RoomPageSkeleton />
  );

  return component;
}
