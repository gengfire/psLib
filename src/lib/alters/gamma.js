/**
 * @author: Bin Wang
 * @description: gamma调节
 *
 */
import { dorsyMath } from '../dorsyMath';

export const gamma = (imgData, lamta = 10) => {
    const width = imgData.width;
    const height = imgData.height;

    //gamma阶-100, 100

    const normalizedArg = ((lamta + 100) / 200) * 2;
    
    for(let x = 0; x < width; x ++){
        for(let y = 0; y < height; y ++){
            dorsyMath.xyCal(imgData, x, y, function(r, g, b){
                return [
                    Math.pow(r, normalizedArg),
                    Math.pow(g, normalizedArg),
                    Math.pow(b, normalizedArg)
                ];
            });
        }
    }
    return imgData;
}
