// import { psLib, getImageData, imgData2Base64 } from '../src/lib';
import { psLib, getImageData, imgData2Base64 } from '../dist/psLib.min';

getImageData('../demo/demo.jpg', (imageData) => {
  const imgObj = psLib(imageData);
  const cloneData = imgObj.clone();

  const respData = imgObj
  // .filter('sharp')
  // .alter('brightness', 10)
  // .cover(originData, '正片叠底')
  // .ps('暖秋')
  .ps('复古')
  // .ps('lomo')
  .cover(psLib(cloneData).ps('lomo'), '滤色')
  // .fix('浮雕效果')
  .export();

  document.getElementById('ret').innerHTML = '<img src="'+ imgData2Base64(cloneData) +'" /><img src="'+ imgData2Base64(respData) +'" />';
});