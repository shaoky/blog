## mysql主从数据同步

### 用途及条件

mysql主从复制用途
- 实时灾备，用于故障切换
- 读写分离，提供查询服务
- 备份，避免影响业务

主从部署必要条件：
- 主库开启binlog日志（设置log-bin参数）
- 主从server-id不同
- 从库服务器能连通主库

### 主从原理

从库生成两个线程，一个I/O线程，一个SQL线程；<br/>
i/o线程去请求主库 的binlog，并将得到的binlog日志写到relay log（中继日志） 文件中；<br/>
主库会生成一个 log dump 线程，用来给从库 i/o线程传binlog；<br/>
SQL 线程，会读取relay log文件中的日志，并解析成具体操作，来实现主从的操作一致，而最终数据一致；

### 问题及解决方法

mysql主从复制存在的问题：
- 主库宕机后，数据可能丢失
- 从库只有一个sql Thread，主库写压力大，复制很可能延时
 
解决方法：
- 半同步复制---解决数据丢失的问题
- 并行复制----解决从库复制延迟的问题

### 半同步复制

mysql semi-sync（半同步复制）<br/>
半同步复制：<br/>
- 5.5集成到mysql，以插件的形式存在，需要单独安装
- 确保事务提交后binlog至少传输到一个从库
- 不保证从库应用完这个事务的binlog
- 性能有一定的降低，响应时间会更长
- 网络异常或从库宕机，卡主主库，直到超时或从库恢复

### 实现

### 主服务器

安装
```
mysql> INSTALL PLUGIN rpl_semi_sync_master SONAME 'semisync_master.so';
```

配置文件
```
[mysqld]
rpl_semi_sync_master_enabled=1
rpl_semi_sync_master_timeout=1000   #此单位是毫秒
server-id = 1 #服务器id
binlog-do-db = mall #给从机同步的库，可以多个
log-bin=mysql-bin #开启日志
server-id = 1 #每台服务器要设置不一样
```
记录下面的file和position，从服务器会用到
```
mysql-> show master status;
+------------------+----------+--------------+------------------+-------------------+
| File             | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set |
+------------------+----------+--------------+------------------+-------------------+
| mysql-bin.000003 |     1479 | mall         |                  |                   |
+------------------+----------+--------------+------------------+-------------------+
1 row in set (0.04 sec)
```

### 从服务器

安装
```
mysql> INSTALL PLUGIN rpl_semi_sync_slave SONAME 'semisync_slave.so';
```
配置文件
```
[mysqld]
rpl_semi_sync_slave_enabled=1
server-id=2 #服务器id
replicate-do-db=mall #要从主机同步的库
log-bin=mysql-bin
```
从服务器执行下面
```
mysql-> change master to master_host='192.168.157.128', master_user='root', master_password='n4dyt7aT5WBWGyPp',master_log_file='mysql-bin.000002', master_log_pos=154;
```

查看slave状态：<br/>
```
show slave status\G;
Slave_IO_State: Waiting for master to send event
                  Master_Host: 192.168.157.128
                  Master_User: root
                  Master_Port: 3306
                Connect_Retry: 60
              Master_Log_File: mysql-bin.000003
          Read_Master_Log_Pos: 1479
               Relay_Log_File: CentOS7-relay-bin.000008
                Relay_Log_Pos: 1692
        Relay_Master_Log_File: mysql-bin.000003
             Slave_IO_Running: Yes
            Slave_SQL_Running: Yes
              Replicate_Do_DB: mall

```
当Slave_IO_Running和Slave_SQL_Running都为YES的时候就表示主从同步设置成功了

会使用到的命令
```
mysql->stop slave;
mysql->stop slave;
mysql->show global variables like 'rpl_semi%';
mysql->show global status like 'rpl_semi%';
```

遇到的错误：
- 可以去mysql日志里查看
- 看从服务器要访问主服务器是否成功