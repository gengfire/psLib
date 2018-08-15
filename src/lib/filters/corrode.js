/**
 * @author: Bin Wang
 * @description:  腐蚀 
 * R 腐蚀半径
 */
export const corrode = (imgData, R = 3) => {
    const data = imgData.data;
    const width = imgData.width;
    const height = imgData.height;
    // const xLength = R * 2 + 1;

    //区块
    for (let x = 0; x < width; x ++) {

        for (let y = 0; y < height; y ++) {
            
            const randomI = parseInt(Math.random() * R * 2) - R ;//区块随机代表
            const randomJ = parseInt(Math.random() * R * 2) - R;//区块随机代表
            const realI = y * width + x;
            const realJ = (y + randomI) * width + x + randomJ;

            for(let j = 0; j < 3; j ++){
                data[realI * 4 + j] = data[realJ * 4 + j];
            }

        }

    }

    return imgData;
}
