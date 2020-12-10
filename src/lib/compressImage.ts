import imageCompression from "browser-image-compression";
import blobToBase64 from "./blobToBase64";

const compressImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const imageFile = event.target.files![0];

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true
  }

  try {
    const compressedFile = await imageCompression(imageFile, options);
    const compressedFileB64 = await blobToBase64(compressedFile);
    return compressedFileB64;
  } catch (error) {
    console.error(error);
  }
}

export default compressImage;