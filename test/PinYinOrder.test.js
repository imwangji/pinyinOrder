let PinYinOrder = require("../src/PinYinOrder");

describe('测试拼音排序', () => {
    let piyinOrder;
    beforeEach(function () {
        piyinOrder = new PinYinOrder();
    })

    /**
     * checkCharactorIsChinese方法
     * 输入一个参数，返回这个参数的第一个字符是不是汉字
     */
    describe('checkCharactorIsChinese方法', () => {
        it('可以使用checkCharactorIsChinese方法', () => {
            expect(piyinOrder.checkCharactorIsChinese).toBeDefined();
        });
        it('检测汉字', () => {
            expect(piyinOrder.checkCharactorIsChinese('一')).toBe(true);
        });
        it('检测数字', () => {
            expect(piyinOrder.checkCharactorIsChinese(2)).toBe(false);
        });
        it('检测英语字母', () => {
            expect(piyinOrder.checkCharactorIsChinese('a')).toBe(false);
        });
        it('检测特殊字符', () => {
            expect(piyinOrder.checkCharactorIsChinese('&')).toBe(false);
        });
        it('检测数字形式的字符', () => {
            expect(piyinOrder.checkCharactorIsChinese('2')).toBe(false);
        });
        it('检测输入多个数字形式的字符', () => {
            expect(piyinOrder.checkCharactorIsChinese('2333')).toBe(false);
        });
        it('检测输入多个汉字', () => {
            expect(piyinOrder.checkCharactorIsChinese('一二三')).toBe(true);
        });
        it('检测输入多个数字', () => {
            expect(piyinOrder.checkCharactorIsChinese(2233)).toBe(false);
        });
        it('检测输入多个英语字母', () => {
            expect(piyinOrder.checkCharactorIsChinese('abcc')).toBe(false);
        });
        it('检测输入多个特殊字符', () => {
            expect(piyinOrder.checkCharactorIsChinese('&*&……¥')).toBe(false);
        });
        it('混合输入，只判断第一个字符', () => {
            expect(piyinOrder.checkCharactorIsChinese('超级马力 is me')).toBe(true);
            expect(piyinOrder.checkCharactorIsChinese('I am 超级玛丽')).toBe(false);
        });
    });


    /**getCharactorFirstPinYinWorld
        * @param 字符串
        * 查询一个字的拼音首字母：
        * 如果是汉字，返回拼音首字母，
        * 如果是英文，返回首字母的大写，
        * 如果是特殊字符，返回false
        */

    describe('getCharactorFirstPinYinWorld方法', () => {
        it('汉字词或者字，可以正确返回其首个字的拼音首字母', () => {
            expect(piyinOrder.getCharactorFirstPinYinWorld("我是天才")).toBe("w");
            expect(piyinOrder.getCharactorFirstPinYinWorld("爱")).toBe("a");
        });
        it('英文字母或者词，返回首字母的大写形式', () => {
            expect(piyinOrder.getCharactorFirstPinYinWorld("love")).toBe("L");
            expect(piyinOrder.getCharactorFirstPinYinWorld("system manager")).toBe("S");
        });
        it('数字或者特殊符号，返回false', () => {
            expect(piyinOrder.getCharactorFirstPinYinWorld("2")).toBe(false);
            expect(piyinOrder.getCharactorFirstPinYinWorld("9829")).toBe(false);
            expect(piyinOrder.getCharactorFirstPinYinWorld("*&&……")).toBe(false);
            expect(piyinOrder.getCharactorFirstPinYinWorld("！")).toBe(false);
            expect(piyinOrder.getCharactorFirstPinYinWorld(2)).toBe(false);
            expect(piyinOrder.getCharactorFirstPinYinWorld(233)).toBe(false);

        });
    });


    /**
     * compareInPinYin(sourceValue,targetValue)
     * 可以将两个传入的值进行比较，仅比较两个值的首字母
     * 相等返回0
     * sourceValue比较小的话，返回小于0的值
     * targetValue比较小的话，返回大于0的值
     */
    describe('可以将两个传入的值进行比较', () => {
        it('可以比较两个汉字', () => {
            expect(piyinOrder.compareInPinYin("我","你")).toBe(1);
        });
        it('英文字符排在汉字前面', () => {
            expect(piyinOrder.compareInPinYin("a","爱")).toBe(-1);
        });
        it('可以比较单词，但是仅比较第一个字符', () => {
            expect(piyinOrder.compareInPinYin("admin","管理员")).toBe(-1);
            expect(piyinOrder.compareInPinYin("管理员","经销商")).toBe(-1);
        });
        it('特殊字符排在汉字后面', () => {
            expect(piyinOrder.compareInPinYin("#","管理员")).toBe(1);
            expect(piyinOrder.compareInPinYin("经销商","*&&%￥")).toBe(-1);
        });
    });

    describe('比较两个单词', () => {
        it('英文单词始终小于汉字单词', () => {
            expect(piyinOrder.compareWord("资源","资南")).toBe(1);
            expect(piyinOrder.compareWord("招商","资源")).toBe(-1);
            expect(piyinOrder.compareWord("a","资源")).toBe(-1);
            expect(piyinOrder.compareWord("资源池","资源")).toBe(1);
            expect(piyinOrder.compareWord("资源池","资源啊")).toBe(1);
            expect(piyinOrder.compareWord("admin","Dashboard")).toBe(-1);
            expect(piyinOrder.compareWord("系统管理员","末位资源筛选")).toBe(1);

        });
    });

    describe('sort方法将数组排序', () => {
        it('混合排序一下试试', () => {
            let arr = ["曹珊","曹珊珊","资源池","资源查看","Dashbord","admin"];
            piyinOrder.sort(arr);
            expect(arr[0]).toBe("admin");
            expect(arr[1]).toBe("Dashbord");
            expect(arr[2]).toBe("曹珊");
            expect(arr[3]).toBe("曹珊珊");
            expect(arr[4]).toBe("资源池");
            expect(arr[5]).toBe("资源查看");
        });
        it('混合排序一下试试', () => {
            let arr = ["系统管理员","末位资源筛选"];
            piyinOrder.sort(arr);
            expect(arr[0]).toBe("末位资源筛选");
            expect(arr[1]).toBe("系统管理员");
        });
    });
});