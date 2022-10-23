//每次在做ajax请求时，会先调用ajaxPrefilter，在这个函数中
//参数可以拿到ajax配置对象
$.ajaxPrefilter(function(options){
 // console.log(options.url); //拿到的是ajax请求的url地址
 //拼接地址
 options.url = 'http://www.liulongbin.top:3007'+options.url;



 //以/my开头的有权限的接口， 为他们统一设置headers访问权限
  // 统一为有权限的接口，设置 headers 请求头
  if (options.url.indexOf('/my/') !== -1) {
    options.headers = {
      Authorization: localStorage.getItem('token') || ''
    }
  }
})
