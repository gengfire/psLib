import { fix } from './fix';
import { cover } from './cover';
import { ps } from './ps';
import { clone, getImageData, imgData2Base64 } from '../utils';

const psLib = function(imageData) {
  if(this instanceof psLib) {
    this.imageData = imageData;
  } else {
    return new psLib(imageData);
  }
}
psLib.prototype.fix = function(funcName, ...args) {
  this.imageData = fix(this.imageData, funcName, ...args);
  return this;
}
psLib.prototype.cover = function(upperData, method, ...args) {
  this.imageData = cover(this.imageData, upperData, method, ...args);
  return this;
}
psLib.prototype.ps = function(funcName) {
  this.imageData = ps(this.imageData, funcName);
  return this;
}
psLib.prototype.clone = function() {
  return clone(this.imageData);
}
psLib.prototype.export = function() {
  return this.imageData;
}

window.psLib = psLib;

export {
  psLib,
  getImageData,
  imgData2Base64
};
