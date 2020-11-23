## Chii
远程调试工具

### 安装
```
npm install chii -g
```

### 使用
```
chii start -p 8080</code>
```

在你的页面中使用这个脚本注入代码。
```
<script src="http://192.168.1.132:8080/target.js"></script>
```

### 注意:
1. 打开页面，会报错的话，找到node_modules/chii/serve/lib/WebSocketServe.js，注释39行报错代码，// ws.url = q.url;