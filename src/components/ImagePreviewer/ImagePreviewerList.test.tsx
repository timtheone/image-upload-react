import { render, screen, waitFor } from "@testing-library/react";
import ImagePreviewList from "./ImagePreviewList";
import PreviewObject from "../../types/PreviewObject";

const file: PreviewObject = {
  lastModifiedTS: 1637750176438,
  src: "data:xml/test",
  name: "test_name1",
};

const file2: PreviewObject = {
  lastModifiedTS: 1637750176431,
  src: "data:xml/test2",
  name: "test_name2",
};

describe("ImagePreviewList", () => {
  test("renders preview Images", async () => {
    render(<ImagePreviewList searchTerm="" previewImages={[file, file2]} />);

    await waitFor(() => {
      const imageElement = screen.getByAltText(/test_name1 description/i);
      expect(imageElement).toBeInTheDocument();
    });
  });

  test("does not render images when none loaded", async () => {
    render(<ImagePreviewList searchTerm="" previewImages={[]} />);
    const imageElement = screen.queryByAltText("test_name1 description");

    await waitFor(() => {
      expect(imageElement).toBeNull();
    });
  });
});
