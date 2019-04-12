# vue-slider

> vue滑块组件

## Get Started
引入文件
``` html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="./js/slider.js"></script>
```

创建滑块显示标签
```html
<slider v-bind="slider" @callback="getData"></slider>
```

初始化
```javascript
new Vue({
    el: '#app',
    data: function () {
        return {
            slider: {
                value: 50           // 初始值
                min: 0,             // 最小值
                max: 100,           // 最大值
                step: 1             // 数字间隔
            }
        }
    },
    methods: {
        getData: function (val) {   // 回调函数
            console.log(val)
        }
    },
    components: {
        'slider': slider
    }
})
```

参数
```javascript
  @param  {number}    [value]      [初始值]
  @param  {number}    [min]        [最小值]
  @param  {number}    [max]        [最大值]
  @param  {number}    [dotSize]    [滑块按钮大小,单位:px]
  @param  {number}    [step]       [数字间隔,假如 step="3",则数字应该是0、3、6、9以此类推]
  @param  {number}    [speed]      [动画速度]
```
