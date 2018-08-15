/**
 * @author: Bin Wang
 * @description:  浮雕效果
 *
 */
export const embossment = (imgData) => {
    const data = imgData.data;
    const width = imgData.width;

    const outData = [];
    for(let i = 0,n = data.length;i < n;i += 4){

        const ii = i / 4;
        const row = parseInt(ii / width);
        const col = ii % width;
        const A = ((row - 1) *  width + (col - 1)) * 4;
        const G = (row + 1) * width * 4 + (col + 1) * 4;

        if(row == 0 || col == 0) continue;
        for(let j = 0;j < 3;j ++){
            outData[i + j] = data[A + j] - data[G + j] + 127.5;
        }
        outData[i + 4] = data[i + 4];
    }

    for(let i = 0,n = data.length;i < n;i ++){
        data[i] = outData[i] || data[i];
    }


    return imgData;
}