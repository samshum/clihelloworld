**遍历方法(12个):**

js中遍历数组并不会改变原始数组的方法总共有12个:

**ES5:**

`forEach`、`every` 、`some`、 `fliter`、`map`、`reduce`、`reduceRight`、

**ES6**

`find`、`findIndex`、`keys`、`values`、`entries`

**关于遍历：**

* 关于遍历的效率，可以看一下这篇[详解JS遍历](http://louiszhai.github.io/2015/12/18/traverse/#%E6%B5%8B%E8%AF%95%E5%90%84%E6%96%B9%E6%B3%95%E6%95%88%E7%8E%87)
* 尽量不要在遍历的时候，修改后面要遍历的值
* 尽量不要在遍历的时候修改数组的长度（删除/添加）

forEach

定义: 按升序为数组中含有效值的每一项执行一次回调函数。

语法：

array.forEach(function(currentValue, index, arr), thisValue)

参数:

function(必须): 数组中每个元素需要调用的函数。

&gt;[info] 回调函数的参数

&gt;&gt;[success] 1. currentValue(必须),数组当前元素的值

&gt;&gt; 2. index(可选), 当前元素的索引值

&gt;&gt; 3. arr(可选),数组对象本身

hisValue(可选): 当执行回调函数时this绑定对象的值，默认值为undefined

**关于forEach()你要知道：**

* 无法中途退出循环，只能用return退出本次回调，进行下一次回调。
* 它总是返回 undefined值,即使你return了一个值。

**下面类似语法同样适用这些规则**

&gt;[info] 1. 对于空数组是不会执行回调函数的

&gt; 2. 对于已在迭代过程中删除的元素，或者空元素会跳过回调函数

&gt; 3. 遍历次数再第一次循环前就会确定，再添加到数组中的元素不会被遍历。

&gt; 4. 如果已经存在的值被改变，则传递给 callback 的值是遍历到他们那一刻的值。

eg:

```

let a = [1, 2, ,3]; 

// 最后第二个元素是空的，不会遍历(undefined、null会遍历)


let obj = { name: 'OBKoro1' };

let result = a.forEach(function (value, index, array) { 

  a[3] = '改变元素';

  a.push('添加到尾端，不会被遍历')


  console.log(value, 'forEach传递的第一个参数');

  // 分别打印 1 ,2 ,改变元素


  console.log(this.name); // OBKoro1 打印三次 this绑定在obj对象上

  // break; // break会报错


  return value; // return只能结束本次回调 会执行下次回调

  console.log('不会执行，因为return 会执行下一次循环回调')

}, obj);

console.log(result); 

// 即使return了一个值,也还是返回undefined

// 回调函数也接受接头函数写法

```

**every 检测数组所有元素是否都符合判断条件**

定义: 方法用于检测数组所有元素是否都符合函数定义的条件

语法：

array.every(function(currentValue, index, arr), thisValue)

参数:(这几个方法的参数，语法都类似)

function(必须): 数组中每个元素需要调用的函数。

&gt;[info]回调函数的参数

&gt;&gt;[success] 1. currentValue(必须),数组当前元素的值

&gt;&gt; 2. index(可选), 当前元素的索引值

&gt;&gt; 3. arr(可选),数组对象本身

thisValue(可选): 当执行回调函数时this绑定对象的值，默认值为undefined

方法返回值规则:

1. 如果数组中检测到有一个元素不满足，则整个表达式返回 false，且剩余的元素不会再进行检测。
2. 如果所有元素都满足条件，则返回 true。

eg:

```

function isBigEnough(element, index, array) { 

 return element >= 10; // 判断数组中的所有元素是否都大于10

}

let result = [12, 5, 8, 130, 44].every(isBigEnough); 

// false


let result = [12, 54, 18, 130, 44].every(isBigEnough);

// true


// 接受箭头函数写法 

[12, 5, 8, 130, 44].every(x => x >= 10); // false

[12, 54, 18, 130, 44].every(x => x >= 10); // true

```

**some 数组中的是否有满足判断条件的元素**

定义：数组中的是否有满足判断条件的元素

语法：

array.some(function(currentValue, index, arr), thisValue)

参数:(这几个方法的参数，语法都类似)

function(必须): 数组中每个元素需要调用的函数。

&gt;[info] 回调函数的参数

&gt;&gt;[success]1. currentValue(必须),数组当前元素的值

&gt;&gt;2. index(可选), 当前元素的索引值

&gt;&gt;3. arr(可选),数组对象本身

thisValue(可选): 当执行回调函数时this绑定对象的值，默认值为undefined

方法返回值规则：

1. 如果有一个元素满足条件，则表达式返回true, 剩余的元素不会再执行检测。
2. 如果没有满足条件的元素，则返回false。

```

function isBigEnough(element, index, array) {

  return (element >= 10); //数组中是否有一个元素大于 10

}

let result = [2, 5, 8, 1, 4].some(isBigEnough);

// false

let result = [12, 5, 8, 1, 4].some(isBigEnough);

// true

```

**filter 过滤原始数组，返回新数组**

定义: 返回一个新数组, 其包含通过所提供函数实现的测试的所有元素。

语法：

let new_array = arr.filter(function(currentValue, index, arr), thisArg)

参数:(这几个方法的参数，语法都类似)

function(必须): 数组中每个元素需要调用的函数。

&gt;[info]回调函数的参数

&gt;&gt;[success] 1. currentValue(必须),数组当前元素的值

&gt;&gt; 2. index(可选), 当前元素的索引值

&gt;&gt; 3. arr(可选),数组对象本身

thisValue(可选): 当执行回调函数时this绑定对象的值，默认值为undefined

eg:

```

let a = [32, 33, 16, 40];

let result = a.filter(function (value, index, array) {

  return value >= 18; 

  // 返回a数组中所有大于18的元素

});

console.log(result,a);

// [32,33,40] [32,33,16,40]

```

**map 对数组中的每个元素进行处理，返回新的数组**

定义：创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。

语法：

let new\_array = arr.map(function(currentValue, index, arr), thisArg)

参数:(这几个方法的参数，语法都类似)

function(必须): 数组中每个元素需要调用的函数。

&gt;[info]回调函数的参数

&gt;&gt;[success] 1. currentValue(必须),数组当前元素的值

&gt;&gt; 2. index(可选), 当前元素的索引值

&gt;&gt; 3. arr(可选),数组对象本身

thisValue(可选): 当执行回调函数时this绑定对象的值，默认值为undefined

eg:

```

let a = ['1','2','3','4'];

let result = a.map(function (value, index, array) {

 return value + '新数组的新元素'

});

console.log(result, a); 

// ["1新数组的新元素","2新数组的新元素","3新数组的新元素","4新数组的新元素"] ["1","2","3","4

```

**reduce 为数组提供累加器，合并为一个值**

定义：reduce() 方法对累加器和数组中的每个元素（从左到右）应用一个函数，最终合并为一个值。

语法：

array.reduce(function(total, currentValue, currentIndex, arr), initialValue)

参数：

function(必须): 数组中每个元素需要调用的函数。

&gt;[info]回调函数的参数

&gt;&gt;[success] 1. total(必须)，初始值, 或者上一次调用回调返回的值

&gt;&gt; 2. currentValue(必须),数组当前元素的值

&gt;&gt; 3. index(可选), 当前元素的索引值

&gt;&gt; 4. arr(可选),数组对象本身

initialValue(可选): 指定第一次回调 的第一个参数。

回调第一次执行时:

* 如果 initialValue 在调用 reduce 时被提供，那么第一个 total 将等于 initialValue，此时 currentValue 等于数组中的第一个值；
* 如果 initialValue 未被提供，那么 total 等于数组中的第一个值，currentValue 等于数组中的第二个值。此时如果数组为空，那么将抛出 TypeError。
* 如果数组仅有一个元素，并且没有提供 initialValue，或提供了 initialValue 但数组为空，那么回调不会被执行，数组的唯一值将被返回。

eg:

```

// 数组求和 

let sum = [0, 1, 2, 3].reduce(function (a, b) {

 return a + b;

}, 0);

// 6

// 将二维数组转化为一维 将数组元素展开

let flattened = [[0, 1], [2, 3], [4, 5]].reduce(

 (a, b) => a.concat(b),

 []

);

 // [0, 1, 2, 3, 4, 5]

```

**reduceRight 从右至左累加**

这个方法除了与reduce执行方向相反外，其他完全与其一致，请参考上述 reduce 方法介绍。

---

**ES6：find()&amp; findIndex() 根据条件找到数组成员**

find()定义：用于找出第一个符合条件的数组成员，并返回该成员，如果没有符合条件的成员，则返回undefined。

findIndex()定义：返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。

这两个方法

语法：

```

let new_array = arr.find(function(currentValue, index, arr), thisArg)

 let new_array = arr.findIndex(function(currentValue, index, arr), thisArg)

```

参数:(这几个方法的参数，语法都类似)

function(必须): 数组中每个元素需要调用的函数。

&gt;[info] 回调函数的参数

&gt;&gt;[success] 1. currentValue(必须),数组当前元素的值

&gt;&gt; 2. index(可选), 当前元素的索引值

&gt;&gt; 3. arr(可选),数组对象本身

thisValue(可选): 当执行回调函数时this绑定对象的值，默认值为undefined

这两个方法都可以识别NaN,弥补了indexOf的不足.

eg:

```

// find

let a = [1, 4, -5, 10].find((n) => n < 0); // 返回元素-5

let b = [1, 4, -5, 10,NaN].find((n) => Object.is(NaN, n)); // 返回元素NaN

// findIndex

let a = [1, 4, -5, 10].findIndex((n) => n < 0); // 返回索引2

let b = [1, 4, -5, 10,NaN].findIndex((n) => Object.is(NaN, n)); // 返回索引4

```

浏览器兼容(MDN):Chrome 45,Firefox 25,Opera 32, Safari 8, Edge yes,

**ES6 keys()&amp;values()&amp;entries() 遍历键名、遍历键值、遍历键名+键值**

定义：三个方法都返回一个新的 Array Iterator 对象，对象根据方法不同包含不同的值。

语法：

```

array.keys()

array.values()

array.entries()

```

参数：无。

遍历栗子(摘自[ECMAScript 6 入门](http://es6.ruanyifeng.com/#docs/array#%E6%95%B0%E7%BB%84%E5%AE%9E%E4%BE%8B%E7%9A%84-entries%EF%BC%8Ckeys-%E5%92%8C-values))：

```

for (let index of ['a', 'b'].keys()) {

 console.log(index);

}

// 0

// 1


for (let elem of ['a', 'b'].values()) {

 console.log(elem);

}

// 'a'

// 'b'


for (let [index, elem] of ['a', 'b'].entries()) {

 console.log(index, elem);

}

// 0 "a"

// 1 "b"

```

在for..of中如果遍历中途要退出，可以使用break退出循环。

如果不使用for...of循环，可以手动调用遍历器对象的next方法，进行遍历:

```

let letter = ['a', 'b', 'c'];

let entries = letter.entries();

console.log(entries.next().value); // [0, 'a']

console.log(entries.next().value); // [1, 'b']

console.log(entries.next().value); // [2, 'c']

```

entries()浏览器兼容性(MDN):Chrome 38, Firefox 28,Opera 25,Safari 7.1

keys()浏览器兼容性(MDN):Chrome 38, Firefox 28,Opera 25,Safari 8,

注意:目前只有Safari 9支持,，其他浏览器未实现，babel转码器也还未实现
