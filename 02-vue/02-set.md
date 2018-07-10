# set
> 向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新。

## set的使用
向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新。

下面来试下vue的set属性，下面是错误实例没有绑定

虽然可以新增属性，但是不会触发视图更新，原因是：受 ES5 的限制，Vue.js 不能检测到对象属性的添加或删除。因为 Vue.js 在初始化实例时将属性转为 getter/setter，所以属性必须在 data 对象上才能让 Vue.js 转换它，才能让它是响应的。


```javascript
<input v-model="user.name" />
data () {
    user: {}
},
mounted: () {
    this.user.name = 'zhangsan'
}
```

要处理这种情况，我们可以使用$set()方法，既可以新增属性,又可以触发视图更新。

```javascript
<input v-model="user.name" />
data () {
    user: {}
},
mounted: () {
   this.$set(this.user, 'name', 'zhangsan')
}
```

## set数组扩展

```javascript
<input v-model="item.name" v-for="item in list" />
data () {
    list: []
},
mounted: () {
   for (let item of this.list) {
        this.$set(item, 'name', 'zhangsan')
    }
}
```