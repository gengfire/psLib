/**
 * @author: Bin Wang
 * @description:  可选颜色 
 * @参考：http://wenku.baidu.com/view/e32d41ea856a561252d36f0b.html
 * color '黑色|白色|中性色'
 */

import { dorsyMath } from '../dorsyMath';

export const selectiveColor = (imgData, color = '中性色', cmyk = [.5, .5, .5, .5], isRelative = 0) => {
    // 可选颜色
    // 百分数
    // 是否相对

    //百分数
    const C = cmyk[0];
    const M = cmyk[1];
    const Y = cmyk[2];
    const K = cmyk[3];

    const maxColorMap = {
        red: "R",
        green: "G",
        blue: "B",
        "红色": "R",
        "绿色": "G",
        "蓝色": "B"
    };

    const minColorMap = {
        cyan: "R",
        magenta: "G",
        yellow: "B",
        "青色": "R",
        "洋红": "G",
        "黄色": "B"
    };

    //检查是否是被选中的颜色
    const checkSelectedColor = function(colorObj){
        if (maxColorMap[color]) {
            return Math.max(colorObj.R, colorObj.G, colorObj.B) == colorObj[maxColorMap[color]];
        } else if (minColorMap[color]) {
            return Math.min(colorObj.R, colorObj.G, colorObj.B) == colorObj[minColorMap[color]];
        } else if (color == "black" || color == "黑色") {
            return Math.min(colorObj.R, colorObj.G, colorObj.B) < 128;
        } else if (color == "white" || color == "白色") {
            return Math.max(colorObj.R, colorObj.G, colorObj.B) > 128;
        } else if (color == "中性色") {
            return !((Math.max(colorObj.R, colorObj.G, colorObj.B) < 1) || (Math.min(colorObj.R, colorObj.G, colorObj.B) > 224));
        }
    };

    // const upLimit = 0;
    // const lowLimit = 0;
    let limit = 0;

    const alterNum = [C, M, Y, K];
    for(let x = 0, w = imgData.width; x < w; x ++) {
        for(let y = 0, h = imgData.height; y < h; y ++) {
            dorsyMath.xyCal(imgData, x, y, function(R, G, B) {
                const colorObj = {
                    R: R,
                    G: G,
                    B: B
                };

                const colorArr = [R, G, B];
                const resultArr =[];

                if (checkSelectedColor(colorObj)) {
                    if(maxColorMap[color]){
                        const maxColor = maxColorMap[color];

                        const middleValue = R + G + B - Math.max(R, G, B) - Math.min(R, G, B);
                        limit = colorObj[maxColor] - middleValue;
                    }else if(minColorMap[color]){
                        const minColor = minColorMap[color];

                        const middleValue = R + G + B - Math.max(R, G, B) - Math.min(R, G, B);
                        limit = middleValue - colorObj[minColor]  ;
                    }else if(color == "black" || color == "黑色"){
                        limit = parseInt(127.5 - Math.max(R, G, B)) * 2;
                    }else if(color == "white" || color == "白色"){
                        limit = parseInt(Math.min(R, G, B) - 127.5) * 2;
                    }else if(color == "中性色"){
                        limit = 255 - (Math.abs(Math.max(R, G, B) - 127.5) + Math.abs(Math.min(R, G, B) - 127.5));
                    }else{
                        return;
                    }

                    for(let i = 0; i < 3; i ++){
                        //可减少到的量
                        let lowLimitDelta = parseInt(limit * (colorArr[i] / 255));
                        const lowLimit = colorArr[i] - lowLimitDelta;

                        //可增加到的量
                        let upLimitDelta =  parseInt(limit * (1 - colorArr[i] / 255));
                        const upLimit = colorArr[i] + upLimitDelta;

                        //将黑色算进去 得到影响百分比因子
                        const factor = (alterNum[i] + K + alterNum[i] * K);

                        //相对调节
                        let realUpLimit = 0;
                        if (isRelative) {
                            //如果分量大于128  减少量=增加量
                            if(colorArr[i] > 128){
                                lowLimitDelta = upLimitDelta;
                            }

                            //先算出黑色导致的原始增量
                            if (K > 0) {
                                realUpLimit = colorArr[i] - K * lowLimitDelta; 
                            } else {
                                realUpLimit = colorArr[i] - K * upLimitDelta; 
                            }

                            //标准化
                            if(realUpLimit > upLimit) realUpLimit = upLimit;
                            if(realUpLimit < lowLimit) realUpLimit = lowLimit;

                            upLimitDelta = upLimit - realUpLimit;
                            lowLimitDelta = realUpLimit - lowLimit;

                            if(K < 0){
                                lowLimitDelta = upLimitDelta;
                            }else{
                            }

                            //> 0表明在减少
                            if(alterNum[i] > 0){
                                realUpLimit -= alterNum[i] * lowLimitDelta; 
                            }else{
                                realUpLimit -= alterNum[i] * upLimitDelta; 
                            }


                        } else {
                            //现在量
                            realUpLimit = limit * - factor + colorArr[i];
                        }

                        if(realUpLimit > upLimit) realUpLimit = upLimit;
                        if(realUpLimit < lowLimit) realUpLimit = lowLimit;
                        
                        resultArr[i] = realUpLimit;
                    }

                    return resultArr;
                }
            });//end xyCal
        }//end forY
    }//end forX

    return imgData;
};
