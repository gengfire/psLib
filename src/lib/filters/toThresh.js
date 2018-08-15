/**
 * @author: Bin Wang
 * @description:灰度阈值 做只有2级灰度图像处理 
 * lamta 灰度阈值
 */
export const toThresh = (imgData, lamta = 128) => {
    // 先转灰度
    const data = imgData.data;
    for(let i = 0,n = data.length;i < n;i += 4){
        const gray = parseInt((0.299 * data[i] + 0.578 * data[i + 1] + 0.114 * data[i + 2]));
        data[i + 2] = data[i + 1] = data[i] = gray;
    }

    // 设置阈值
    for(let i = 0, n = data.length; i < n; i ++){
        if((i + 1) % 4){
            data[i] = data[i] > lamta ? 255 : 0;
        }
    }

    imgData.data = data;

    return imgData;
}
