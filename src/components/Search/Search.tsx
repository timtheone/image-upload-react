import { Dispatch, ChangeEvent, SetStateAction } from "react";

type Props = {
  setSearchTerm: Dispatch<SetStateAction<any>>;
};
export default function Search({ setSearchTerm }: Props) {
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  return (
    <form>
      <input
        type="text"
        placeholder="search images"
        onChange={handleSearch}
        className="border-blue-600"
      />
    </form>
  );
}
