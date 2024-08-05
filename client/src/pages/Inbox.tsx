import { Outlet } from "react-router-dom";
import RoomList from "../pages/roomlist";

function Inbox() {
  return (
    <>
      <RoomList />
      <Outlet />
    </>
  );
}

export default Inbox;
