# psLib，针对ImageData处理库，提取自[AlloyImage](https://github.com/AlloyTeam/AlloyImage)图像处理引擎，不局限于前端canvas
## 可用于nodejs和微信小程序，和canvas分离

## demo
[DEMO](http://api.naline.cn/pslib/)
```html
<div id="ret"></div>
<script type="text/javascript" src="../dist/psLib.min.js"></script>
<script>
  getImageData('demo.jpg', (imageData) => {
    const imgObj = psLib(imageData);
    const cloneData = imgObj.clone();
    const respData = imgObj
    // .filter('sharp')
    // .alter('brightness', 10)
    // .cover(originData, '正片叠底')
    // .ps('暖秋')
    .ps('复古')
    // .ps('lomo')
    // .cover(psLib(cloneData).ps('lomo'), '滤色')
    // .fix('浮雕效果')
    .export();
    document.getElementById('ret').innerHTML = '<img src="'+ imgData2Base64(cloneData) +'" /><img src="'+ imgData2Base64(respData) +'" />';
  });
</script>
```


## 使用方法
### fix 基础处理
- 查找边缘 fix('borderline');
- 腐蚀     fix('corrode', R = 3); R 腐蚀半径
- 暗角     fix('darkCorner', R = 3, lastLevel = 30); R暗角级别 1-10级，lastLevel暗角最终的级别 0 - 255
- 喷点     fix('dotted', R = 1, r = 1); R矩形半径 r内小圆半径
- 浮雕效果 fix('embossment');
- 高斯模糊 fix('gaussBlur', radius = 3, sigma = 1); radius取样区域半径正数  sigma标准方差
- 马赛克   fix('mosaic', R = 3); R半径
- 添加杂色 fix('noise', R = 100); R半径
- 油画     fix('oilPainting', R = 16); R半径
- 色调分离 fix('posterize', step = 20); step.1-255 灰度阶数 由原来的255阶映射为现在的阶数
- 棕褐色   fix('sepia');
- 锐化     fix('sharp', lamta = 0.6); 锐化指数 λ
- 灰度处理 fix('toGray');
- 反色     fix('toReverse');
- 灰度阈值 fix('toThresh', lamta = 128); 灰度阈值 做只有2级灰度图像处理 
- 
- 亮度     fix('brightness', bright = 0, contrast = 0); bright亮度 -100至100 contrast对比度 -100至100
- 曲线     fix('curve', xArr = [0, 190, 255], yArr = [0, 229, 255], channel); channel可选通道
- 伽马     fix('gamma', lamta = 10);
- 可选颜色  fix('selectiveColor', color = '中性色', cmyk = [.5, .5, .5, .5], isRelative = 0); color '黑色|白色|中性色'
- 色相饱和度 fix('setHSI', H = 0, S = 0, I = 0, setColor = false, channel); H 色相(-180 , 180) S 饱和度(-100, 100) I 明度(-100, 100) setColor 是否着色 channel可选通道

### ps，简单复合处理
- 美肤 ps('softenFace')
- 素描 ps('sketch')
- 自然增强 ps('softEnhancement')
- 紫调 ps('purpleStyle')
- 柔焦 ps('soften')
- 复古 ps('vintage')
- 黑白 ps('gray')
- 仿lomo ps('lomo')
- 亮白增强 ps('strongEnhancement')
- 灰白 ps('strongGray')
- 灰色 ps('lightGray')
- 暖秋 ps('warmAutumn')
- 木雕 ps('warmAutumn')
- 粗糙 ps('rough')

### cover 叠加图层
cover(lowerData, upperData, method, alpha = 1, dx = 0, dy = 0, channel = 'RGB')
- lowerData: 底层图层数据
- upperData: 叠加层图层数据
- alpha 范围为0 - 1
- method: 颜色减淡|变暗|变亮|正片叠底|滤色|叠加|强光|差值|排除|点光|颜色加深|线性加深|线性减淡|柔光|亮光|线性光|实色混合

### getImageData 通过canvas将图片导出为ImageData

### imgData2Base64 通过canvas将ImageData导出为base64
