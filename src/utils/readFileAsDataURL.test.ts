import readFileAsDataUrl from "./readFileAsDataURL";

describe("readFileAsDataURL", () => {
  const file = new File([new ArrayBuffer(1)], "file.jpg", {
    lastModified: 1642028336079,
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should resolve file as data URL", async () => {
    const readAsDataURLSpy = jest.spyOn(FileReader.prototype, "readAsDataURL");

    const content = await readFileAsDataUrl(file);

    expect(content).toMatchObject({
      lastModifiedTS: 1642028336079,
      name: "file.jpg",
      src: "data:application/octet-stream;base64,AA==",
    });
    expect(readAsDataURLSpy).toHaveBeenCalledTimes(1);
    expect(readAsDataURLSpy).toHaveBeenCalledWith(file);
  });
});
