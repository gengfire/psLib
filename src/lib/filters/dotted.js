/**
 * @author: Bin Wang
 * @description:  喷点 
 * 矩形半径
 * 内小圆半径
 *
 */
import { dorsyMath } from '../dorsyMath';

export const dotted = (imgData, R = 1, r = 1) => {
    //矩形半径
    //内小圆半径

    const data = imgData.data;
    const width = imgData.width;
    const height = imgData.height;
    const xLength = R * 2 + 1;

    //构造距离模板
    const disTmlMatrix = [
    ];

    const r2 = r * r;
    for(let x = -R; x < R; x ++){

        for(let y = -R; y < R; y ++){
            if((x * x + y * y) > r2){
                disTmlMatrix.push([x, y]);
            }
        }

    }

    const xyToIFun = dorsyMath.xyToIFun(width);

    //将大于距离外面的透明度置为0
    for(let x = 0, n = parseInt(width / xLength); x < n; x ++){

        for(let y = 0, m = parseInt(height / xLength); y < m;y ++){
            const middleX = parseInt((x + 0.5) * xLength);
            const middleY = parseInt((y + 0.5) * xLength);

            for(let i = 0; i < disTmlMatrix.length; i ++){
                const dotX = middleX + disTmlMatrix[i][0];
                const dotY = middleY + disTmlMatrix[i][1];

                //data[(dotY * width + dotX) * 4 + 3] = 0;
                data[xyToIFun(dotX, dotY, 3)] = 225;
                data[xyToIFun(dotX, dotY, 2)] = 225;
                data[xyToIFun(dotX, dotY, 0)] = 225;
                data[xyToIFun(dotX, dotY, 1)] = 225;
            }
        }

    }

    /*
    for(const x = 0; x < width; x ++){
        for(const y = 0; y < height; y ++){
            data[(y * width + x) * 4 + 3] = 0;
        }
    }
    */


    return imgData;
}
