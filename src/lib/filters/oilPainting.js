/**
 * @author: Bin Wang
 * @description: 油画 
 *
 */
export const oilPainting = (imgData, R = 16) => {
    const data = imgData.data;
    const width = imgData.width;
    const height = imgData.height;

    //区块
    for(let x = 0;x < width;x ++){
        for(let y = 0;y < height;y ++){
            const realI = y * width + x;
            let gray = 0;
            for(let j = 0;j < 3;j ++){
                gray += data[realI * 4 + j];
            }
            gray = gray / 3;
            const every = parseInt(gray / R) * R;
            for(let j = 0;j < 3;j ++){
                data[realI * 4 + j] = every;
            }
        }
    }
    return imgData;
}
