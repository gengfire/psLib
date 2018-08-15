/**
 * @author: Bin Wang
 * @description: 调整RGB 饱和和度  
 * H 色相(-180 , 180)
 * S 饱和度(-100, 100)
 * I 明度(-100, 100)
 * H (-2*Math.PI , 2 * Math.PI)  S (-1,1) I (-255,255)
 * setColor 是否着色
 * 着色原理  勾选着色后，所有的像素不管之前是什么色相，都变成当前设置的色相，
 * 然后饱和度变成现在设置的饱和度，但保持明度为原来的基础上加上设置的明度
 *
 */
import { dorsyMath } from '../dorsyMath';

export const setHSI = (imgData, Ho = 0, So = 0, Io = 0, setColor = false, channel) => {
    const H = (Ho / 180) * Math.PI;
    const S = (So / 100);
    const I = (Io / 100) * 255;
    
    //调节通道
    if(!(/[RGBCMY]+/.test(channel))){
        channel = "RGBCMY";
    }
    
    const letters = channel.split("");
    const indexOfObj = {};

    for(let i = 0; i < letters.length; i ++){
        indexOfObj[letters[i]] = 1;
    }

    dorsyMath.applyInHSI(imgData, (i, color) => {
        if(!indexOfObj[color]) return;

        if (setColor) {
            i.H = H;
            i.S = S;
            i.I += I;
        } else {
            i.H += H;
            i.S += S;
            i.I += I;
        }

    });

    return imgData;
}
