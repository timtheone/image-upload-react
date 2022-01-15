import PreviewObject from "../../types/PreviewObject";
import useDebounce from "../../hooks/useDebounce";

type Props = {
  previewImages: Array<PreviewObject>;
  searchTerm: string;
};

export default function ImagePreviewList({ previewImages, searchTerm }: Props) {
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm, 250);

  return (
    <div className="flex flex-col mt-3">
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
