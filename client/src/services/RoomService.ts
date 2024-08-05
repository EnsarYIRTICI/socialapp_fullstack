import RyanDahl from "../config/RyanDahl";
import TimBernersLee from "../services/TimBernersLee";

class RoomService {
  static countAll = async (fid: string) => {
    return TimBernersLee.httpPost(RyanDahl.API_ROOM_COUNT, {
      fid,
    });
  };

  static findAll = async (fid: string, lim: number, set: number) => {
    return TimBernersLee.httpPost(RyanDahl.API_ROOM_LIST, {
      fid,
      lim,
      set,
    });
  };

  static findByFid = async (myfid: string, yourfid: string) => {
    return TimBernersLee.httpPost(RyanDahl.API_ROOM_FIND, { myfid, yourfid });
  };

  static search = (fid: string, lim: number, set: number, value: string) => {
    return TimBernersLee.httpPost(RyanDahl.API_ROOM_SEARCH, {
      fid,
      lim,
      set,
      value,
    });
  };
}

export default RoomService;
