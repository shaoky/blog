<h2>github的基本使用</h2>
<p>github是目前流行的代码托管网站。</p>
<p>github.com是一个网站，它为你提供一个远程版本库（你和你的协作者的工作成果最终提交在这里）；同时它也是一个共享平台，你可以在这里找到数不尽的源码。</p>
<h2>使用流程</h2>
<h3>注册github帐户</h3>
<p>登陆<a href="https://github.com/" target="_blank">https://github.com/</a>，注册一个账号</p>
<h3>下载Git</h3>
<p><a href="http://git-scm.com/download/" target="_blank">http://git-scm.com/download/</a>，下载最新版本即可</p>
<h3>安装Git</h3>
<p>一路默认点next，安装完成</p>
<h3>配置Git</h3>
<p>打开git，绑定你的github</p>
<p>这里的yourname相当于你的一个签名，而非github的登录名。以后你提交的文档都会有这个签名</p>
<pre>
<code>$ git config --global user.name "yourname"</code>
</pre>
<p>这里输入的是你github的帐户邮箱，回车后继续输入：
<pre>
<code>git config --global user.email "youreami@xx.xxx"</code>
</pre>
<h3>设置SSH</h3>
<p>SSH是一种连接方式，一方面免于你总是在连接时输入用户和密码，另一方面增加安全性。本人初次接触SSH，我的简单理解是，ssh是两段很长的字符串，一段是锁，另一段是钥匙。你把锁放在你的github帐户上，而电脑上留有你的钥匙，每当连接时，git会自动用钥匙去开锁。</p>
<p>1、生成钥匙和锁 </p>
<p>在命令行输入：ssh-keygen -t rsa -C  your_email@youremail.com</p>
<p>然后回车，期间会问你生成的文件名和passphrase，对于我这种菜鸟，我一路点回车。如果你也是菜鸟，跟我一样做。 （passphrase 可以设置密码）</p>
<p>2、将锁放到github的帐户里</p>
<p>上一步生成的文件放在了C:/Users/用户名（你的windows用户）/.ssh/文件夹中，用记事本打开其中的id_rsa.pub文件，全部内容复制。登录github网站，在右上角，找到setting，左侧SSH keys，add SSH key，取个名称，把将刚才复制的粘贴到key文本框中</p>
<p>3、测试是否成功</p>
<p>如果成功，会显示欢迎字符，在命令行输入：</p>
<pre>
<code>$ git ssh -T git@github.com</code>
</pre>
<h3>创建一个远程库</h3>
<p>在网站上登录你的github帐户，在右上角，找到New repositiory，输入项目名称（名字随便取，但在本地建库时必须使用相同名字）</p>
<h3>建立本地库</h3>
<p>在自己电脑上任意一个文件夹，新建一个目录，目录名与在github上所建库的名字相同，然后右击文件夹，在弹出菜单中选择git bash ，弹出命令行窗口，输入：git init。此时git会在这个文件夹下创建一个隐藏目录，这个目录就是本地库了。，而这个Hello目录，实际上就是你的工作路径。</p>
<h3>绑定本地库和远程库</h3>
<pre>
<code>$ git remote add origin git@github.com:你的用户名/你的项目名.git</code>
</pre>
<h3>开始同步</h3>
<p>1、从远程库上更新本地库数据</p>
<p>如果远程库上有你本地库没有的文件，git会帮你下载下来，否则它显示already update</p>
<pre>
<code>$ git pull origin master</code>
</pre>
<p>2、将本地新数据提交到远程库</p>
<p></p>
<p>如果你想将一个js.js文件加入远程库里面，将文件拷到本地项目里面</p>
<pre>
<code>$ git add js.js</code>
</pre>
<p>存入本地项目</p>
<pre>
<code>$ git commit -m "我提交了一个js"</code>
</pre>
<p>将本地文件的所有修改更新到远程库（第一次提交）</p>
<pre>
<code>$ git push -u origin master</code>
</pre>
<p>将本地文件的所有修改更新到远程库（后续更新）</p>
<pre>
<code>$ git push origin master</code>
</pre>
<h2>git基础命令</h2>
<p>1、用命令git init把这个目录变成Git可以管理的仓库</p>
<pre>
<code>$ git init</code>
</pre>
<p>2、用命令git status查看当前文件状态，可以看哪些文件是否被修改过了</p>
<pre>
<code>$ git status</code>
</pre>
<p>3、用命令git add告诉Git，把文件添加到仓库</p>
<pre>
<code>$ git add readme.txt</code>
</pre>
<p>4、用命令git commit告诉Git，把文件添加到仓库</p>
<pre>
<code>$ git commit -m "hi"</code>
</pre>
<p>5、用命令git rm告诉Git，把文件删除</p>
<pre>
<code>$ git rm readme.txt</code>
</pre>
<p>5、本地和远程冲突，强制覆盖本地代码。</p>
<pre>
<code>$ git reset --hard origin/master</code>
</pre>
<h2>常见问题</h2>
<h3>更换项目名称</h3>
<p>更改了github项目名称，本地文件同时更换，并且修改config，如果还是不能，把config删除，重新生成一个</p>
<pre>
<code>$ git remote add origin https://github.com/你的用户名/你的项目名.git</code>
</pre>
<h3>提交代码每次github账号和密码</h3>
绑定项目的时候使用下面的代码
<pre>
<code>$ git remote add origin git@github.com:你的用户名/你的项目名.git</code>
</pre>
另外已经绑定过了，在根目录git文件，修改config为：git@github.com:你的用户名/你的项目名.git
<h3>Please make sure you have the correct access rights and the repository exists.</h3>
这段是没有访问权限，需要重新生成密钥。
Please make sure you have the correct access rights and the repository exists.
<p>在命令行输入：ssh-keygen -t rsa -C  your_email@youremail.com</p>
看到这段，选择覆盖
/Users/your username/.ssh/id_rsa already exists.
Overwrite (y/n)?
Overwrite (y/n)? y
<h2>其他相关网站</h2>
<p><a href="http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000">Git教程---比较全面</a></p>
