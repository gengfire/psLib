/**
 * @author: Bin Wang
 * @description: 色调分离
 * step 灰度阶数 由原来的255阶映射为现在的阶数
 */
import { dorsyMath } from '../dorsyMath';

export const posterize = (imgData, step = 20) => {
    const data = imgData.data;
    const width = imgData.width;
    const height = imgData.height;

    step = step < 1 ? 1 : (step > 255 ? 255 : step);
    const level = Math.floor(255 / step);
    
    for(let x = 0; x < width; x ++) {
        for(let y = 0; y < height; y ++){
            dorsyMath.xyCal(imgData, x, y, (r, g, b) => {
                return [
                    Math.floor(r / level) * level,
                    Math.floor(g / level) * level,
                    Math.floor(b / level) * level
                ];
            });
        }
    }
    return imgData;
}
