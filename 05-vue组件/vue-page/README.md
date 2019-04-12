# vue-page

> vue分页组件

## Get Started
引入文件
``` html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="./js/page.js"></script>
```

创建分页显示标签
```html
<page :search="search" :count="count" @callback="getData"></page>
```

初始化
```javascript
new Vue({
    el: '#app',
    data: function () {
        return {
            search: {                   // 向api发送请求参数
                page: 1,                // 页数
                size: 10                // 每次多少条
            },
            count: 200                  // 总条数
        }
    },
    methods: {
        getData: function (cur) {       // 回调函数
            this.search.page = cur
            console.log(cur)
        }
    },
    components: {
        'page': page                    // 注册分页组件
    }
})
```

参数
```javascript
  @param  {int}    [search.page]   [搜索页数]
  @param  {int}    [search.size]   [搜索条数]
  @param  {int}    [count]         [总条数]
  @param  {int}    [showPage]      [设置显示的页数，默认5，建议设置奇数3, 5, 7]
```
