/**
 * @author: Bin Wang
 * @description:数学处理模块-core 
 * FFT 矩阵 复数 Langrange插值
 *
 */
const dorsyMath = {
    FFT1: function(dataArr) {
    /*
     * @description:快速傅里叶变换
     * @按时间抽取
     * */
        const size = dataArr.length;
        let count = 0;

        //------计算权重W------------
        const W = [];
        for(let i = 0; i < size; i ++){
            W[i] = this.exp(-2 * Math.PI * i / size);
        }
        

        butterflyCal();
        return dataArr;

        //蝶形运算单元
        function butterflyCal(){
            count ++;

            //蝶形单元个数
            const singleLength = size / Math.pow(2,count);
            const everyLength = size / singleLength;

            for(let i = 0; i < singleLength; i ++){

                //逐次计算蝶形单元
                singleButterflyCal(i * everyLength, (i + 1) * everyLength - 1, count);
            }

            //如果单元个数大于1继续运算
            if(singleLength > 1){

                //递归
                butterflyCal();
            }else{
            }
            
        }

        //一个蝶形单元 n运算次数 蝶形单元的成对间隔
        function singleButterflyCal(start, end, n){

            const delta =  Math.pow(2,n - 1);

            for(let i = start, j = 0; i <= (end - delta); i ++){

                //i 的运算对
                const pairI = i + delta;

                //计算i运算时的权重下标
                const currWeightForI = j * size / Math.pow(2,n);

                //计算i的运算对时候的权重
                const currWeightForPairI = currWeightForI + size / 4;

                if(!(dataArr[i] instanceof dorsyMath.C)) dataArr[i] = new dorsyMath.C(dataArr[i]);

                if(!(dataArr[pairI] instanceof dorsyMath.C)) dataArr[pairI] = new dorsyMath.C(dataArr[pairI]);

                const currResultForI = dataArr[i].plus(dataArr[pairI].mutiply(W[currWeightForI]));
                const currResultForPairI = dataArr[i].plus(dataArr[pairI].mutiply(W[currWeightForPairI]));

                dataArr[i] = currResultForI;
                dataArr[pairI] = currResultForPairI;

                j++;
            }
        }

    },

    DFT: function(){
    /*
     * @description:离散傅里叶变换
     * */

    },

    Matrix: function(arr,arg,arg2){
    /*
     * @descriptiont:矩阵类
     * 构造一个矩阵,当然从原始的数据构造,但具有矩阵的所有基本运算方法
     * arr参数可以为矩阵,附加字符串参数为构造的行列如 ([0,0],"3*4")    或("构造3*4的1矩阵")  ("构造3*4的0矩阵")
     * */
        const resultArr = [];

        if(arg){

            let m = 0;
            let n = 0;

            if(isNaN(arg)){
                m = /(\d+)\s*\*/.exec(arg)[1];
                n = /\*\s*(\d+)/.exec(arg)[1];
            }else{
                m = arg;
                n = arg2;
            }

            //本身二维的
            if(arr[0] && arr[0][0]){
                for(let i = 0;i < m;i ++){
                    resultArr[i] = [];
                    for(let j = 0;j < n;j ++){
                        resultArr[i][j] = arr[i][j] || 0;
                    }
                }

            //一维的
            }else{

                for(let i = 0;i < m;i ++){
                    resultArr[i] = [];
                    for(let j = 0;j < n;j ++){
                        const t = i * n + j;
                        resultArr[i][j] = arr[i * n + j] || 0;
                    }
                }

            }

            this.m = m;
            this.n = n;

        }else{
            this.m = arr.length;
            this.n = arr[0].length;
        }

        this.data = resultArr;
    },

    C: function(r,i){
    /*
     * @description:复数对象
     *
     * */
       this.r = r || 0;//实部
       this.i = i || 0;//虚部
    },

    exp: function(theta,r){//  r e^(i * theta) = r cos theta + r i * sin theta

        theta = theta || 0;
        r = r || 1;

        const tempC = new dorsyMath.C();
        tempC.r = r * Math.cos(theta);
        tempC.i = r * Math.sin(theta);
        
        return tempC;
    },

    lagrange: function(xArr,yArr){
    /*
     * Lagrange插值
     * @usage   dorsyMath.lagrange([1,2],[2,4])(3);
     * */
        const num = xArr.length;
        function getLk(x,k){//计算lk
            let omigaXk = 1;
            let omigaX = 1;
            for(let i = 0;i < num;i ++){
                if(i != k){
                    omigaXk *= xArr[k] - xArr[i];
                    omigaX *= x - xArr[i];
                }
            }
            const lk = omigaX / omigaXk;
            return lk;
        }
        const getY = function(x){
            let L = 0;
            for(let k = 0;k < num;k ++){
                const lk = getLk(x,k);
                L += yArr[k] * lk;

            }
            return L;
        };
        return getY;

    },

    applyMatrix: function(imgData,matrixArr,low){//对图象信号实行掩模算子变换 low为阈值,滤波运算

        low = low || 0;
        const data = imgData.data;
        const width = imgData.width;
        const height = imgData.height;
        const matrixSize = matrixArr.length;
        const template = new dorsyMath.Matrix(matrixArr,matrixSize,1);                    
        const tempData = [];
        const start = -(Math.sqrt(matrixSize) - 1) / 2;

        for(let i = 0,n = data.length;i < n;i += 4){
            const ii = i / 4;
            const row = parseInt(ii / width);
            const col = ii % width;
            if(row == 0 || col == 0) continue;

            const pixelArr = [[],[],[]];
            for(let k = start;k <= -start;k ++){
                const currRow = row + k;

                for(let kk = start;kk <= -start;kk ++){

                    const currCol = col + kk;
                    const currI = (currRow * width + currCol) * 4;

                    for(let j = 0;j < 3;j ++){
                        const tempI = currI + j; 
                        pixelArr[j].push(data[tempI]);
                    }

                }

            }

            const pixelMatrix = new dorsyMath.Matrix(pixelArr,3,matrixSize);
            const resultMatrix = pixelMatrix.mutiply(template);

            for(let j = 0;j < 3;j ++){
               tempData[i + j] = resultMatrix.data[j]; 
            }
            tempData[i + 4] = data[i + 4];
        }

        for(let i = 0,n = data.length;i < n;i ++){
            if(tempData[i]){
                data[i] = tempData[i] < low ? tempData[i] : data[i];
            }
        }

        return imgData;
    },

    RGBToHSI: function(R,G,B){
        let theta = ((R - G + R - B) / 2) / Math.sqrt((R - G) * (R - G) + (R - B) * (G - B)) || 0;
        theta = Math.acos(theta);
        let H = B > G ? (2 * Math.PI - theta) : theta;

        let S = 0;
        if(R + G + B > 0){
            S = 1 - 3 * Math.min(R,G,B) / (R + G + B);
        }else{
            S = 0;
        }

        const I = (R + G + B) / 3;

        if(H > 2 * Math.PI) H = 2 * Math.PI;
        if(H < 0) H = 0;

        return {
            H: H,
            S: S,
            I: I
        };

    },

    HSIToRGB: function(H,S,I){//H为弧度值
        //H (-Math.PI , Math.PI)  S (-1,1) I (-255,255)
        if(H < 0){
            H %= 2 * Math.PI;
            H += 2 * Math.PI
        }else{
            H %= 2 * Math.PI;
        }

        let R = 0;
        let G = 0;
        let B = 0;
        if(H <= Math.PI * 2 / 3){
            B = I * (1 - S);
            R = I * (1 + S * Math.cos(H) / Math.cos(Math.PI / 3 - H));
            G = 3 * I - (R + B);

        }else if(H <= Math.PI * 4 / 3){
            H = H - Math.PI * 2 / 3;

            R = I * (1 - S);
            G = I * (1 + S * Math.cos(H) / Math.cos(Math.PI / 3 - H));
            B = 3 * I - (G + R);

        }else{
            H = H - Math.PI * 4 / 3;

            G = I * (1 - S);
            B = I * (1 + S * Math.cos(H) / Math.cos(Math.PI / 3 - H));
            R = 3 * I - (G + B);

        }

        return {
            R: R,
            G: G,
            B: B
        };
    },

    applyInHSI: function(imgData, func){//在hsi空间上应用func
        /*
         * function(i){
         *      i.H += 3;
         * }
         * H (-2*Math.PI , 2 * Math.PI)  S (-1,1) I (-255,255)
         * */
        const colorMap = ["R", "Y", "G", "C", "B", "M"];
        const data = imgData.data;
        
        const d30 = Math.PI / 6;
        const d60 = Math.PI / 3;
        for(let i = 0, n = data.length; i < n; i += 4){
            const hsiObj = this.RGBToHSI(data[i], data[i + 1], data[i + 2]);

            //得到颜色属性
            const h = hsiObj.H + d30;
            const color = ~~ (h / d60);
            const rColor = colorMap[color % 6];

            func(hsiObj, rColor, data[i + 3]);

            if(hsiObj.S > 1) hsiObj.S = 1;
            if(hsiObj.S < 0) hsiObj.S = 0;

            const rgbObj = this.HSIToRGB(hsiObj.H,hsiObj.S,hsiObj.I);
            data[i] = rgbObj.R;
            data[i + 1] = rgbObj.G;
            data[i + 2] = rgbObj.B;
        }
        
    },

    applyInCoordinate: function(imgData,func){//在坐标空间上应用func
        /*
         * function(dot){
         *      
         * }
         * */
    },

    //计算两个点之间的距离
    //p1   array
    //p2   array
    distance: function(p1, p2){
        p2 = p2 || [0, 0];

        p1 = new dorsyMath.C(p1[0], p1[1]);
        p2 = new dorsyMath.C(p2[0], p2[1]);

        const p3 = p1.minus(p2);
        return p3.distance();
    },

    //将(x,y)的坐标转为单维的i
    xyToIFun: function(width){
        return function(x, y, z){
            z = z || 0;
            return (y * width + x) * 4 + z;
        };
    },

    //在(x,y)进行运算
    //rgbfun 在rgb三个上进行的操作 aFun在alpha进行的操作
    //rgbFun:   function(r, g, b){
    //      return [r, g, b]
    //     
    //}
    xyCal: function(imgData, x, y, rgbFun, aFun){
        const xyToIFun  = this.xyToIFun(imgData.width);
        const j  = xyToIFun(x, y, 0);
        const data = imgData.data;
        const processedData = rgbFun(data[j], data[j + 1], data[j + 2]);

        if(processedData){
            data[j] = processedData[0];
            data[j + 1] = processedData[1];
            data[j + 2] = processedData[2];
        }

        if(aFun){
            data[j + 3] = aFun(data[j + 3]);
        }

    }
    
};

