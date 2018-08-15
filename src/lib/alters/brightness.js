/**
 * @author: Bin Wang
 * @description: 调整亮度对比度
 *  bright 亮度 -100至100
 *  contrast 对比度 -100至100
 */
export const brightness = (imgData, bright = 0, contrast = 0) => {
    const data = imgData.data;

    const b = bright / 100;   // -1, 1
    const c = contrast / 100; // -1, 1

    const k = Math.tan((45 + 44 * c) * Math.PI / 180);

    for(let i = 0,n = data.length;i < n;i += 4){
        for(let j = 0;j < 3;j ++){
            data[i + j] = (data[i + j] - 127.5 * (1 - b)) * k + 127.5 * (1 + b);
        }
    }
    return imgData;
}
