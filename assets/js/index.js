$(function () {
    //调用获取用户基本信息函数
    getUserInfor();

var layer = layui.layer;
$('#btn_goout').on('click',function(){

   
    layer.confirm('是否要退出登录？？？', {icon: 1, title:'提示'}, function(index){
        // 退出登录要做的两件事情1.清除本地存储token 2.跳转到登录页
        localStorage.removeItem('token');
        location.href = '../home/login.html'
       
      });
})


})






//获取用户的基本信息
function getUserInfor() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //请求头配置对象
        
        success: function (res) {
            if (res.status !== 0) {
                return
            }
            console.log(res)
            //调用一个函数，渲染用户的头像
            renderAvatar(res.data)

        }

    })

}
//创建一个函数，渲染用户的头像
function renderAvatar(user) {
    //获取用户昵称，并且判断用户是否有别名
    var name = user.nickname || user.username;
    //设置欢迎登录人文本，
    $('#wellcom').html('欢迎&nbsp;：' + name);
    //设置用户头像，判断用户是否已经存在头像
    if (user.user_pic !== null) {
        //如果用户有自己头像，则使用用户自己的头像
        $('.layui-nav-img')
            .attr('src', user.user_pic)
            .show();
        //让文本隐藏
        $('.text-avatar').hide()
    } else {
        //如果用户不存在自己的头像 ，则显示文本头像
        // 3.2 渲染文本头像
        $('.layui-nav-img').hide()
        //去第一个字符串，并且大写显示
        var first = name[0].toUpperCase()
        $('.text-avatar')
            .html(first)
            .show()
    }

}