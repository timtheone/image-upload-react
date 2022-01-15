import { Dispatch, useState, useEffect, SetStateAction } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PreviewObject from "../../types/PreviewObject";
import readFileAsDataUrl from "../../utils/readFileAsDataURL";
import "./ImagePreviewList.css";
import useDebounce from "../../hooks/useDebounce";

type Props = {
  setIsUploading: Dispatch<SetStateAction<boolean>>;
  searchTerm: string;
  imageFiles: File[];
};

export default function ImagePreviewList({
  searchTerm,
  imageFiles,
  setIsUploading,
}: Props) {
  const [previewImages, setPreviewImages] = useState<PreviewObject[]>([]);
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm, 250);

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
    <div className="flex flex-col mt-3">
      <ToastContainer toastClassName={"toast"} />
      {previewImages.length > 0 && <p className="font-bold">Image previews:</p>}
      {previewImages
        .filter((value) => {
          if (debouncedSearchTerm !== "") {
            return value.name
              .toLocaleLowerCase()
              .includes(debouncedSearchTerm.toLocaleLowerCase());
          } else {
            return value;
          }
        })
        .map((previewImage, index) => (
          <div
            className="bg-white max-w-md drop-shadow-md p-2 mb-3 self-center"
            key={`${index}_${previewImage.lastModifiedTS}`}
          >
            <p className="mb-2">Name: {previewImage.name}</p>
            <img
              className="w-full"
              src={previewImage.src}
              alt={`${previewImage.name} description`}
            />
          </div>
        ))}
    </div>
  );
}
