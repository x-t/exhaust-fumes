const blobToBase64 = async (compressedFile: Blob): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(compressedFile);
    reader.onloadend = () => resolve(reader.result as string)
  });
}

export default blobToBase64;