/**
 * name 根据色值获取ImageData
 */

import { color2RGB } from './color2RGB';

export const color2ImageData = (width = 1, height = 1, color, apha = 255) => {
  const rgb = color2RGB(color);

  const pixLen = width * height;

  const data = [];
  for (let i = 0; i < pixLen; i++) {
    data.push(...rgb);
    data.push(apha);
  }

  return new ImageData(new Uint8ClampedArray(data), width, height);
}