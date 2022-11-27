    **改变原数组的方法(9个):**

```

let a = [1,2,3];

```

**ES5:**

1. `a.pop()`
2. `a.shift()`
3. `a.push()`
4. `a.unshift()`
5. `a.reverse()`
6. `a.splice()`
7. `a.sort() `

**ES6:**

1.`a.copyWithin()`

2.`a.fill()`

对于这些能够改变原数组的方法，要注意避免在循环遍历中改变原数组的选项，比如: 改变数组的长度，导致遍历的长度出现问题。

1. **pop() 删除一个数组中的最后的一个元素**

定义:`pop()`方法删除一个数组中的最后的一个元素，并且返回这个元素。

参数: 无。

```

let a = [1,2,3];

let item = a.pop(); // 3

console.log(a); // [1,2]

```

2. **shift() 删除数组的第一个元素**

定义:`shift()`方法删除数组的第一个元素，并返回这个元素。

参数: 无。

```

let a = [1,2,3];

let item = a.shift(); // 1

console.log(a); // [2,3]

```

3. **push() 向数组的末尾添加元素**

定义：`push()`方法可向数组的末尾添加一个或多个元素，并返回新的长度。

参数: item1, item2, …, itemX ,要添加到数组末尾的元素

```

let a = [1,2,3];

let item = a.push('末尾'); // 4

console.log(a); // [1,2,3,'末尾']

```

4. **unshift()**

定义：unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度。

参数: item1, item2, …, itemX ,要添加到数组开头的元素

```

let a = [1,2,3];

let item = a.unshift('开头'); // 4

console.log(a); // ['开头',1,2,3]

```

5. **reverse() 颠倒数组中元素的顺序**

定义:`reverse()`方法用于颠倒数组中元素的顺序。

参数: 无

```

let a = [1,2,3];

a.reverse(); 

console.log(a); // [3,2,1]

```

6. **splice() 添加/删除数组元素**

定义：`splice()`方法向/从数组中添加/删除项目，然后返回被删除的项目

语法： array.splice(index,howmany,item1,.....,itemX)

参数:

1. index：必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。
2. howmany：必需。要删除的项目数量。如果设置为 0，则不会删除项目。
3. item1, …, itemX： 可选。向数组添加的新项目。

返回值: 如果有元素被删除,返回包含被删除项目的新数组。

&gt; eg1:删除元素

```

let a = [1, 2, 3, 4, 5, 6, 7];

let item = a.splice(0, 3); // [1,2,3]

console.log(a); // [4,5,6,7]

// 从数组下标0开始，删除3个元素

let item = a.splice(-1, 3); // [7]

// 从最后一个元素开始删除3个元素，因为最后一个元素，所以只删除了7

```

&gt; eg2: 删除并添加

```

let a = [1, 2, 3, 4, 5, 6, 7];

let item = a.splice(0,3,'添加'); // [1,2,3]

console.log(a); // ['添加',4,5,6,7]

// 从数组下标0开始，删除3个元素，并添加元素'添加'

 let b = [1, 2, 3, 4, 5, 6, 7];

let item = b.splice(-2,3,'添加1','添加2'); // [6,7]

console.log(b); // [1,2,3,4,5,'添加1','添加2']

// 从数组最后第二个元素开始，删除3个元素，并添加两个元素'添加1'、'添加2'

```

&gt; eg3: 不删除只添加:

```

let a = [1, 2, 3, 4, 5, 6, 7];

let item = a.splice(0,0,'添加1','添加2'); // [] 没有删除元素，返回空数组

console.log(a); // ['添加1','添加2',1,2,3,4,5,6,7]

let b = [1, 2, 3, 4, 5, 6, 7];

let item = b.splice(-1,0,'添加1','添加2'); // [] 没有删除元素，返回空数组

console.log(b); // [1,2,3,4,5,6,'添加1','添加2',7] 在最后一个元素的前面添加两个元素

```

从上述三个栗子可以得出:

1、数组如果元素不够，会删除到最后一个元素为止

2、  操作的元素，包括开始的那个元素

3.、可以添加很多个元素

4、添加是在开始的元素前面添加的

7. **sort() 数组排序**

定义:`sort()`方法对数组元素进行排序，并返回这个数组。

参数可选: 规定排序顺序的比较函数。

默认情况下 `sort()`方法没有传比较函数的话，默认按字母升序，如果不是元素不是字符串的话，会调用toString()方法将元素转化为字符串的Unicode(万国码)位点，然后再比较字符。

```

// 字符串排列 看起来很正常

var a = ["Banana", "Orange", "Apple", "Mango"];

a.sort(); // ["Apple","Banana","Mango","Orange"]

// 数字排序的时候 因为转换成Unicode字符串之后，有些数字会比较大会排在后面 这显然不是我们想要的

var a = [10, 1, 3, 20,25,8];

console.log(a.sort()) // [1,10,20,25,3,8];

```

