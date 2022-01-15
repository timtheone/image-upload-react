import { useState } from "react";
import Search from "../components/Search/Search";
import ImagePreviewer from "../components/ImagePreviewer/ImagePreviewer";
import UploadForm from "../components/ImagePreviewer/UploadForm";

export default function Index() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  return (
    <div className="container mx-auto px-4">
      <div className="flex gap-4 flex-col justify-between xs:flex-row">
        <UploadForm isUploading={isUploading} setImageFiles={setImageFiles} />
        {imageFiles.length > 0 && <Search setSearchTerm={setSearchTerm} />}
      </div>
      <ImagePreviewer
        searchTerm={searchTerm}
        imageFiles={imageFiles}
        setIsUploading={setIsUploading}
      />
    </div>
  );
}
