/**
 * 克隆ImageData对象
 * @param imgData ImageData 源对象
 * return ImageData克隆对象
 */

export const clone = (imgData) => {
  const cloneImgData = new ImageData(imgData.width, imgData.height);
  cloneImgData.data.set(imgData.data);
  return cloneImgData;
};
  