import { fix } from './fix';
import { cover } from './cover';
import { ps } from './ps';
import { clone, getImageData, imgData2Base64 } from '../utils';

class psLibFn {
  constructor(imageData) {
    this.imageData = imageData;
  }
  fix(funcName, ...args) {
    this.imageData = fix(this.imageData, funcName, ...args);
    return this;
  }
  ps(funcName) {
    this.imageData = ps(this.imageData, funcName);
    return this;
  }
  cover(upperData, method, ...args) {
    this.imageData = cover(this.imageData, upperData, method, ...args);
    return this;
  }
  clone() {
    return clone(this.imageData);
  }
  export() {
    return this.imageData;
  }
}

const psLib = function(imageData) {
  if(this instanceof psLibFn) {
    return psLibFn;
  } else {
    return new psLibFn(imageData);
  }
}

window.psLib = psLib;
window.getImageData = getImageData;
window.imgData2Base64 = imgData2Base64;

export {
  psLib,
  getImageData,
  imgData2Base64
};
