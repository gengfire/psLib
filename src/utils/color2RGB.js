const colorReg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;

export const color2RGB = (color = '#000') => {
  let sColor = color.toLowerCase();
  if (sColor && colorReg.test(sColor)) {
    // 处理4位的颜色值
    if (sColor.length === 4) {
      let sColorNew = "#";
      for(let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));	
      }
      sColor = sColorNew;
    }

    const sColorChange = [];
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)));
    }
    return sColorChange;
  } else {
    return sColor;	
  }
};
