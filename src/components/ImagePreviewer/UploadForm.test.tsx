import { render, screen } from "@testing-library/react";
import UploadForm from "./UploadForm";

const mockSetState = jest.fn();

describe("UploadForm test", () => {
  test("renders a button for uploading images", () => {
    render(<UploadForm setImageFiles={mockSetState} isUploading={false} />);
    const buttonElement = screen.getByText(/Upload Images/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test("shows loading message when uploading images", () => {
    render(<UploadForm setImageFiles={mockSetState} isUploading={true} />);
    const buttonElement = screen.getByText(/Loading.../i);
    expect(buttonElement).toBeInTheDocument();
  });

  test("that input field exists", () => {
    render(<UploadForm setImageFiles={mockSetState} isUploading={false} />);
    const buttonElement = screen.getByTestId("UploadForm");
    expect(buttonElement).toBeInTheDocument();
  });
});
