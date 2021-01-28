## nginx负载均衡

### 1、反向代理
在介绍nginx的负载均衡之前，我们先来介绍nginx的反向代理，因为反向代理用的比较多，所以，这里我们就不介绍正向代理了。<br/>
nginx的代理过程，就是将请求发送给nginx，然后将请求转发给后端服务器，后端服务器处理完毕之后将结果再发给nginx，nginx再把结果发送给客户端。后端服务器可在远程也可在本地，也可以是nginx服务器内部定义的其他虚拟主机。这些接收nginx转发的服务器被称为上游(upstream)<br>
使用nginx做代理的目的之一是扩展基础架构的规模。nginx可以处理大量并发连接，请求到来后，nginx可将其转发给任意数量的后台服务器进行处理，这等于将负载均衡分散到整个集群。

写一个简单的反向代理：
```
location / {
    proxy_pass http://www.baidu.com;
}

在浏览器输入ip或者绑定的域名，都会被nginx转发到baidu.com
```

### 2、负载均衡
```
nginx配置文件下的http下
upstream name {
    server 192.168.1.1;
    server 192.168.1.2;
    server 192.168.1.3;
}

server文件
location / {
    proxy_pass http://name;
}
```
所有的请求会被nginx分发到不同的服务器处理

![avatar](https://shaoky-images.oss-cn-hangzhou.aliyuncs.com/github/01.png)