/*
const t = dorsyMath.RGBToHSI(255,5,25);
const f = dorsyMath.HSIToRGB(t.H+2 * Math.PI,t.S,t.I);
alert(f.R + "|" + f.G + "|" + f.B);
*/
dorsyMath.Matrix.prototype = {
    /*
        m: 0,//数学上传统的m*n矩阵
        n: 0,
    */
    plus: function(matrix){
        if(this.m != matrix.m || this.n != matrix.n){
            throw new Error("矩阵加法行列不匹配");
        }


        const tempM = new dorsyMath.Matrix([],this.m,this.n);
        for(let i = 0;i < this.m;i ++){
           for(let j = 0;j < this.n;j ++){
                tempM.data[i][j] = this.data[i][j] + matrix.data[i][j];
           }
        }
        return tempM;
    },

    minus: function(matrix){
        if(this.m != matrix.m || this.n != matrix.n){
            throw new Error("矩阵减法法行列不匹配");
        }


        const tempM = new dorsyMath.Matrix([],this.m,this.n);
        for(let i = 0;i < this.m;i ++){
           for(let j = 0;j < this.n;j ++){
                tempM.data[i][j] = this.data[i][j] - matrix.data[i][j];
           }
        }
        return tempM;
    },

    mutiply: function(matrix){//左乘另一矩阵
        if(this.n != matrix.m){
            throw new Error("矩阵乘法行列不匹配");
        }


        const tempM = new dorsyMath.Matrix([],this.m,matrix.n);
        for(let i = 0;i < this.m;i ++){
           for(let j = 0;j < matrix.n;j ++){

                let sum = 0;
                for(let ii = 0;ii < this.n;ii ++){
                    sum += this.data[i][ii] * matrix.data[ii][j];
                }
                tempM.data[i][j] = sum;
           }
        }
        return tempM;

    }
};

dorsyMath.C.prototype = {
    plus: function(c){
        const tempC = new dorsyMath.C();
        tempC.r = this.r + c.r;
        tempC.i = this.i + c.i;

        return tempC;
    },
    minus:function(c){
        const tempC = new dorsyMath.C();
        tempC.r = this.r - c.r;
        tempC.i = this.i - c.i;

        return tempC;
    },
    mutiply: function(c){
        const tempC = new dorsyMath.C();
        tempC.r = this.r * c.r - this.i * c.i;
        tempC.i = this.r * c.i + this.i * c.r;

        return tempC;
    },
    divide: function(c){

        const tempC = new dorsyMath.C();

        const m = c.mutiply(c.conjugated());
        const f = this.mutiply(c.conjugated());
        tempC.r = f.r / m.r;
        tempC.i = f.i / m.r;

        return tempC;
    },
    conjugated: function(){//取共轭
        const tempC = new dorsyMath.C(this.r,-this.i);
        return tempC;
    },

    //取模
    distance: function(){
        return Math.sqrt(this.r * this.r + this.i * this.i);
    }
};

export { dorsyMath };