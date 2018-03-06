let PinYinOrder = require("../src/PinYinOrder");

describe('测试拼音排序', () => {
    let pinyinOrder;
    beforeEach(function () {
        pinyinOrder = new PinYinOrder();
    })

    /**
     * checkCharactorIsChinese方法
     * 输入一个参数，返回这个参数的第一个字符是不是汉字
     */
    xdescribe('checkCharactorIsChinese方法', () => {
        it('可以使用checkCharactorIsChinese方法', () => {
            expect(pinyinOrder.checkCharactorIsChinese).toBeDefined();
        });
        it('检测汉字', () => {
            expect(pinyinOrder.checkCharactorIsChinese('一')).toBe(true);
        });
        it('检测数字', () => {
            expect(pinyinOrder.checkCharactorIsChinese(2)).toBe(false);
        });
        it('检测英语字母', () => {
            expect(pinyinOrder.checkCharactorIsChinese('a')).toBe(false);
        });
        it('检测特殊字符', () => {
            expect(pinyinOrder.checkCharactorIsChinese('&')).toBe(false);
        });
        it('检测数字形式的字符', () => {
            expect(pinyinOrder.checkCharactorIsChinese('2')).toBe(false);
        });
        it('检测输入多个数字形式的字符', () => {
            expect(pinyinOrder.checkCharactorIsChinese('2333')).toBe(false);
        });
        it('检测输入多个汉字', () => {
            expect(pinyinOrder.checkCharactorIsChinese('一二三')).toBe(true);
        });
        it('检测输入多个数字', () => {
            expect(pinyinOrder.checkCharactorIsChinese(2233)).toBe(false);
        });
        it('检测输入多个英语字母', () => {
            expect(pinyinOrder.checkCharactorIsChinese('abcc')).toBe(false);
        });
        it('检测输入多个特殊字符', () => {
            expect(pinyinOrder.checkCharactorIsChinese('&*&……¥')).toBe(false);
        });
        it('混合输入，只判断第一个字符', () => {
            expect(pinyinOrder.checkCharactorIsChinese('超级马力 is me')).toBe(true);
            expect(pinyinOrder.checkCharactorIsChinese('I am 超级玛丽')).toBe(false);
        });
    });


    /**getCharactorFirstPinYinWorld
        * @param 字符串
        * 查询一个字的拼音首字母：
        * 如果是汉字，返回拼音首字母，
        * 如果是英文，返回首字母的大写，
        * 如果是特殊字符，返回false
        */

    xdescribe('getCharactorFirstPinYinWorld方法', () => {
        it('汉字词或者字，可以正确返回其首个字的拼音首字母', () => {
            expect(pinyinOrder.getCharactorFirstPinYinWorld("我是天才")).toBe("w");
            expect(pinyinOrder.getCharactorFirstPinYinWorld("爱")).toBe("a");
        });
        it('英文字母或者词，返回首字母的大写形式', () => {
            expect(pinyinOrder.getCharactorFirstPinYinWorld("love")).toBe("L");
            expect(pinyinOrder.getCharactorFirstPinYinWorld("system manager")).toBe("S");
        });
        it('数字或者特殊符号，返回false', () => {
            expect(pinyinOrder.getCharactorFirstPinYinWorld("2")).toBe(false);
            expect(pinyinOrder.getCharactorFirstPinYinWorld("9829")).toBe(false);
            expect(pinyinOrder.getCharactorFirstPinYinWorld("*&&……")).toBe(false);
            expect(pinyinOrder.getCharactorFirstPinYinWorld("！")).toBe(false);
            expect(pinyinOrder.getCharactorFirstPinYinWorld(2)).toBe(false);
            expect(pinyinOrder.getCharactorFirstPinYinWorld(233)).toBe(false);

        });
    });


    /**
     * compareInPinYin(sourceValue,targetValue)
     * 可以将两个传入的值进行比较，仅比较两个值的首字母
     * 相等返回0
     * sourceValue比较小的话，返回小于0的值
     * targetValue比较小的话，返回大于0的值
     */
    xdescribe('可以将两个传入的值进行比较', () => {
        it('可以比较两个汉字', () => {
            expect(pinyinOrder.compareInPinYin("我", "你")).toBe(1);
        });
        it('英文字符排在汉字前面', () => {
            expect(pinyinOrder.compareInPinYin("a", "爱")).toBe(-1);
        });
        it('可以比较单词，但是仅比较第一个字符', () => {
            expect(pinyinOrder.compareInPinYin("admin", "管理员")).toBe(-1);
            expect(pinyinOrder.compareInPinYin("管理员", "经销商")).toBe(-1);
        });
        it('特殊字符排在汉字后面', () => {
            expect(pinyinOrder.compareInPinYin("#", "管理员")).toBe(1);
            expect(pinyinOrder.compareInPinYin("经销商", "*&&%￥")).toBe(-1);
        });
    });

    xdescribe('比较两个单词', () => {
        it('英文单词始终小于汉字单词', () => {
            expect(pinyinOrder.compareWord("资源", "资南")).toBe(1);
            expect(pinyinOrder.compareWord("招商", "资源")).toBe(-1);
            expect(pinyinOrder.compareWord("a", "资源")).toBe(-1);
            expect(pinyinOrder.compareWord("资源池", "资源")).toBe(1);
            expect(pinyinOrder.compareWord("资源池", "资源啊")).toBe(1);
            expect(pinyinOrder.compareWord("admin", "Dashboard")).toBe(-1);
            expect(pinyinOrder.compareWord("系统管理员", "末位资源筛选")).toBe(1);

        });
    });

    xdescribe('sort方法将数组排序', () => {
        it('混合排序一下试试', () => {
            let arr = ["曹珊", "曹珊珊", "资源池", "资源查看", "Dashbord", "admin"];
            pinyinOrder.sort(arr);
            expect(arr[0]).toBe("admin");
            expect(arr[1]).toBe("Dashbord");
            expect(arr[2]).toBe("曹珊");
            expect(arr[3]).toBe("曹珊珊");
            expect(arr[4]).toBe("资源池");
            expect(arr[5]).toBe("资源查看");
        });
        it('混合排序一下试试', () => {
            let arr = ["系统管理员", "末位资源筛选"];
            pinyinOrder.sort(arr);
            expect(arr[0]).toBe("末位资源筛选");
            expect(arr[1]).toBe("系统管理员");
        });
        it('发现Bug:末排在了投的后面', () => {
            let arr = ["投标明细查看", "末位资源筛选"];
            pinyinOrder.sort(arr);
            expect(arr[0]).toBe("末位资源筛选");
            expect(arr[1]).toBe("投标");
        });
    });

    describe('第二个bug，招标中间插入了中标', () => {
        let pinyinOrder;
        beforeEach(function () {
            pinyinOrder = new PinYinOrder();
        })

        it('第二个bug，招标中间插入了中标', () => {
            var s = "Dashboard（部门），Dashboard（平台），标签编辑，操作历史查看，废标，废标审核，公告管理，供应商V码编辑，供应商冻结/解冻，供应商淘汰（部门），供应商淘汰（平台），供应商移出（部门），框架合同发起（模型），末位资源筛选，评标进度查看，启动评价，投标明细查看，推送法务，系统管理员，议价，招标报表查看（部门），招标报表查看（平台），招标报表导出，招标报告下载，招标创建，中标结果二审，中标结果发布，中标结果一审，招标交互信息查看，招标交互信息发送，招标交互信息公开，招标列表查看，招标审核，招标详情查看，招标重启，资源报表查看（部门），资源报表查看（平台），资源报表导出，资源分类修改，资源列表查看（部门），资源列表查看（平台），资源入驻审核，资源详情查看";    
            var arr = s.split("，");
            console.log(arr);    

            // arr.push("Dashboard（部门）")
            // arr.push("Dashboard（平台）")
            // arr.push("标签编辑")
            // arr.push("操作历史查看")
            // arr.push("废标")
            // arr.push("废标审核")
            // arr.push("公告管理")
            // arr.push("操作历史查看")
            // arr.push("操作历史查看")
            // arr.push("操作历史查看")
            console.log("===============================================")
            pinyinOrder.sort(arr);
            console.log(arr);                
            // expect(arr[0]).toBe("招标");
            // expect(arr[1]).toBe("中标");
        });
    });
});