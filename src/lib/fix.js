/**
 * name psLib 滤镜
 */

import {
  borderline,
  corrode,
  darkCorner,
  dotted,
  embossment,
  gaussBlur,
  ImageEnhance,
  mosaic,
  noise,
  oilPainting,
  posterize,
  sepia,
  sharp,
  toGray,
  toReverse,
  toThresh
} from './filters';
/**
 * 调整变幻
 */

import {
  brightness,
  curve,
  gamma,
  selectiveColor,
  setHSI
} from './alters';

export const fix = (imgData, funcName, ...args) => {
  switch(funcName) {
    case '查找边缘':
    case 'borderline':
      return borderline(imgData, ...args);

    case '腐蚀':
    case 'corrode':
      return corrode(imgData, ...args);

    case '暗角':
    case 'darkCorner':
      return darkCorner(imgData, ...args);

    case '喷点':
    case 'dotted':
      return dotted(imgData, ...args);

    case '浮雕效果':
    case 'embossment':
      return embossment(imgData, ...args);

    case '高斯模糊':
    case 'gaussBlur':
      return gaussBlur(imgData, ...args);

    // 未使用
    case '灰度扩展':
    case 'ImageEnhance':
      return ImageEnhance(imgData, ...args);
      
    case '马赛克':
    case 'mosaic':
      return mosaic(imgData, ...args);
    
    case '添加杂色':
    case 'noise':
      return noise(imgData, ...args);
    
    case '油画':
    case 'oilPainting':
      return oilPainting(imgData, ...args);
  
    case '色调分离':
    case 'posterize':
      return posterize(imgData, ...args);

    case '棕褐色':
    case 'sepia':
      return sepia(imgData, ...args);

    case '锐化':
    case 'sharp':
      return sharp(imgData, ...args);

    case '灰度处理':
    case 'toGray':
      return toGray(imgData, ...args);

    case '反色':
    case 'toReverse':
      return toReverse(imgData, ...args);

    case '灰度阈值':
    case 'toThresh':
      return toThresh(imgData, ...args);

    // 以下是变幻
    case '亮度':
    case 'brightness':
      return brightness(imgData, ...args);

    case '曲线':
    case 'curve':
      return curve(imgData, ...args);

    case '伽马':
    case 'gamma':
      return gamma(imgData, ...args);

    case '可选颜色':
    case 'selectiveColor':
      return selectiveColor(imgData, ...args);

    case '色相饱和度':
    case 'setHSI':
      return setHSI(imgData, ...args);

    default:
      throw `${funcName}. 该处理方法不存在`;
  }
}