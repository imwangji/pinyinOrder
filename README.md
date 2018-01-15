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

**只排序词组的第一个字（或字母）**

```javascript 
var notSort = ['我','爱','你','#张韶涵','swift'];
var sorted = ['swift','爱','你','我','#张韶涵'];
```



# 文档

现在是1.0版，仅有几个常用方法：

## sort(array)
> 功能：将给定的数组进行排序
> 说明：不会产生新的数组，会操作给的数组，慎重。


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