**比较函数的两个参数：**

sort的比较函数有两个默认参数，要在函数中接收这两个参数，这两个参数是数组中两个要比较的元素，通常我们用 a 和 b 接收两个将要比较的元素：

* 若比较函数返回值&lt;0，那么a将排到b的前面;
* 若比较函数返回值=0，那么a 和 b 相对位置不变；
* 若比较函数返回值&gt;0，那么b 排在a 将的前面；

对于sort()方法更深层级的内部实现以及处理机制可以看一下这篇文章[# 深入了解javascript 数组的sort方法]([https://www.jb51.net/article/141331.htm](https://www.jb51.net/article/141331.htm))

**sort排序常见用法：**

1、数组元素为数字的升序、降序:

```

var array = [10, 1, 3, 4,20,4,25,8];

// 升序 a-b < 0 a将排到b的前面，按照a的大小来排序的 

// 比如被减数a是10，减数是20 10-20 < 0 被减数a(10)在减数b(20)前面 

array.sort(function(a,b){

 return a-b;

});

console.log(array); // [1,3,4,4,8,10,20,25];

// 降序 被减数和减数调换了 20-10>0 被减数b(20)在减数a(10)的前面

array.sort(function(a,b){

 return b-a;

});

console.log(array); // [25,20,10,8,4,4,3,1];

```

2、数组多条件排序

```

var array = [{id:10,age:2},{id:5,age:4},{id:6,age:10},{id:9,age:6},{id:2,age:8},{id:10,age:9}];

 array.sort(function(a,b){

  if(a.id === b.id){// 如果id的值相等，按照age的值降序

   return b.age - a.age

  }else{ // 如果id的值不相等，按照id的值升序

   return a.id - b.id

  }

 })

 // [{"id":2,"age":8},{"id":5,"age":4},{"id":6,"age":10},{"id":9,"age":6},{"id":10,"age":9},{"id":10,"age":2}] 

```

3、自定义比较函数，天空才是你的极限

类似的：运用好返回值，我们可以写出任意符合自己需求的比较函数

```

var array = [{name:'Koro1'},{name:'Koro1'},{name:'OB'},{name:'Koro1'},{name:'OB'},{name:'OB'}];

array.sort(function(a,b){

 if(a.name === 'Koro1'){// 如果name是'Koro1' 返回-1 ，-1<0 a排在b的前面

  return -1

 }else{ // 如果不是的话，a排在b的后面

  return 1

 }

})

// [{"name":"Koro1"},{"name":"Koro1"},{"name":"Koro1"},{"name":"OB"},{"name":

```

**ES6: copyWithin() 指定位置的成员复制到其他位置**

定义: 在当前数组内部，将指定位置的成员复制到其他位置,并返回这个数组。

语法:

array.copyWithin(target, start = 0, end = this.length)

参数:

三个参数都是数值，如果不是，会自动转为数值.

1、target（必需）：从该位置开始替换数据。如果为负值，表示倒数。

2、start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示倒数。

3、end（可选）：到该位置前停止读取数据，默认等于数组长度。使用负数可从数组结尾处规定位置。

浏览器兼容(MDN): chrome 45,Edge 12,Firefox32,Opera 32,Safari 9, IE 不支持

eg:

```

// -2相当于3号位，-1相当于4号位

[1, 2, 3, 4, 5].copyWithin(0, -2, -1)

// [4, 2, 3, 4, 5]

var a=['OB1','Koro1','OB2','Koro2','OB3','Koro3','OB4','Koro4','OB5','Koro5']

// 2位置开始被替换,3位置开始读取要替换的 5位置前面停止替换

a.copyWithin(2,3,5)

// ["OB1","Koro1","Koro2","OB3","OB3","Koro3","OB4","Koro4","OB5","Koro5"] 

```

从上述栗子:

1、第一个参数是开始被替换的元素位置

2、要替换数据的位置范围:从第二个参数是开始读取的元素，在第三个参数前面一个元素停止读取

3、数组的长度不会改变

4、读了几个元素就从开始被替换的地方替换几个元素

**ES6: fill() 填充数组**

定义: 使用给定值，填充一个数组。

参数:

第一个元素(必须): 要填充数组的值

第二个元素(可选): 填充的开始位置,默认值为0

第三个元素(可选)：填充的结束位置，默认是为this.length

[MDN浏览器兼容]([https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global\_Objects/Array/fill#%E6%B5%8F%E8%A7%88%E5%99%A8%E5%85%BC%E5%AE%B9%E6%80%A7](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/fill#%E6%B5%8F%E8%A7%88%E5%99%A8%E5%85%BC%E5%AE%B9%E6%80%A7))

```

['a', 'b', 'c'].fill(7)

// [7, 7, 7]

['a', 'b', 'c'].fill(7, 1, 2)

// ['a', 7, 'c']

```
