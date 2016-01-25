title: 入职分享-罗方国
speaker: 罗方国
url: https://github.com/ksky521/nodePPT
transition: move
files: /js/demo.js,/css/demo.css,/js/zoom.js
theme: dark
usemathjax: yes

[slide style="background-image:url('/img/still-life-962213.jpg')"]

#入职分享
<small>罗方国</small>
[slide]
#个人介绍
----
* erp组web前端 {:&.bounceIn}
* 入职初在mind做前端
* 研究方向主要在前端工程化和用户体验
* 关注人机交互

[slide]
#大 纲
----
* 工作情况总结 {:&.bounceIn}
  * 总结前端在整个项目中的位置，如何展开工作的。 {:&.moveIn}
  * 云CRM模块从设计到落地的开发过程
* gulp工具的使用
  * gulp工具的安装文件配置及使用 {:&.moveIn}
* jQuery Deferred对象
  * 如何用Deferred精细的控制回调函数 {:&.moveIn}

[slide]
#in 'on mind' group
----
* 熟悉业务，看代码，改bug {:&.bounceIn}
* 写前端demo
* 协助后端完成需求

[slide]
# mind组前端架构一些不足
----
* 不熟悉jsp标签和java代码不容易改模板 {:&.bounceIn}
* 前端重度依赖开发环境
* 改代码来回沟通成本高
* 前后端未分离,ajax和jsp模板混杂
* 前端代码耦合度过高

[slide]
# mind组前端架构一些优点
----
* 后端渲染HTML，前端相对简单 {:&.bounceIn}
* 利于SEO
* 简单明快，适合小项目快速开发

[slide]
# 总 结
* 基于后端mvc的前端 {:&.bounceIn}
* 前后端未分离，职责不清晰
* 代码维护困难

[slide]
# in 'erp' group
----
* 微信端CRM和ERP前端开发 {:&.bounceIn}
* Single-page application
* 前端变得越来越复杂
* 向MV* 模式开发迈进

[slide]

#SPA网站架构
![SPA网站架构](/img/032151426056191.jpg "SPA网站架构")
----

* 服务端只负责数据和素材的存储
* 前端负责组装和逻辑执行

[slide]

# SPA到的优点
----
* 前后端职责很清晰 {:&.bounceIn}
* 前端开发的复杂度可控
* 减轻服务器压力
* 多终端应用服务端只需要一套程序
* 离线应用成为可能
* 局部操作无刷新

[slide]

# SPA到的缺点
----
* 全异步对SEO不友好 {:&.bounceIn}
* 前进、后退、地址栏等问题
* 移动端性能问题
* 内存泄露

[slide]
# 云CRM 业务流程
---
![云CRM](/img/yunCrmTfd.svg "云CRM业务流程")

[slide]
# 云CRM数据发送
---
![云CRM](/img/yunCrmTfdMode.svg "云CRM数据发送")

[slide]
# 云CRM数据回显
---
![云CRM](/img/yunCrmTfdModePull.svg "云CRM数据回显")

