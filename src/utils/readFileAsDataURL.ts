import { Dispatch, SetStateAction } from "react";
import PreviewObject from "../types/PreviewObject";

export default function readFileAsDataUrl(
  file: File,
  setIsUploading?: Dispatch<SetStateAction<boolean>>
): Promise<PreviewObject> {
  return new Promise(function (resolve, reject) {
    let fileReader = new FileReader();

    fileReader.onload = () => {
      let resultObject: any = {
        src: fileReader.result,
        lastModifiedTS: file.lastModified,
        name: file.name,
      };
      resolve(resultObject);
    };

    if (setIsUploading) {
      fileReader.onprogress = () => {
        setIsUploading(true);
      };
    }

    fileReader.onerror = () => {
      reject(fileReader);
    };

    fileReader.readAsDataURL(file);
  });
}
