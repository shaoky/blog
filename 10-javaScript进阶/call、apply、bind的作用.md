# bind()

## 介绍

bind() 是固定某个函数的参数和this，返回另外一个函数。修正this指向的问题，一般可以用es6的箭头函数代替

bind() 最简单的作用是创建一个函数，使这个函数不论怎么调用都有同样的this值

### 1. 创建绑定函数

```javascript
var name = '李四'
var user = {
    name: '张三',
    getUserName: function () {
        return this.name
    }
}

user.getUserName() // 张三

// 如果把上面方法执行，赋值给另外一个变量
var getUserName = user.getUserName
getUserName() // 李四，因为在外部调用，'this'指向全局对象

// 如何解决？再把getUserName方法绑定到user环境上
var userName = getUserName.bind(user)
userName()  // 张三
```

# call()和apply()

## 介绍

这两个方法都是函数对象的方法，需要通过函数对象来调用。

当函数调用call()和apply()时，函数都会立即执行。

```javascript
obj.call(thisObj, arg1, arg2, ...)
obj.apply(thisObj, [arg1, arg2, ...])
```

两者作用一致，都是把obj(即this)绑定到thisObj，这时候thisObj具备了obj的属性和方法。或者说thisObj『继承』了obj的属性和方法。

call和apply其实是同一个东西，唯一区别是apply接受的是数组参数，call接受的是连续参数。call是apply的语法糖。

函数调用的三种方式:

- obj.fn()
- fn.call(obj, arg)
- fn.apply(obj, [arg1,arg2..])

例子1:

```javascript
function fn (a) {...}
var obj = {...}
// 在obj上执行fn
fn.call(obj, ...)
fn.apply(obj, ...)
```

例子2：

```javascript
var user = {
    age: 20,
    school: '浙江大学',
    getUserName (name) {
        return this.school + '-' + name + '-' + this.age
    }
}
var user1 = user.getUserName('李四')
console.log(user1) // 浙江大学-李四-20

// 现在有一个需求，增加user2用户，年龄和大学需要改变
var user2 = {
    age: 21,
    school: '清华大学'
}
```

如果是通过call的参数进行传参，是这样的：

```javascript
var user2 = user.getUserName.call(user2, '李四')
console.log(user2) // 清华大学-李四-21
```

如果是通过apply的参数进行传参，是这样的：

```javascript
var user2 = user.getUserName.call(user2, ['李四'])
console.log(user2) // 清华大学-李四-21
```

实际上改变了this的指向到user2里

不明白再看一个例子：

例子3：

```javascript
var func = {
    add: function (a, b) {
        return a + b
    },
    sub: function (a, b) {
        return a - b
    }
}

var text1 = func.add.call(func.sub, 10, 5) // 15，将add方法应用到sub上，即sub的指针指向add方法
var text2 = func.sub.call(func.add, 10, 5) // 5，用add对象替换sub对象，并调用sub对象的方法
```

例子4：

继承特性

```javascript
var user = {
    school: function (name, area) {
        this.schoolName = name
        this.schoolArea = area
    },
    student: function () {
        this.studentName = '张三'
        this.studentAge = 20
        this.school.call(this, '北京大学', '北京')
        return this
    }
}

var text1 = user.student()
console.log(text1.schoolName) // 北京大学
```