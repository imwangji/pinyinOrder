# 更新
## 1.5.1
> 修复了两个bug
## 1.3
> sort排序现在不光排序首个文字，是整个词组的排序



# 使用

## npm安装

```
npm install --save pinyin-order
```



## 传统浏览器方式

用`script`标签在html页面中引入`dist`目录下的`PinYinOrder.bundle.js`文件。

实例化一个PinYinOrder()对象。

```javascript
var pinyin = new PinYinOrder();
```

排序（具体规则请看下面）

```javascript
pinyin.compareInPinYin("你","爱")//返回1
```



# 排序规则

**英文<汉字<特殊字符**
**如果遇到两个字的首字母相等的情况，比如“招”和“资”，会根据两个字符的unicode码进行排序**
**空字符串排在最后**


# 文档


## sort(array)
> 功能：将给定的数组进行排序  
> 说明：不会产生新的数组，会操作给的数组，慎重。  
> 如果遇到两个字的首字母相等的情况，比如“招”和“资”，会根据两个字符的unicode码进行排序  
> 接着会对比第二个字，直到所有字排序完成，如果同样的文字，两个字排在三个字前面，比如
> “曹珊”排在“曹珊珊”前面

```javascript

let arr = ["曹珊","曹珊珊","资源池","资源查看","Dashbord","admin"];
//排序后
//["admin", "Dashbord", "曹珊", "曹珊珊", "资源池", "资源查看"]
```

## compareWord(a,b)
> 功能：将两个词进行排序  
> 排序规则：先比对第一个词的拼音首字母，如果首字母一样，比对第一个字的unicode码，然后比对第二个字的首字母和unicode码……直到结束。两个字的排序在三个字之前，比如“曹珊”排在“曹珊珊”前面
> 如果空字符串是排在最后的


## compareInPinYin(a,b)

> 功能：按照拼音首字母排序方式来比较a和b。
>
> 说明：这个方法接受两个参数，并且对这两个参数进行排序，
>
> 若a排在b前面，返回-1
>
> 若a排在b后面，返回1
>
> 若相等，返回0  
>
> 如果遇到两个字的首字母相等的情况，比如“招”和“资”，会根据两个字符的unicode码进行排序

```javascript
pinyin.compareInPinYin("admin","管理员")//-1
pinyin.compareInPinYin("我","你")//1
pinyin.compareInPinYin("经销商","*&&%￥")//-1
```



## getCharactorFirstPinYinWorld(a)

> 功能：返回一个汉字的拼音首字母
>
> 说明：接受一个参数，这个参数可以是字符串，也可以仅仅是一个字符，**总之只会取这个参数的第一个字符**。
>
> 如果是数字，返回false，如果是英文，返回首个字母的大写字母。

```Javascript
piyinOrder.getCharactorFirstPinYinWorld("我是天才")//'w'
piyinOrder.getCharactorFirstPinYinWorld("天")//'t'
piyinOrder.getCharactorFirstPinYinWorld("222")//false
piyinOrder.getCharactorFirstPinYinWorld(100)//false
piyinOrder.getCharactorFirstPinYinWorld("hello")//'H'
piyinOrder.getCharactorFirstPinYinWorld("s")//'S'
```



## checkCharactorIsChinese(a)

> 功能：判断传入的参数是不是汉字
>
> 返回：true或false
>
> 说明：无论参数是字符还是字符串，方法只会截取其第一个字符进行判断。

```javascript
piyinOrder.checkCharactorIsChinese('&')//false
piyinOrder.checkCharactorIsChinese('一')//true
piyinOrder.checkCharactorIsChinese('超级马力 is me')//true
piyinOrder.checkCharactorIsChinese('I am 超级玛丽')//false
piyinOrder.checkCharactorIsChinese('987')//false
```

