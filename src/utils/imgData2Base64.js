export const imgData2Base64 = (imgData) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = imgData.width;
  canvas.height = imgData.height;

  ctx.putImageData(imgData, 0, 0);

  return canvas.toDataURL();
}