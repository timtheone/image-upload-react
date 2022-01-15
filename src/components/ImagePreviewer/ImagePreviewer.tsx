import { Dispatch, useState, useEffect, SetStateAction } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImagePreviewList from "./ImagePreviewList";
import PreviewObject from "../../types/PreviewObject";
import readFileAsDataUrl from "../../utils/readFileAsDataURL";
import "./ImagePreviewer.css";

type Props = {
  setIsUploading: Dispatch<SetStateAction<boolean>>;
  searchTerm: string;
  imageFiles: File[];
};

export default function ImagePreviewer({
  searchTerm,
  imageFiles,
  setIsUploading,
}: Props) {
  const [previewImages, setPreviewImages] = useState<PreviewObject[]>([]);

  const notify = () => toast("Success!");

  useEffect(() => {
    let previewed = true;
    if (imageFiles.length > 0) {
      let fileReaders: Promise<PreviewObject>[] = [];

      imageFiles.slice(0, imageFiles.length).forEach((image) => {
        fileReaders.push(readFileAsDataUrl(image, setIsUploading));
      });

      if (previewed) {
        Promise.all(fileReaders)
          .then((values) => {
            setPreviewImages(values);
            setIsUploading(false);
          })
          .then(() => notify());
      }
    }
    return () => {
      previewed = false;
    };
  }, [imageFiles, setIsUploading]);

  return (
    <>
      <ToastContainer toastClassName={"toast"} />
      <ImagePreviewList previewImages={previewImages} searchTerm={searchTerm} />
    </>
  );
}
