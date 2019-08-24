# wx-ajax

<!-- logo -->
<div align=center>
    <img height="200" src="https://raw.githubusercontent.com/displayLi/wx-ajax/master/logo.png"/>
</div>

## 特性

1、基于 wx.request 的二次封装支持 Promise 和原有 callback 回调函数 （上传文件模块开发中）

2、使用门槛低，容易上手，提供和axios相似体验，兼容低版本手机系统。

![npm (scoped)](https://img.shields.io/badge/npm-v5.6.0-brightgreen.svg) 
![installsize (scoped)](https://img.shields.io/badge/install%20size-74.2kb-yellow.svg) 
![build (scoped)](https://img.shields.io/badge/build-passing-yellowgreen.svg) 
![licenses (scoped)](https://img.shields.io/badge/licenses-MIT-blue.svg) 

## 安装

```
npm i wx-ajax -S --production
```

## 使用方法

<a href="https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html?search-key=npm">小程序如何使用 npm 模块</a>

***参数说明***


|字段|类型|默认值|必填|
|:---|:---:|---:|---:|
|path|String|无|是|
|method|String|GET|GET请求可省略|
|showLoading|Object|false 不显示, true显示默认的配置, 默认值是false|否|
|header|Object|{content-type:application/json, accessToken: wx.getStorageSync("token")}|否|
|dataType|String|json|否|
|data|Object|{}|否|
|success|Function|null|Promise下省略|
|fail|Function|null|Promise下省略|


```
// showLoading 有三个字段
showLoading：{
    msg:"可以自定义你的loading提示",
    endTime:200  // loading的延时关闭 默认 500毫秒
    mask: false  // 默认是false 和微信小程序配置的一样
}

```


***引入***

***1、require***
```
const api = require('wx-ajax')(host);  // 你的服务器域名

// 举例:
const api = require('wx-ajax')('http://jsonplaceholder.typicode.com');  // 实例化的ajax对象

```

***2、es6***

```
import api from 'wx-ajax';
const api = api(host);   // 你的服务器域名

// 举例：
const api2 = api('http://api.link97.com:8081');
```
#### Promise 请求示例
***1、POST***

```
api.ajax({
    path:'/posts',
    method:'POST',
    showLoading:true,
    data:{
        id:1
    }
}).then(({ data }) => console.log(data));
```

***2、GET***

```
api.ajax({
    path:'/posts',
    showLoading:true
    data:{  // get的传参方式跟post是一样的 都是data对象传参 当然也可以在url处拼接
        id:1
    }
}).then(({ data }) => console.log(data));
```

***3、PUT***

```
api.ajax({
    path:`/posts/${editId}`,
    showLoading:{
        endTime:600,
        msg:"修改中..."
    },
    data:{ 修改的data }
}).then(res => console.log(res));
```


***4、DELETE***

```
api.ajax({
    path:`/posts/${deleteId}`,
    showLoading:{
        endTime:600,
        msg:"删除中..."
    }
}).then(res => console.log(res));
```

#### 回调函数请求示例

***1、POST***

```
api2.ajax({
    path:'/goods',
    method:'POST',
    showLoading:true,
    data:{
        id:1
    },
    success(res) {
        console.log(res);
    },
    fail(err) {
        console.log(err);
    }
})
```

***2、GET***

```
api2.ajax({
    path:'/goods',
    showLoading:true
    data:{  // get的传参方式跟post是一样的 都是data对象传参 当然也可以在url处拼接
        id:1
    },
    success(res) {
        console.log(res);
    },
    fail(err) {
        console.log(err);
    }
})
```

***3、PUT***

```
api2.ajax({
    path:`/goods/${editId}`,
    showLoading:{
        endTime:600,
        msg:"修改中..."
    },
    data:{ 修改的data },
    success(res) {
        console.log(res);
    },
    fail(err) {
        console.log(err);
    }
})
```


***4、DELETE***

```
api2.ajax({
    path:`/goods/${deleteId}`,
    showLoading:{
        endTime:600,
        msg:"删除中..."
    },
    success(res) {
        console.log(res);
    },
    fail(err) {
        console.log(err);
    }
})

```
***同样支持axios 方法 方法内接受三个参数 path：String， data：Object，header：Object (header、data选填，path必填)***
```
api.ajax('/posts').then(res => console.log(res)).catch(err => console.log(err));

```

Copy right Mason 有问题联系 QQ：463961434

Author By Mason @ LINK + 创意工作室