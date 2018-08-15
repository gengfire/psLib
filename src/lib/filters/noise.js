/**
 * @author: Bin Wang
 * @description:   添加杂色 
 *
 */
export const noise = (imgData, R = 100) => {
    const data = imgData.data;
    const width = imgData.width;
    const height = imgData.height;

    //区块
    for(let x = 0;x < width;x ++){
        for(let y = 0;y < height;y ++){
            const realI = y * width + x;
            for(let j = 0;j < 3;j ++){
                const rand = parseInt(Math.random() * R * 2) - R;
                data[realI * 4 + j] += rand;
            }
        }
    }
    return imgData;
}
