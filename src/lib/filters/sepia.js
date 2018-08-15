/**
 * @author: Bin Wang
 * @description: 棕褐色
 *
 */
import { dorsyMath } from '../dorsyMath'; 

export const sepia = (imgData) => {
    const width = imgData.width;
    const height = imgData.height;
    
    for(let x = 0; x < width; x ++){
        for(let y = 0; y < height; y ++){
            dorsyMath.xyCal(imgData, x, y, (r, g, b) => {
                return [
                    r * 0.393 + g * 0.769 + b * 0.189,
                    r * 0.349 + g * 0.686 + b * 0.168,
                    r * 0.272 + g * 0.534 + b * 0.131
                ];
            });
        }
    }
    return imgData;
}
