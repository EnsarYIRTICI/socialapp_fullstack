import axios from "axios";
import BrendanEich from "./BrendanEich";

class TimBernersLee {
  static CONTENT_TYPE_JSON = {
    "Content-Type": "application/json",
  };

  static CONTENT_TYPE_FORM = {
    "Content-Type": "multipart/form-data",
  };

  static async httpGet(url: string) {
    const response = await axios.get(url).catch((reason) => {
      if (reason.response) {
        let data = reason.response.data;
        if (data.error) {
          throw Error(data.error);
        }
      }
      throw Error(reason.message);
    });

    return response.data;
  }

  static async httpPost(url: string, body: object) {
    const response = await axios
      .post(url, JSON.stringify(body), {
        headers: TimBernersLee.CONTENT_TYPE_JSON,
      })
      .catch((reason) => {
        if (reason.response) {
          let data = reason.response.data;
          if (data.error) {
            throw Error(data.error);
          }
        }
        throw Error(reason.message);
      });

    return response.data;
  }

  static async axiosFormData(
    url: string,
    body: object,
    files: File[] | FileList,
    abortSignal: AbortSignal | undefined,
    progresser: Function | null
  ) {
    const formData = new FormData();
    formData.append("body", JSON.stringify(body));

    if (files) {
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        formData.append(i === 0 ? "file" : `file${i}`, file);
      }
    }

    const response = await axios
      .post(url, formData, {
        headers: TimBernersLee.CONTENT_TYPE_FORM,
        signal: abortSignal,
        onUploadProgress: (pe) => {
          if (progresser) progresser(BrendanEich.percent(pe) + "%");
        },
      })
      .catch((reason) => {
        if (reason.response) {
          let data = reason.response.data;
          if (data.error) {
            throw Error(data.error);
          }
        }
        throw Error(reason.message);
      });

    return response.data;
  }
}

export default TimBernersLee;
