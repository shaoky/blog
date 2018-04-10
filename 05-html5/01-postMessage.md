## 介绍

postMessage是html5新增的一个解决跨域的一个方法，postMessage() 方法可以安全地实现跨源通信。

主要可以解决不同域名的数据通信

我们拿跨域中的iframe做例子

发送数据的页面
```javascript
html
<iframe src="" class="iframe" id="ifr"></iframe>

js
var iframe = document.getElementById('ifr')
iframe.contentWindow.postMessage('hello world','*')
```

第一个参数：就是你要像另外一个窗口传递的数据（只能传字符串类型）
第二个参数：表示目标窗口的源，协议+主机+端口号，是为了安全考虑，如果设置为*，则表示可以传递给任意窗口

接收数据的页面
```javascript
window.addEventListener('message', function (e) {
    console.log(e.data) // hello world
})
```

