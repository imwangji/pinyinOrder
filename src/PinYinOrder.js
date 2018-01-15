let dic = require("./dic.js");


function _compareCharactor(charactor1,charactor2){
    if(charactor1===charactor2){
        return 0;
    }else{
        return charactor1<charactor2?-1:1;
    }
}
/**
 * a,b是数组下标
 * 将array[a]与array[b]交换
 */
function _exchange(array,a,b){
    var c = array[a];
    array[a] = array[b];
    array[b] = c;
}

class PinYinOrder {
    constructor() {

    }

    sort(array){
        /**
         * 将给定的数组进行元素排序
         * 注意：不会产生新的数组，会在原数组上排序
         * @returns sortedArray
         */
        for(let i=0;i<array.length;i++){
            let k = i;
            for(var j=i;j<array.length;j++){
                if(this.compareInPinYin(array[j],array[k])<0){
                    k=j;
                }
            }
            _exchange(array,i,k);
        }
        return array;
    }

    compareInPinYin(charactor1, charactor2) {
        /**
         * @description
         * 根据拼音排序，比较两个字符串或者字符，如果是字符串，只比较第一个字符；
         * 英文字符排在汉字前面,
         * 特殊字符排在最后
         * @returns
         * 如果charactor1排在charactor2前面，返回-1，反之返回1，相等返回0
         */
        
        let sourceCharactor = this.getCharactorFirstPinYinWorld(charactor1);
        let targetCharactor = this.getCharactorFirstPinYinWorld(charactor2);

        if(sourceCharactor&&targetCharactor){
            return _compareCharactor(sourceCharactor,targetCharactor);
        }else if(!sourceCharactor&&targetCharactor){
            return 1;
        }else if(sourceCharactor&&!targetCharactor){
            return -1
        }else{
            return 0
        }

    }
    
    getCharactorFirstPinYinWorld(charactor) {
        /**@description
         * 得到一个字符的拼音首字母
         * @param 字符串或者字
         * @returns
         * 如果是汉字，返回拼音首字母，
         * 如果是英文，返回首字母的大写，
         * 如果是特殊字符，返回false
         */
        for (let key in dic) {
            if (dic[key].indexOf(charactor[0]) >= 0) {
                return key;
            }
        }

        if(("A"<=charactor[0]&&charactor[0]<="Z")||("a"<=charactor[0]&&charactor[0]<="z")){
            return charactor[0].toUpperCase();
        }

        return false
    }
    checkCharactorIsChinese(input) {
        /**
         * @description 
         * 输入一个参数，返回这个参数的第一个字符是不是汉字
         * 
         * 注意：只判断第一个字符。
         * “I am 超级玛丽”，返回false，第一个字符为“I”
         * “超级玛丽 is me”，返回true，第一个字符为“超”
         */

        //在unicode编码中，汉字的第一个字符位置是0x4e00，转换为十进制是19968
        //最后一个汉字位置是0x9fff，转换为十进制是40959
        //由于操作系统字库的原因，其实从19968到40959之间有很多字是显示不出来的，会显示为一个方块
        let charactor = input.toString();
        return 19968 <= charactor.charCodeAt(0) && charactor.charCodeAt(0) <= 40959;
    }
}

if(window){
    window.PinYinOrder=PinYinOrder;
}

module.exports=PinYinOrder;