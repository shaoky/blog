## npm-link

npm link用来在本地项目和本地npm模块之间建立连接，可以在本地进行模块测试

```
cd npm-link-module 
npm link // 进行全局注册


cd npm-link-example
npm link npm-link-module
```


解除link
```
npm unlink npm-link-module
```

