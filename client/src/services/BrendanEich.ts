import moment from "moment";

class BrendanEich {
  static imageMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/bmp",
    "image/webp",
    "image/svg+xml",
    "image/x-icon",
    "image/tiff",
    "image/heic",
    "image/avif",
  ];

  static videoMimeTypes = [
    "video/mp4",
    "video/webm",
    "video/ogg",
    "video/x-msvideo",
    "video/mpeg",
    "video/quicktime",
    "video/3gpp",
    "video/3gpp2",
    "video/x-ms-wmv",
  ];

  static imageExtensions = [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "bmp",
    "webp",
    "svg",
    "ico",
    "tiff",
    "tif",
    "heic",
    "avif",
  ];

  static videoExtensions = [
    "mp4",
    "webm",
    "ogg",
    "avi",
    "mov",
    "mkv",
    "flv",
    "wmv",
    "m4v",
    "3gp",
    "3g2",
  ];

  static percent(e: any) {
    return Math.round((e.loaded * 100) / e.total);
  }

  static istextclear = (str: string) => {
    for (var i = 0; i < str.length; i++) {
      if (str[i] !== " ") return true;
    }
    return false;
  };

  static cleartext = (value: string) => {
    return value.trim().replace(/\s+/g, " ");
  };

  static timebased = (name: string) => {
    return (
      moment().format("MMMMDoYYYYhmmssa") +
      BrendanEich.strid(5) +
      BrendanEich.extname(name)
    );
  };

  static unitname(bytes: number) {
    if (bytes) {
      const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

      if (bytes === 0) return "0 Byte";

      const i = parseInt(
        Math.floor(Math.log(bytes) / Math.log(1024)).toString()
      );

      if (i <= 2) {
        return (
          Math.round(100 * (bytes / Math.pow(1024, i))) / 100 + " " + sizes[i]
        );
      } else {
        return (
          Math.round(100 * (bytes / Math.pow(1024, i))) / 100 + " " + sizes[i]
        );
      }
    }

    return "0 Byte";
  }

  static extname = (fileName: string) => {
    if (fileName) {
      let extension = fileName.split(".").pop();
      if (extension) return extension;
    }
    return "extension";
  };

  static shortname = (fileName: string) => {
    if (fileName) {
      if (fileName.length > 47) {
        let extension = BrendanEich.extname(fileName);
        return fileName.substring(0, 47) + "..." + extension;
      }
      return fileName;
    }
    return "file";
  };

  static strid(length: number) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  static mimetype = (type: string) => {
    if (BrendanEich.imageMimeTypes.includes(type)) {
      return "image";
    } else if (BrendanEich.videoMimeTypes.includes(type)) {
      return "video";
    }
    return "file";
  };

  static mimetypeByName = (fileName: string) => {
    let extension = BrendanEich.extname(fileName);
    if (BrendanEich.imageExtensions.includes(extension)) {
      return "image";
    } else if (BrendanEich.videoExtensions.includes(extension)) {
      return "video";
    }
    return "file";
  };

  static validateEmail = (email: string) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  static validatePassword(password: string) {
    let upper = /[A-Z]/;
    var lower = /[a-z]/;
    var number = /[0-9]/;

    if (upper.test(password) && lower.test(password) && number.test(password)) {
      return true;
    } else {
      return false;
    }
  }

  static validateSpecial = (value: string) => {
    let special = /[^A-Za-z0-9]/;

    if (!special.test(value)) {
      return true;
    } else {
      return false;
    }
  };

  static resizedImageFile = async (file: File, targetWidth: 854 | 640) => {
    const image = await BrendanEich.fileToImageElement(file);
    const dataUrl = BrendanEich.resizedImageDataURL(image, targetWidth);
    return BrendanEich.fileFromDataURL(dataUrl, file.name);
  };

  static fileToImageElement = async (file: File): Promise<HTMLImageElement> => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const imageUrl = URL.createObjectURL(file);
      const image = new Image();
      image.onload = () => {
        resolve(image);
      };
      image.onerror = () => {
        reject(new Error("Some Error"));
      };
      image.src = imageUrl;
    });
  };

  static resizedImageDataURL = (
    image: HTMLImageElement,
    targetWidth: number
  ) => {
    const targetHeight = targetWidth * (image.height / image.width);
    const canvas = document.createElement("canvas");
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(image, 0, 0, targetWidth, targetHeight);
    }
    return canvas.toDataURL("image/jpeg", 1.0);
  };

  static fileFromDataURL = (url: string, fileName: string) => {
    const byteString = atob(url.split(",")[1]);
    const mimeString = url.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    const file = new File([blob], fileName, {
      type: mimeString,
    });
    return file;
  };
}

export default BrendanEich;
