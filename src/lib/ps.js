/**
 * @author: Bin Wang
 * @description: 简单ps复合处理
 *
 */
import { clone, color2ImageData } from 'src/utils';
import { fix } from './fix';
import { cover } from './cover';

export const ps = (imgData, funcName) => {
    const cloneData = clone(imgData);

    switch(funcName) {
        case '美肤':
        case 'softenFace':
            return fix(cover(cloneData, fix(imgData, 'gaussBlur', 8), '滤色'), 'brightness', -10, 5);
        
        case '素描':
        case 'sketch':
            return fix(fix(cover(imgData, fix(fix(cloneData, 'toReverse'), 'gaussBlur', 8), '颜色减淡'), 'toGray'), 'sharp', 1);

        case '自然增强':
        case 'softEnhancement':
            return fix(imgData, 'curve', [0, 190, 255], [0, 229, 255]);

        case '紫调':
        case 'purpleStyle':
            return cover(imgData, fix(cloneData, 'gaussBlur', 3), '正片叠底', 1, 0, 0, 'RG');
        
        case '柔焦':
        case 'soften':
            return cover(imgData, fix(cloneData, 'gaussBlur', 6), '变暗');

        case '复古':
        case 'vintage':
            return cover(fix(imgData, 'toGray'), fix(fix(fix(color2ImageData(imgData.width, imgData.height, '#808080'), 'noise'), 'gaussBlur', 4), '色相饱和度', 32, 19, 0, true), '叠加');

        case '黑白':
        case 'gray':
            return fix(imgData, 'toGray');

        case '仿lomo':
        case 'lomo':
            return fix(cover(cover(cloneData, cover(cloneData, cloneData, '滤色'), '柔光'), cloneData, '正常', 0.2, 0, 0, 'B'), 'darkCorner', 6, 200);
        
        case '亮白增强':
        case 'strongEnhancement':
            return cover(cloneData, fix(imgData, 'curve', [0, 50, 255], [0, 234, 255]), '柔光');
        
        case '灰白':
        case 'strongGray':
            return fix(fix(imgData, 'toGray'), 'curve', [0, 61, 69, 212, 255], [0, 111, 176, 237, 255]);

        case '灰色':
        case 'lightGray':
            return fix(fix(imgData, 'toGray'), 'curve', [0, 60, 142, 194, 255], [0, 194, 240, 247, 255]);

        case '暖秋':
        case 'warmAutumn':
            return cover(imgData, fix(fix(cloneData, '色相饱和度', 36, 47, 8, true), 'darkCorner', 6, 150), '叠加');

        case '木雕':
        case 'carveStyle':
            return cover(imgData, fix(fix(fix(cloneData, 'mosaic'), 'borderline'), 'embossment'), '线性光');

        case '粗糙':
        case 'rough':
            return cover(imgData, fix(fix(fix(color2ImageData(imgData.width, imgData.height, '#000'), 'dotted'), 'toReverse'), 'embossment'), '叠加')
        
        default:
            throw `${funcName}. 该复合处理方法不存在`;
    }
};
