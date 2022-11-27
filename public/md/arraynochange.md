    **不改变原数组的方法(8个):**

**ES5:**

1. `join`
2. `toLocateString`
3. `toStrigin`
4. `slice`
5. `cancat`
6. `indexOf`
7. `lastIndexOf`、

**ES7:**

`includes`

1. **join() 数组转字符串**

定义： `join()`方法用于把数组中的所有元素通过指定的分隔符进行分隔放入一个字符串，返回生成的字符串。

语法： array.join(str)

参数:

`str`(可选): 指定要使用的分隔符，默认使用逗号作为分隔符。

```

let a = ['hello','world'];


let str = a.join();

// 'hello,world'


let str2 = a.join('+');

// 'hello+world'

```

使用join方法或者下文说到的toString方法时，当数组中的元素也是数组或者是对象时会出现什么情况？

```

let a = [

    ['OBKoro1','23'],'test'

];

let str1 = a.join();

// OBKoro1,23,test


let b = [{name:'OBKoro1',age:'23'},'test'];


let str2 = b.join();

// [object Object],test


// 对象转字符串推荐JSON.stringify(obj);

```

所以，`join()`/`toString()`方法在数组元素是数组的时候，会将里面的数组也调用join()/toString(),如果是对象的话，对象会被转为\[object Object\]字符串。

2. **toLocaleString() 数组转字符串**

定义： 返回一个表示数组元素的字符串。该字符串由数组中的每个元素的 `toLocaleString()`返回值经调用 join() 方法连接（由逗号隔开）组成。

语法： array.toLocaleString()

参数：无。

```

let a = [

    {name:'OBKoro1'},23,'abcd',new Date()

];


let str=a.toLocaleString();

// [object Object],23,abcd,2018/5/28 下午1:52:20 

```

如上述栗子：调用数组的 `toLocaleString`方法，数组中的每个元素都会调用自身的 `toLocaleString`方法，对象调用对象的 `toLocaleString`,`Date`调用 `Date`的 `toLocaleString`。

3. **toString() 数组转字符串 不推荐**

定义： `toString()`方法可把数组转换为由逗号链接起来的字符串。

语法： array.toString()

参数: 无。

该方法的效果和join方法一样，都是用于数组转字符串的，但是与join方法相比没有优势，也不能自定义字符串的分隔符，因此不推荐使用。

值得注意的是：当数组和字符串操作的时候，js 会调用这个方法将数组自动转换成字符串

```

let b = [ 'toString','演示'].toString();

// toString,演示


let a= ['调用toString','连接在我后面']+'啦啦啦';

// 调用toString,连接在我后面啦啦啦

```

4. **slice() 浅拷贝数组的元素**

定义： 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象，且原数组不会被修改。

注意： 字符串也有一个 `slice()`方法是用来提取字符串的，不要弄混了。

语法： array.slice(begin, end);

参数:

`begin`(可选)： 索引数值,接受负值，从该索引处开始提取原数组中的元素,默认值为0。

`end`(可选)： 索引数值(不包括),接受负值，在该索引处前结束提取原数组元素，默认值为数组末尾(包括最后一个元素)。

```

let a = ['hello','world'];

let b = a.slice(0,1);

// ['hello']


a[0] = '改变原数组';

console.log(a,b); 

// ['改变原数组','world'] ['hello']


b[0] = '改变拷贝的数组';

console.log(a,b);

// ['改变原数组','world'] ['改变拷贝的数组']

```

如上：新数组是浅拷贝的，元素是简单数据类型，改变之后不会互相干扰。

如果是复杂数据类型(对象,数组)的话，改变其中一个，另外一个也会改变。

```

let a = [{name:'OBKoro1'}];

let b = a.slice();

console.log(b,a); // [{"name":"OBKoro1"}] [{"name":"OBKoro1"}]

// a[0].name = '改变原数组';


// console.log(b,a);

// [{"name":"改变原数组"}] [{"name":"改变原数组"}]


// b[0].name = '改变拷贝数组',b[0].koro='改变拷贝数组';

// [{"name":"改变拷贝数组","koro":"改变拷贝数组"}] [{"name":"改变拷贝数组","koro":"改变拷贝数组"}]

```

原因在定义上面说过了的：`slice()`是浅拷贝，对于复杂的数据类型浅拷贝，拷贝的只是指向原数组的指针，所以无论改变原数组，还是浅拷贝的数组，都是改变原数组的数据。

**深拷贝**

```

this.brandsAss  =  JSON.parse(JSON.stringify(res.brands))

<!-- this.brandsAss 为深拷贝出来的数组 -->

<!-- res.brands 为要深拷贝出来的原数组 -->

```

5. **cancat**

定义： 方法用于合并两个或多个数组，返回一个新数组。

语法： var newArr =oldArray.concat(arrayX,arrayX,......,arrayX)

参数：

`arrayX`（必须）：该参数可以是具体的值，也可以是数组对象。可以是任意多个。

