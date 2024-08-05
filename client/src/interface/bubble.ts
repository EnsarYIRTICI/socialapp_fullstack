import BubbleFile from "./bubblefile";

interface BubbleData {
  _id: string;
  message: string;
  sender_uid: string;
  creation_date: string;
  visible: boolean;
  edited: boolean;
  file: BubbleFile | null;
}

export default BubbleData;
