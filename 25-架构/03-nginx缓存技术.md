## nginx缓存技术

### 1、为什么
为什么要使用缓存，可以防止大量的请求，直接进入后端，造成大量的cpu处理。<br/>
可以在nginx本地，设置缓存数据的时候随机缓存的有效期，避免同一时刻缓存都失效而大量请求直接进入后端。

### 2、配置

```
server{
    location / {
        proxy_cache     one;
        proxy_cache_valid       200 304 12h;
        proxy_cache_methods GET HEAD POST;
    }
}
```
配置缓存位置和名称等
```
[http]
proxy_cache_path /cache levels=1:2 keys_zone=one:10m max_size=10g inactive=60m use_temp_path=off;
```

### 3、使用场景
nginx缓存可以提升极大的并发量，适用于，网站的首页等经常调用的静态数据，不能存放根据用户id的获取数据