/**
 * @author: Bin Wang
 * @description: 反色
 *
 */
export const toReverse = (imgData) => {
    const data = imgData.data;

    for(let i = 0, n = data.length; i < n; i += 4){
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
    }
    
    return imgData;
}
