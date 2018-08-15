/**
 * @author: Bin Wang
 * @description: Main add
 * 叠加图层
 *
 */
export const cover = (lowerData, upperData, method, alpha = 1, dx = 0, dy = 0, channel = 'RGB') => {
    // alpha 范围为0 - 1

    const lower = lowerData.data,
        upper = upperData.data;

    if (!(/[RGB]+/.test(channel))) {
        channel = "RGB";
    }
    
    let result;
    const 
        channelString = channel.replace("R", "0").replace("G", "1").replace("B", "2"),
        width = lowerData.width,
        height = lowerData.height,
        upperWidth = upperData.width,
        upperHeight = upperData.height,

        indexOfArr = [
            channelString.indexOf("0") > -1,
            channelString.indexOf("1") > -1,
            channelString.indexOf("2") > -1
        ];

    let uXMin = dx;
    let uXMax = dx + upperWidth;
    let uYMin = dy;
    let uYMax = dy + upperHeight;

    if (uXMin > width) {
        return;
    } else if (uXMin < 0) {
        uXMin = 0;
    }

    if (uXMax < 0) {
        return;
    } else if (uXMax > width) {
        uXMax = width;
    }

    if (uYMin > height) {
        return;
    } else if (uYMin < 0) {
        uYMin = 0;
    }

    if (uYMax < 0) {
        return;
    } else if(uYMax > height) {
        uYMax = height;
    }

    
    let currRow, upperY, upperRow;
    for (let y = uYMin; y < uYMax; y ++) {
        currRow = y * width;
        upperY = y - dy;
        upperRow = upperY * upperWidth;

        for (let x = uXMin; x < uXMax; x ++) {
            //计算此时对应的upperX,Y
            const upperX = x - dx;

            //计算此时的i
            const i = (currRow + x) * 4;

            //计算此时的upperI
            const uI = (upperRow + upperX) * 4;

            for (let j = 0; j < 3; j ++) {
                
                //若此点透明则不计算
                if(upper[uI + 3] == 0) break;
                else lower[i + 3] = upper[uI + 3];

                switch(method) {
                    case "颜色减淡" :
                        if(indexOfArr[j]) {
                            result = lower[i + j] + (lower[i + j] * upper[uI + j]) / (255 - upper[uI + j]);
                            lower[i + j] = (1 - alpha) * lower[i + j] + (alpha) * result;
                        }
                        break;

                    case "变暗":
                        if(indexOfArr[j]) {
                            result = lower[i + j] < upper[uI + j] ? lower[i + j] : upper[uI + j];
                            lower[i + j] = (1 - alpha) * lower[i + j] + (alpha) * result;
                        }
                        break;

                    case "变亮":
                        if(indexOfArr[j]) {
                            result = lower[i + j] > upper[uI + j] ? lower[i + j] : upper[uI + j];
                            lower[i + j] = (1 - alpha) * lower[i + j] + (alpha) * result;
                        }
                        break;

                    case "正片叠底":
                        if (indexOfArr[j]) {
                            result = ~~((lower[i + j] * upper[uI + j]) / 255);
                            lower[i + j] = (1 - alpha) * lower[i + j] + (alpha) * result;
                        }
                        break;

                    case "滤色" :
                        if(indexOfArr[j]) {
                            result = ~~(255 - (255 - lower[i + j]) * (255 - upper[uI + j]) / 255);
                            lower[i + j] = (1 - alpha) * lower[i + j] + (alpha) * result;
                        }
                        break;

                    case "叠加":
                        if (indexOfArr[j]) {
                            if(lower[i + j] <= 127.5){
                                result = lower[i + j] * upper[uI + j] / 127.5;
                            }else{
                                result = 255 - (255 - lower[i + j]) * (255 - upper[uI + j]) / 127.5;
                            }
                            lower[i + j] = (1 - alpha) * lower[i + j] + (alpha) * result;
                        }
                        break;

                    case "强光":
                        if (indexOfArr[j]) {
                            if(upper[uI + j] <= 127.5){
                                result = lower[i + j] * upper[uI + j] / 127.5;
                            }else{
                                result = lower[i + j] + (255 - lower[i + j]) * (upper[uI + j] - 127.5) / 127.5;
                            }
                            lower[i + j] = (1 - alpha) * lower[i + j] + (alpha) * result;
                        }
                        break;

                    case "差值":
                        if (indexOfArr[j]) {
                            result = lower[i + j] > upper[uI + j] ? lower[i + j] - upper[uI + j] : upper[uI + j] - lower[i + j];
                            lower[i + j] = (1 - alpha) * lower[i + j] + (alpha) * result;
                        }
                        break;

                    case "排除":
                        if(indexOfArr[j]){
                            result = lower[i + j] + upper[uI + j] - (lower[i + j] * upper[uI + j]) / 127.5;
                            lower[i + j] = (1 - alpha) * lower[i + j] + (alpha) * result;
                        }
                        break;

                    case "点光":
                        if (indexOfArr[j]) {
                            if(lower[i + j] < (2 * upper[uI + j] - 255)){
                                result = 2 * upper[uI + j] - 255;
                            }else if(lower[i + j] < 2 * upper[uI + j]){
                                result = lower[i + j];
                            }else{
                                result = 2 * upper[uI + j];    
                            }
                            lower[i + j] = (1 - alpha) * lower[i + j] + (alpha) * result;
                        }
                        break;

                    case "颜色加深":
                        if (indexOfArr[j]) {
                            result = 255 - 255 * (255 - lower[i + j]) / upper[uI + j];
                            lower[i + j] = (1 - alpha) * lower[i + j] + (alpha) * result;
                        }
                        break;

                    case "线性加深":
                        if (indexOfArr[j]) {
                            const tempR = lower[i + j] + upper[uI + j];
                            result = tempR > 255 ? tempR - 255 : 0;
                            lower[i + j] = (1 - alpha) * lower[i + j] + (alpha) * result;
                        }
                        break;

                    case "线性减淡":
                        if(indexOfArr[j]) {
                            const tempR = lower[i + j] + upper[uI + j];
                            result = tempR > 255 ? 255 : tempR;
                            lower[i + j] = (1 - alpha) * lower[i + j] + (alpha) * result;
                        }
                        break;

                    case "柔光":
                        if (indexOfArr[j]) {
                            if(upper[uI + j] < 127.5){
                                result = ((2 * upper[uI + j] - 255) * (255 - lower[i + j]) / (255 * 255) + 1) * lower[i + j];
                            }else{
                                result = (2 * upper[uI + j] - 255) * (Math.sqrt(lower[i + j] / 255) - lower[i + j] / 255) + lower[i + j];
                            }
                            lower[i + j] = (1 - alpha) * lower[i + j] + (alpha) * result;
                        }
                        break;

                    case "亮光":
                        if (indexOfArr[j]) {
                            if(upper[uI + j] < 127.5){
                                result = (1 - (255 - lower[i + j]) / (2 * upper[uI + j])) * 255;
                            }else{
                                result = lower[i + j] / (2 * (1 - upper[uI + j] / 255));
                            }
                            lower[i + j] = (1 - alpha) * lower[i + j] + (alpha) * result;
                        }
                        break;

                    case "线性光":
                        if (indexOfArr[j]) {
                            const tempR = lower[i + j] + 2 * upper[uI + j] - 255;
                            result = tempR > 255 ? 255 : tempR;
                            lower[i + j] = (1 - alpha) * lower[i + j] + (alpha) * result;
                        }
                        break;

                    case "实色混合":
                        if(indexOfArr[j]){
                            if(upper[uI + j] < (255 - lower[i + j])){
                                result = 0;
                            }else{
                                result = 255;
                            }
                            lower[i + j] = (1 - alpha) * lower[i + j] + (alpha) * result;
                        }
                        break;

                    default: 
                        if(indexOfArr[j]){
                            result = upper[uI + j];
                            lower[i + j] = (1 - alpha) * lower[i + j] + (alpha) * result;
                        }
                } // end switch
            } // end for
        } // end y
    } // end x
    return lowerData;
};
