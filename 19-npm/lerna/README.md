## lerna 
多包存储库管理工具

### 使用介绍
需登录npm login

1. 全局安装npm install lerna -g
2. 创建example目录
3. lerna init
4. cd packages
5. mkdir sky-example-module-a && npm init
6. mkdir sky-example-module-core && npm init
7. 打开sky-example-module-a的packages，把sky-example-module-core 加到packages.json->devDependencies
8. lerna bootstrap
9. lerna publish

### 例子
https://github.com/shaoky/lerna-example


### 报错
1. lerna ERR! ENOREMOTEBRANCH Branch 'master' doesn't exist in remote 'origin'.					
lerna ERR! ENOREMOTEBRANCH If this is a new branch, please make sure you push it to the remote first.
解决方法：代码需传到github	

### 参考
https://github.com/pigcan/blog/issues/3