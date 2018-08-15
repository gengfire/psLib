/**
 * @author: Bin Wang
 * @description:    曲线 
 * xArr = [0, 190, 255]
 * yArr = [0, 229, 255]
 * channel = 'RGB|R|G|B'
 */
import { dorsyMath } from '../dorsyMath';

export const curve = (imgData, xArr = [0, 190, 255], yArr = [0, 229, 255], channel) => {
    //获得插值函数
    const lagrange = dorsyMath.lagrange(xArr, yArr);
    const data = imgData.data;
    const width = imgData.width;
    const height = imgData.height;

    //调节通道
    if(!(/[RGB]+/.test(channel))){
        channel = "RGB";
    }
    
    const channelString = channel.replace("R", "0").replace("G", "1").replace("B", "2");
    
    const indexOfArr = [
        channelString.indexOf("0") > -1,
        channelString.indexOf("1") > -1,
        channelString.indexOf("2") > -1
    ];

    //区块
    for(let x = 0; x < width; x ++){
        for(let y = 0; y < height; y ++){
            const realI = y * width + x;
            for(let j = 0; j < 3; j ++){
                if(! indexOfArr[j]) continue;
                data[realI * 4 + j] = lagrange(data[realI * 4 + j]);
            }
        }
    }
    return imgData;
}
