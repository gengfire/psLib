export const getImageData = (imgUrl, callback) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const tmpImg = new Image();
  tmpImg.onload = function() {
    canvas.width = this.width;
    canvas.height = this.height;

    ctx.drawImage(this, 0, 0, this.width, this.height);
    callback && callback(ctx.getImageData(0, 0, this.width, this.height));
  };
  tmpImg.src = imgUrl;
}