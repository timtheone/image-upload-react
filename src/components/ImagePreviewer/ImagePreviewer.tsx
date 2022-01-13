import { useState } from "react";
import UploadForm from "./UploadForm";
import ImagePreviewList from "./ImagePreviewList";
import Search from "./Search";

export default function ImagePreviewer() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between">
        <UploadForm isUploading={isUploading} setImageFiles={setImageFiles} />
        {imageFiles.length > 0 && <Search setSearchTerm={setSearchTerm} />}
      </div>
      <ImagePreviewList
        searchTerm={searchTerm}
        imageFiles={imageFiles}
        setIsUploading={setIsUploading}
      />
    </div>
  );
}
