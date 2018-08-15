/**
 * @author: Bin Wang
 * @description:灰度扩展
 *
 */
export const ImageEnhance = (imgData, arg1, arg2) => {
    // const lamta = arg || 0.5;
    const data = imgData.data;
    // const width = imgData.width;
    // const height = imgData.height;
    // const p1 = arg1 || {x: 10,y: 10};
    // const p2 = arg2 || {x: 50,y: 40};

    // function transfer(d){
    // }

    for(let i = 0,n = data.length;i < n;i += 4){
        
    }

    imgData.data = data;

    return imgData;
}
