## 下载与安装

MongoDB的官网是：http://www.mongodb.org/ 
官网比较麻烦，要注册什么的，所以直接下载安装包：http://dl.mongodb.org/dl/win32/x86_64

net start MongoDB

net stop MongoDB

详情见：http://www.runoob.com/mongodb/mongodb-window-install.html

## 备份与恢复

mongodump 备份所有

mongorestore -h localhost:27017 -d mall c://db/mall 恢复指定数据库

## 基础使用