[slide]
## 代码实现
### 获取表单数据
----
<div class="columns-1">
    <pre><code class="javascript">(function(window, document){
    $.fn.formData = function () {
    var $this = $(this),
        formData = {},
        form = $this.find("form");
        form = form.size() > 0 ? form : $this;
        form.serializeArray().map(function (item) {
        if (item.value != null || item.value != '') {
            if (formData[item.name]) {
                if (typeof formData[item.name] == "object") {
                    formData[item.name].push(item.value);
                }
                else {
                    formData[item.name] = new Array(formData[item.name]);
                    formData[item.name].push(item.value);
                }
            }
            else {formData[item.name] = item.value;}
        }
    });
    return formData;
};
}(window, document));
</code></pre>
</div>
[slide]
## 发送数据代码实现
### 获取表单数据
----
<div class="columns-1">
    <pre><code class="javascript">(function(window, document){
    $("#submit").on("click", function () {
    var postData = $("#basicInfo").formData();
    //发送数据
    $.request({
        url: "/mycommercials/addCommercialAndContact.do",
        data: postData,
        success: function (data) {
            if (data.key == "ok") {
                alert(data.msg);
                window.location.href = path + "/page/crm/mobile/myBusiness/index.jsp";
            }
        }
    });
});
}(window, document));
</code></pre>
</div>
[slide]
## 发送数据代码实现
### 大众点评领取商户
----
<div class="columns-1">
    <pre><code class="javascript">(function(window, document){
    $(".list-block").on("click", "#receiveCommer", function () {
    var _busiId = $(this).attr("val");
    $.request({
        type: 'get',
        data: {"businessId": _busiId},
        url: "/dianping/commercial/add",
        success: function (result) {
            if (result.key == "0") {
                var param = result.value;
                dataObject("data", param);//将返回的数据存储起来，添加页面有用
                window.location.href = path + "/page/crm/mobile/dianping/commercial_add.jsp";
            } else if (result.key == "-2") {
                alert("分站用户管理中配置您最多只能领" + result.value + "个商户,不能再领取了!");
            } else {
                alert("领取失败！")
            }
        }
    });
});
}(window, document));
</code></pre>
</div>
[slide]
## 发送数据代码实现
### (黑科技)数据存储(还可以使用cookie,localstorage)
----
<div class="columns-1">
    <pre><code class="javascript">(function(window, document){
    var dataObject = function (key, value) {
    if (key == undefined || key == null || key == ""){return null;} 
    var storage = {};
    if (window.name && window.name.indexOf("{") >= 0) {
        storage = $.parseJSON(window.name);
    }
    if (value == undefined) {//取值
        var result = storage[key];
        if (result != undefined && typeof result == "string" && ((result.indexOf("{") >= 0 && result.indexOf(":") > 0) || (result.indexOf("[") >= 0))) {
            try {
                result = $.parseJSON(result);
            }
            catch (ex) {
            }
        }
        return (result == undefined) ? null : result;
    }
    else {//存值
        storage[key] = ((typeof value == "object") ? JSON.stringify(value) : value);
        window.name = JSON.stringify(storage);
    }
};
}(window, document));
</code></pre>
</div>
[slide]
## 发送数据代码实现
### 大众点评添加商户
----
<div class="columns-1">
    <pre><code class="javascript">(function(window, document){
    var data = dataObject("data");
    $("#dianPingId").val(data.business_id);
    $("#departmentName").html(data.departmentName);
    $("#test").val(data.name + data.branch_name);
    $("#commercialAddress").val(data.address);
    $("#address").find('span').first().text(data.address);
    $("#commercialTelephone").val(data.telephone);
 }(window, document));   
 </code></pre>
</div>
> 在商户添加页面，获取到储存数据并且使用 {:&.pull-right}


[slide]
## 数据回显代码实现
### 商户公海池页面显示
----
<div class="columns-1">
    <pre><code class="javascript">(function(window, document){
    $(function () {
        var queryArguments = {
            "queryData": {page: "1", rows: 10},
            "url": '/crmComerController/loadCommerPoolMobile.do'
        }
        loadCommercialListMobile(queryArguments);
    });
    function loadCommercialListMobile(obj) {
        var $url = obj.url;
        var $queryData = obj.queryData;
        $.request({
            url: $url,
            type: "get",
            data: $queryData,
            success: function (obj) {
            }    
        });
    }
}(window, document));   
 </code></pre>
</div>
[slide]
## 使用Template7模板引擎拼接HTML
------ 
![使用Template7模板引擎](/img/temlate7.png "使用Template7模板引擎")

[slide]

## 数据回显代码实现
### 编译返回的数据并且渲染
----
<div class="columns-1">
    <pre><code class="javascript">(function(window, document){
        var compiledTemplate = Template7.compile($('#loadCommerPoolMobile').html());
        var html = compiledTemplate({rows: obj.data.rows});
        if ($("#myCommercialConent li").length != 0) {
            $("#myCommercialConent li").detach();
        }
        $("#myCommercialConent").append(html);
        $('#myCommercialConent').kryScrollRequst({
            'templateElement': $("#loadCommerPoolMobile"),
            'totalPage': totalPage,
            'url': $url,
            'data': $queryData
        });
}(window, document));
    </code></pre>
</div>

[slide]
# 自动化构建工具gulp
----
* 基于nodejs流的前端构建工具 {:&.bounceIn}
* 思路更清晰，逻辑更简单
* 易于学习

