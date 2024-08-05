import RyanDahl from "../config/RyanDahl";
import TimBernersLee from "../services/TimBernersLee";

class StoryService {
  findAll = async (uid: string, lim: number, set: number) => {
    return await TimBernersLee.httpPost(RyanDahl.API_STORY_LIST, {
      uid,
      lim,
      set,
    });
  };

  create = async (file: File, uid: string) => {
    await TimBernersLee.axiosFormData(
      RyanDahl.API_STORY_CREATE,
      {
        uid,
      },
      [file],
      undefined,
      null
    );
  };

  hide = async (story_id: number, sender_uid: string) => {
    await TimBernersLee.httpPost(RyanDahl.API_STORY_HIDE, {
      story_id,
      sender_uid,
    });
  };
}

export default StoryService;
