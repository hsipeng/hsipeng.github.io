---
layout: post
tags: coffeeScript 
title: CoffeeScript 基础知识
date: 2017-07-05T04:57:25Z
---

<strong>CoffeeScript</strong> 是一门编译到 JavaScript 的小巧语言. 在 Java 般笨拙的外表下, JavaScript 其实有着一颗华丽的心脏. CoffeeScript 尝试用简洁的方式展示 JavaScript 优秀的部分.

CoffeeScript 的指导原则是: "<strong>她仅仅是 JavaScript</strong>". 代码一一对应地编译到 JS, 不会在编译过程中进行解释. 已有的 JavaScript 类库可以无缝地和 CoffeeScript 搭配使用, 反之亦然. 编译后的代码是可读的, 且经过美化, 能在所有 JavaScript 环境中运行, 并且应该和对应手写的 JavaScript 一样快或者更快.
<!-- more -->


------


## 安装

CoffeeScript 编译器本身是 CoffeeScript 写的, 使用了 Jison parser generator. 命令行版本的 coffee 是一个实用的 Node.js 工具. 不过编译器并不依赖 Node, 而是能运行于任何 JavaScript 执行环境, 比如说在浏览器里(看上边的"试一试 CoffeeScript").

安装前你需要最新稳定版 Node.js, 和 npm (Node Package Manager). 借助 npm 可以安装 CoffeeScript:
```
npm install -g coffee-script
```
## 语言手册
一些基础, CoffeeScript 使用显式的空白来区分代码块. 你不需要使用分号 ; 来关闭表达式, 在一行的结尾换行就可以了(尽管分号依然可以用来把多行的表达式简写到一行里). 不需要再用花括号来 { } 包裹代码快, 在 函数, if 表达式, switch, 和 try/catch 当中使用缩进.

传入参数的时候, 你不需要再使用圆括号来表明函数被执行. 隐式的函数调用的作用范围一直到行尾或者一个块级表达式.
```
console.log sys.inspect object → console.log(sys.inspect(object));
```

## 函数
函数通过一组可选的圆括号包裹的参数, 一个箭头, 一个函数体来定义. 一个空的函数像是这样:  ->

coffeeScript

```
square = (x) -> x * x
cube   = (x) -> square(x) * x

```
JavaScript
```
var cube, square;

square = function(x) {
  return x * x;
};

cube = function(x) {
  return square(x) * x;
};
```

## 对象和数组
CoffeeScript 中对象和数组的字面量看起来很像在 JavaScript 中的写法. 如果单个属性被写在自己的一行里, 那么逗号是可以省略的. 和 YAML 类似, 对象可以用缩进替代花括号来声明.

coffeeScript
```
song = ["do", "re", "mi", "fa", "so"]

singers = {Jagger: "Rock", Elvis: "Roll"}

bitlist = [
  1, 0, 1
  0, 0, 1
  1, 1, 0
]

kids =
  brother:
    name: "Max"
    age:  11
  sister:
    name: "Ida"
    age:  9

```
JavaScript
```
var bitlist, kids, singers, song;

song = ["do", "re", "mi", "fa", "so"];

singers = {
  Jagger: "Rock",
  Elvis: "Roll"
};

bitlist = [1, 0, 1, 0, 0, 1, 1, 1, 0];

kids = {
  brother: {
    name: "Max",
    age: 11
  },
  sister: {
    name: "Ida",
    age: 9
  }
};
```

## 词法作用域和变量安全
CoffeeScript 编译器会考虑所有变量, 保证每个变量都在词法域里适当地被定义 — 你永远不需要自己去写 var.

CoffeeScript
```
outer = 1
changeNumbers = ->
  inner = -1
  outer = 10
inner = changeNumbers()
```
JavaScript
```
var changeNumbers, inner, outer;

outer = 1;

changeNumbers = function() {
  var inner;
  inner = -1;
  return outer = 10;
};

inner = changeNumbers();
```
> 注意所有变量的定义都被推到相关的顶层作用域, 也就是第一次出现的位置. outer 在内层的函数里没有被重新定义, 因为它已经存在于作用域当中了. 同时, 内层函数里的 inner 不应该改变外部的同名的变量, 所以在这里有自己的声明.

## 循环和推导式
你可以使用CoffeeScript将大多数的循环写成基于数组、对象或范围的推导式(comprehensions)。 推导式替代（编译为）for循环，并且可以使用可选的子句和数组索引值。 不同于for循环，数组的推导式是表达式，可以被返回和赋值。

CoffeeScript
```
# 吃午饭.
eat food for food in ['toast', 'cheese', 'wine']

# 精致的五道菜.
courses = ['greens', 'caviar', 'truffles', 'roast', 'cake']
menu i + 1, dish for dish, i in courses

# 注重健康的一餐.
foods = ['broccoli', 'spinach', 'chocolate']
eat food for food in foods when food isnt 'chocolate'
```

JavaScript
```
var courses, dish, food, foods, i, _i, _j, _k, _len, _len1, _len2, _ref;

_ref = ['toast', 'cheese', 'wine'];
for (_i = 0, _len = _ref.length; _i < _len; _i++) {
  food = _ref[_i];
  eat(food);
}

courses = ['greens', 'caviar', 'truffles', 'roast', 'cake'];

for (i = _j = 0, _len1 = courses.length; _j < _len1; i = ++_j) {
  dish = courses[i];
  menu(i + 1, dish);
}

foods = ['broccoli', 'spinach', 'chocolate'];

for (_k = 0, _len2 = foods.length; _k < _len2; _k++) {
  food = foods[_k];
  if (food !== 'chocolate') {
    eat(food);
  }
}
```

## 操作符和 aliase
由于操作符 == 常常带来不准确的约束, 不容易达到效果, 而且跟其他语言当中意思不一致, CoffeeScript 会把 == 编译为 ===, 把 != 变异为 !==. 此外, is 编译为 ===, 而 isnt 编译为 !==.

not 可以作为 ! 的 alias 使用.

逻辑操作方面, and 编译为 &&, 而 or 编译为 ||.

在 while, if/else, switch/when 的语句当中,  then 可以被用来分隔判断条件跟表达式, 这样就不用强制写换行或者分号了.

就像 YAML, on 和 yes 跟 true 是一样的, 而 off 和 no 是布尔值 false.

unless 可以认为是 if 相反的版本.

this.property 简短的写法可以用 @property.

可以用 in 判断数据在数组中是否出现, 而 of 可以探测 JavaScript 对象的属性是否存在.

为了简化数学表达式, ** 可以用来表示乘方, // 表示整除, %% 提供数学的模运算(译注: true mathematical modulo?).

完整的列表:

```
CoffeeScript	JavaScript
is	           ===
isnt	         !==
not	            !
and           	&&
or	             ||
true, yes, on	  true
false, no, off	false
@, this	        this
of	           in
in	         no JS equivalent
a ** b	     Math.pow(a, b)
a // b	     Math.floor(a / b)
a %% b	       (a % b + b) % b
```
