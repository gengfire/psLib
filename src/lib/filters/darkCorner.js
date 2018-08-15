/**
 * @author: Bin Wang
 * @description:     暗角
 * R 暗角级别 1-10级
 * lastLevel 暗角最终的级别 0 - 255
 * type 暗角的形状 'round'
 */
import { dorsyMath } from '../dorsyMath';

export const darkCorner = (imgData, R = 3, lastLevel = 30, type = 'round') => {
    //暗角级别 分1-10级
    //暗角最终的级别 0 - 255
    //暗角的形状
    
    const data = imgData.data;
    const width = imgData.width;
    const height = imgData.height;
    // const xLength = R * 2 + 1;

    //计算中心点
    const middleX = width * 2 / 3;
    const middleY = height * 1/ 2;
    
    //计算距中心点最长距离
    const maxDistance = dorsyMath.distance([middleX, middleY]);
    //开始产生暗角的距离
    const startDistance = maxDistance * (1 - R / 10);

    const f = function(x, p0, p1, p2, p3){
        //基于三次贝塞尔曲线 
        return p0 * Math.pow((1 - x), 3) + 3 * p1 * x * Math.pow((1 - x), 2) + 3 * p2 * x * x * (1 - x) + p3 * Math.pow(x, 3);
    }

    //计算当前点应增加的暗度
    function calDark(x, y, p){
        //计算距中心点距离
        const distance = dorsyMath.distance([x, y], [middleX, middleY]);
        let currBilv = (distance - startDistance) / (maxDistance - startDistance);
        if(currBilv < 0) currBilv = 0;

        //应该增加暗度
        return  f(currBilv, 0, 0.02, 0.3, 1) * p * lastLevel / 255;
    }

    //区块
    for(let x = 0; x < width; x ++){

        for(let y = 0; y < height; y ++){
            
            const realI = y * width + x;
            for(let j = 0;j < 3;j ++){
                const dDarkness = calDark(x, y, data[realI * 4 + j]);
                data[realI * 4 + j] -= dDarkness;
            }

        }

    }


    return imgData;
}
