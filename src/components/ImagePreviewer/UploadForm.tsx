import { ChangeEvent, useRef, useState, Dispatch, SetStateAction } from "react";

type Props = {
  setImageFiles: Dispatch<SetStateAction<File[]>>;
  isUploading: boolean;
};

export default function UploadForm({ setImageFiles, isUploading }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  useState<number>(0);

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length) {
      let imagesArray = Array.from(files);
      /*
          although we set mime-type on the input element to accept only images,
          we still should check programmatically if type of the uploaded file is correct.
  
          I made a decision to invalidate the whole upload if at least one file would be of incorrec type.
          I could also still upload only valid files, but in my opinion the UX is worse for such process.
        */
      const invalidType = imagesArray.some((element) => {
        return element.type.substring(0, 5) !== "image";
      });
      if (!invalidType) {
        setImageFiles((prev) => prev.concat(imagesArray));
      }
    }
  };

  return (
    <form>
      <input
        data-testid="UploadForm"
        type="file"
        ref={inputRef}
        multiple
        onChange={handleUpload}
        accept="image/*"
        className="hidden"
        disabled={isUploading}
      />
      <button
        disabled={isUploading}
        className="px-5 py-2 w-40 bg-white text-blue-700 transition-colors duration-150 border-2 border-blue-700 rounded focus:shadow-outline hover:bg-blue-700 hover:text-white"
        onClick={(event) => {
          event.preventDefault();
          inputRef.current?.click();
        }}
      >
        {isUploading ? (
          <span className="flex">
            <svg viewBox="0 0 512 512" className="animate-spin w-5 mr-2">
              <path
                d="M460.116 373.846l-20.823-12.022c-5.541-3.199-7.54-10.159-4.663-15.874 30.137-59.886 28.343-131.652-5.386-189.946-33.641-58.394-94.896-95.833-161.827-99.676C261.028 55.961 256 50.751 256 44.352V20.309c0-6.904 5.808-12.337 12.703-11.982 83.556 4.306 160.163 50.864 202.11 123.677 42.063 72.696 44.079 162.316 6.031 236.832-3.14 6.148-10.75 8.461-16.728 5.01z"
                fill="currentColor"
              />
            </svg>
            Loading...
          </span>
        ) : (
          "Upload Images"
        )}
      </button>
    </form>
  );
}