eg1:

```

let a = [1, 2, 3];

let b = [4, 5, 6];

// 连接两个数组

let newVal = a.concat(b); 

// [1,2,3,4,5,6]


// 连接三个数组

let c = [7, 8, 9]

let newVal2 = a.concat(b, c);

 // [1,2,3,4,5,6,7,8,9]


// 添加元素

let newVal3 = a.concat('添加元素',b, c,'再加一个'); 

// [1,2,3,"添加元素",4,5,6,7,8,9,"再加一个"]


// 合并嵌套数组 会浅拷贝嵌套数组

let d = [1,2 ];

let f = [3,[4]];

let newVal4 = d.concat(f); // [1,2,3,[4]]

```

ES6扩展运算符...合并数组：

因为ES6的语法更简洁易懂，所以现在合并数组我大部分采用...来处理，...运算符可以实现cancat的每个栗子，且更简洁和具有高度自定义数组元素位置的效果。

```

let a = [2, 3, 4, 5]

let b = [ 4,...a, 4, 4]

console.log(a,b);

// [2, 3, 4, 5] [4,2,3,4,5,4,4]

```

更多关于扩展符的详细内容移步阮一峰大神的[ECMAScript 6 入门](http://es6.ruanyifeng.com/#docs/array#%E6%89%A9%E5%B1%95%E8%BF%90%E7%AE%97%E7%AC%A6)

6. **indexOf() 查找数组是否存在某个元素，返回下标**

定义： 返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。

语法： array.indexOf(searchElement,fromIndex)

参数:

`searchElement`(必须):被查找的元素

`fromIndex`(可选):开始查找的位置(不能大于等于数组的长度，返回-1)，接受负值，默认值为0。

严格相等的搜索:

数组的 `indexOf`搜索跟字符串的 `indexOf`不一样,数组的 `indexOf`使用严格相等===搜索元素，即数组元素要完全匹配才能搜索成功。

#### **注意：indexOf()不能识别NaN**

eg:

```

let a = ['啦啦',2,4,24,NaN]

console.log(a.indexOf('啦')); // -1 

console.log(a.indexOf('NaN')); // -1 

console.log(a.indexOf('啦啦')); // 0

```

使用场景：

1. [数组去重](https://juejin.im/post/5aad40e4f265da237f1e12ed#heading-10)
2. 根据获取的数组下标执行操作，改变数组中的值等。
3. 判断是否存在，执行操作。
4. **lastIndexOf() 查找指定元素在数组中的最后一个位置**

定义： 方法返回指定元素,在数组中的最后一个的索引，如果不存在则返回 -1。（从数组后面往前查找）

语法： arr.lastIndexOf(searchElement,fromIndex)

参数:

`searchElement`(必须): 被查找的元素

`fromIndex`(可选): 逆向查找开始位置，默认值数组的长度-1，即查找整个数组。

关于fromIndex有三个规则:

1、 正值。如果该值大于或等于数组的长度，则整个数组会被查找。

2、 负值。将其视为从数组末尾向前的偏移。(比如-2，从数组最后第二个元素开始往前查找)

3、 负值。其绝对值大于数组长度，则方法返回 -1，即数组不会被查找。

```

let a = ['OB',4,'Koro1',1,2,'Koro1',3,4,5,'Koro1'];

// 数组长度为10


// let b = a.lastIndexOf('Koro1',4); 

// 从下标4开始往前找 返回下标2


// let b = a.lastIndexOf('Koro1',100); 

// 大于或数组的长度 查找整个数组 返回9


// let b = a.lastIndexOf('Koro1',-11); 

// -1 数组不会被查找


let b = a.lastIndexOf('Koro1',-9);

// 从第二个元素4往前查找，没有找到 返回-1

```

8. **ES7 includes() 查找数组是否包含某个元素 返回布尔**

定义： 返回一个布尔值，表示某个数组是否包含给定的值

语法： array.includes(searchElement,fromIndex=0)

参数：

`searchElement`(必须):被查找的元素

`fromIndex`(可选):默认值为0，参数表示搜索的起始位置，接受负值。正值超过数组长度，数组不会被搜索，返回false。负值绝对值超过长数组度，重置从0开始搜索。

includes方法是为了弥补indexOf方法的缺陷而出现的:

1. indexOf方法不能识别NaN
2. indexOf方法检查是否包含某个值不够语义化，需要判断是否不等于-1，表达不够直观

eg:

```

let a = ['OB','Koro1',1,NaN];

// let b = a.includes(NaN); 

// true 识别NaN


// let b = a.includes('Koro1',100); 

// false 超过数组长度 不搜索


// let b = a.includes('Koro1',-3); 

// true 从倒数第三个元素开始搜索


// let b = a.includes('Koro1',-100);

 // true 负值绝对值超过数组长度，搜索整个数组

```

#### **兼容性(MDN): chrome47, Firefox 43,Edge 14,Opera 34, Safari 9,IE 未实现。**