[slide]
## gulp主要函数
----
* gulp.task(name, fn): 创建构建任务 {:&.bounceIn}
* gulp.run(tasks...)  并行运行多个task
* gulp.watch(glob, fn) 监听内容改变，自动执行fn
* gulp.src(glob)  加载stream
* gulp.dest(glob) 返回一个可写的stream

[slide]
## gulp常用的插件
----
* gulp-autoprefixer //浏览器前缀
* gulp-handlebars   //handlebars生产模板js
* gulp-imagemin     //图片压缩
* gulp-ruby-sass    //sass
* gulp-minify-css   //css压缩
* gulp-jshint       //js检查
* gulp-uglify       //js压缩
* gulp-rename       //重命名
* gulp-concat       //合并文件
* gulp-clean        //清空文件夹
* gulp-notify       //消息提示
* gulp-sourcemaps   //成maps文件


[slide]
## gulp的使用
----
* npm install --global gulp //全局安装gulp {:&.bounceIn}
* npm install gulp --save-dev //切换到项目目录安装gulp
* 在项目根目录新建gulpfile.js文件
* npm install gulp-sass --save-dev //安装需要的插件

[slide]
## gulp配置文件
----
<div class="columns-1">
    <pre><code class="javascript">(function(window, document){
// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    notify = require(gulp-notify')

// Styles任务
gulp.task('styles', function() {
    //编译sass
    return gulp.src('stylesheets/main.scss')
    .pipe(sass())
    //添加前缀
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    //保存未压缩文件到我们指定的目录下面
    .pipe(gulp.dest('stylesheets'))
    //给文件添加.min后缀
    .pipe(rename({ suffix: '.min' }))
    //压缩样式文件
    .pipe(minifycss())
    //输出压缩文件到指定目录
    .pipe(gulp.dest('assets'))
    //提醒任务完成
    .pipe(notify({ message: 'Styles task complete' }));
});
}(window, document));
</code></pre>
</div>

[slide]
#用jQuery Deferred对象进行异步编程
* 以CommonJS Promises/A proposal为设计基础 {:&.bounceIn}
* 为回调函数提供精细的控制

[slide]

## 一些高级比较有用的特性
* $.when() //接收一个参数对象，返回一个promises对象(resolved或rejected) {:&.bounceIn}
* deferred.done //当promises返回resolved时候触发
* deferred.fail //当promises返回rejected时候触发

[slide]
## Deferred的简单实例
-----
<div class="columns-1">
<pre><code class="javascript">(function(window, document){
    function animationDone(){
        $("#statusbar").sildeDown(function(){
            console.log("animation is done!");
        },5000);
    }
    $(function(){
        animationDone();
    });
}(window, document));
</code></pre>
</div>

[slide]
## Deferred的简单实例
<div class="columns-1">
<pre><code class="javascript">(function(window, document){
    function animationDone(){
        return $.Deferred(function(){
        $("#statusbar").sildeDown(this.resolve,5000);}).promise();
    }
    function callBack(){
        console.log("animation is done!");
    }
    $.when(animationDone()).done(callBack);
}(window, document));
</code></pre>
</div>

[slide]
## Deferred的简单实例
-----
<div class="columns-1">
<pre><code class="javascript">(function(window, document){
    $.when($.ajax({
        url: '/crmComerController/loadCommerPoolMobile.do',
        type: "get",
        data: {page: "1", rows: 10},
    })).done(
        console.log('get data is ok!');
    ).fail(
        console.log('get data is fail!');
    );
}(window, document));
</code></pre>
</div>

[slide]
## 使用pipe过滤和then包装 done和fail
-----
<div class="columns-1">
<pre><code class="javascript">(function(window, document){
    $.when($.ajax({
        url: '/crmComerController/loadCommerPoolMobile.do',
        type: "get",
        data: {page: "1", rows: 10},
    })).pipe(function(data){
        if(data.rows.lenght>0){
            return data;
        }else{
            return $.Deferred.reject();
        }
    }).then(success,fail);
    function success(){
        console.log('get data is ok!');
    }
    function fail(){
        console.log('get data is fail!');
    }
}(window, document));
</code></pre>
</div>

[slide]

## 其他对象
* Deferred对象将逻辑从函数体重抽取出来放在when等对象中可以更好的管理和维护
* 使用Deferred.progress和Deferred.notify跟踪进度
* 使用Deferred.state检查Deferred对象状态
[slide]

# Q?A:Thanks