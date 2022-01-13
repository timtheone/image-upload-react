import { render, screen, waitFor } from "@testing-library/react";
import ImagePreviewList from "./ImagePreviewList";

const mockSetState = jest.fn();

const file = new File([new ArrayBuffer(1)], "test.png", {
  type: "image/png",
  lastModified: 1637750176438,
});

const file2 = new File([new ArrayBuffer(1)], "test2.png", {
  type: "image/png",
  lastModified: 1637750176431,
});

describe("ImagePreviewList", () => {
  test("renders a button for uploading images", async () => {
    render(
      <ImagePreviewList
        searchTerm=""
        imageFiles={[file, file2]}
        setIsUploading={mockSetState}
      />
    );

    await waitFor(() => {
      const imageElement = screen.getByAltText(/test.png description/i);
      expect(imageElement).toBeInTheDocument();
    });
  });

  test("does not render images when none loaded", async () => {
    render(
      <ImagePreviewList
        searchTerm=""
        imageFiles={[]}
        setIsUploading={mockSetState}
      />
    );
    const imageElement = screen.queryByAltText("test.png description");

    await waitFor(() => {
      expect(imageElement).toBeNull();
    });
  });
});
