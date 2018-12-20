## redis

thinkphp配置：在config->cache.php里加入下面代码

```javascript
return [
    // 缓存配置为复合类型
    'type'  =>  'complex', 
    'default'	=>	[
      'type'	=>	'file',
      // 全局缓存有效期（0为永久有效）
      'expire'=>  0, 
      // 缓存前缀
      'prefix'=>  'think',
       // 缓存目录
      'path'  =>  '../runtime/cache/',
    ],
    'redis'	=>	[
      'type'	=>	'redis',
      'host'	=>	'127.0.0.1',
      // 全局缓存有效期（0为永久有效）
      'expire'=>  0,
    ],    
    // 添加更多的缓存类型设置
];
```

thinkphp使用：
```javascript
use think\facade\Cache;

Cache::store('redis')->set('adList', $data['adList'])
Cache::store('redis')->get('adList');
```