let dic = require("./dic.js");


function _compareCharactor(charactor1, charactor2) {
    if (charactor1 === charactor2) {
        return 0;
    } else {
        return charactor1 < charactor2 ? -1 : 1;
    }
}
/**
 * a,b是数组下标
 * 将array[a]与array[b]交换
 */
function _exchange(array, a, b) {
    var c = array[a];
    array[a] = array[b];
    array[b] = c;
}
/**
 * 将一个string倒转
 * hello->olleh
 */
function _reverse(string) {
    let arr = string.split("");
    arr.reverse();
    return arr.join("");
}

function _compareCharCode(a,b){
    if(a.charCodeAt(0)>b.charCodeAt(0)){
        return 1;
    }else if(a.charCodeAt(0)<b.charCodeAt(0)){
        return -1;
    }else{
        return 0;
    }
}
class PinYinOrder {
    constructor() {

    }

    sort(array) {
        /**
         * 将给定的数组进行元素排序
         * 注意：不会产生新的数组，会在原数组上排序
         * @returns sortedArray
         */
        for (let i = 0; i < array.length; i++) {
            let k = i;
            for (var j = i; j < array.length; j++) {
                if (this.compareWord(array[j], array[k]) < 0) {
                    k = j;
                } 
            }
            _exchange(array, i, k);
        }
        return array;
    }

    compareWord(word1, word2) {
        /**
         * @description
         * 根据拼音排序，比较两个单词，与compareInPinYin不同的是，本方法比较的是整个单词
         * 把单词的每一个字的首字母拿出来进行比对，同音的情况，两个字的小于三个字
         * @returns
         * 如果word1排在word12前面，返回-1，反之返回1，相等返回0
         * @example
         * 曹山===曹珊===曹水（都是C,S）
         * 曹山<曹山山（两个字的小于三个字的）
         */
        let weightMagicNumber=100;//权重值
        let weightOfWord1 = 1;
        let weightOfWord2 = 1;
        let i = word1.length > word2.length ? word1.length : word2.length;
        let returnValueBetweenFirstCharactor = this.compareInPinYin(word1[0], word2[0]);
        if(returnValueBetweenFirstCharactor!=0){
            //如果第一个字不相等，则直接返回结果
            return returnValueBetweenFirstCharactor;
        }
        for (let j = 0; j < i; j++) {
            if (!word1[j]) {
                weightOfWord2+=weightOfWord2+Math.pow(weightMagicNumber,(i-j))
                break;
            }
            if (!word2[j]){
                weightOfWord1+=weightOfWord1+Math.pow(weightMagicNumber,(i-j))
                break;
            }
            if (this.compareInPinYin(word1[j], word2[j]) > 0) {
                weightOfWord1+=weightOfWord1+Math.pow(weightMagicNumber,(i-j))
            } else if (this.compareInPinYin(word1[j], word2[j]) < 0) {
                weightOfWord2+=weightOfWord2+Math.pow(weightMagicNumber,(i-j))
            }
        }

        if (weightOfWord1 > weightOfWord2) {
            return 1;
        } else if (weightOfWord1 < weightOfWord2) {
            return -1;
        } else {
            return 0;
        }

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

        let sourceCharactorPinyin = this.getCharactorFirstPinYinWorld(charactor1);
        let targetCharactorPinyin = this.getCharactorFirstPinYinWorld(charactor2);

        if (sourceCharactorPinyin && targetCharactorPinyin) {
            let pinyinCompareResult = _compareCharactor(sourceCharactorPinyin, targetCharactorPinyin);
            if(pinyinCompareResult==0){
                return _compareCharCode(charactor1,charactor2);
            }
            return pinyinCompareResult;
        } else if (!sourceCharactorPinyin && targetCharactorPinyin) {
            return 1;
        } else if (sourceCharactorPinyin && !targetCharactorPinyin) {
            return -1
        } else {
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

        if (("A" <= charactor[0] && charactor[0] <= "Z") || ("a" <= charactor[0] && charactor[0] <= "z")) {
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

if (typeof window != 'undefined') {
    window.PinYinOrder = PinYinOrder;
}

module.exports = PinYinOrder;