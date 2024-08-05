import { IClient } from "peer";

class PeerController {
  peerUserList: string[] = [];

  onConnection = (client: IClient) => {
    this.peerUserList.push(client.getId());
  };

  onDisconnect = (client: IClient) => {
    let i = this.peerUserList.findIndex((value) => (value = client.getId()));
    this.peerUserList.splice(i, 1);
  };
}

export default PeerController;
