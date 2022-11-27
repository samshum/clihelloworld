    #**javaScript遍历对象总结**

#### **1. 使用Object.keys()遍历**

返回一个数组,包括对象自身的(不含继承的)所有可枚举属性(不含Symbol属性).

```

var obj = {'0':'a','1':'b','2':'c'};

Object.keys(obj).forEach(function(key){

     console.log(key,obj[key]);

});

```

![](https://box.kancloud.cn/d96185f10c8760056cc067fa15bcb47d_684x408.png)

#### **2. 使用for..in..遍历**

循环遍历对象自身的和继承的可枚举属性(不含Symbol属性).

```

var obj = {'0':'a','1':'b','2':'c'};

for(var i in obj) {

     console.log(i,":",obj[i]);

} 

```

![](https://box.kancloud.cn/09ff20478651ab6ad6a370bf49565013_642x324.png)

#### **3. 使用Object.getOwnPropertyNames(obj)遍历**

返回一个数组,包含对象自身的所有属性(不含Symbol属性,但是包括不可枚举属性).

```

var obj = {'0':'a','1':'b','2':'c'};

Object.getOwnPropertyNames(obj).forEach(function(key){

    console.log(key,obj[key]);

});

```

![](https://box.kancloud.cn/38356201b925fd5e863af1b2bba1c8e8_908x382.png)

#### **4.使用Reflect.ownKeys(obj)遍历**

返回一个数组,包含对象自身的所有属性,不管属性名是Symbol或字符串,也不管是否可枚举.

```

var obj = {'0':'a','1':'b','2':'c'};

Reflect.ownKeys(obj).forEach(function (key) {

    console.log(key,obj[key]);

});

```

![](https://box.kancloud.cn/ae99b270b4bf50753aaff2767b85e232_754x384.png)
