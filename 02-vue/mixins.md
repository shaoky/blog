# mixins
> 混入 (mixins) 是一种分发 Vue 组件中可复用功能的非常灵活的方式。混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被混入该组件本身的选项。

## mixins的使用

个人理解mixins就是定义一部分公共的方法或者计算属性,然后混入到各个组件中使用,方便管理与统一修改

在src下创建一个文件夹mixins，里面创建js文件wechat

```javascript
// 创建一个需要混入的对象
const wx = {
    methods: {
        onMenuShareTimeline () {
            console.log('hello')
        }
    }
export default wx
```

在组件中使用刚刚创建的混入

```javascript
// 创建一个需要混入的对象
import wx from '@/mixins/wechat'
export default {
    mixins: [wx],
    mounted () {
        this.onMenuShareTimeline() // hello
    }
export default wx
```

如果本身组件已经有了这个方法，具有优先权

```javascript
// 创建一个需要混入的对象
import wx from '@/mixins/wechat'
export default {
    mixins: [wx],
    mounted () {
        this.onMenuShareTimeline() // test
    },
    methods: {
        onMenuShareTimeline () {
            console.log('test')
        }
    }
}
```

总结：我们平时多多少少会使用到重复的代码，我们可以提取出来，复用，方便维护和修改