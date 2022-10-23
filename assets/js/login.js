
$(function () {
    $('#regLink').on('click', function () {
        $('.loginPage').hide();
        $('.regPage').show();
    })
    $('#loginLink').on('click', function () {
        $('.loginPage').show();
        $('.regPage').hide();
    });



    //通过layui 获取form对象

    var form = layui.form;
    var layer = layui.layer;

    form.verify({
        pw1: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
        // 校验两次密码是否一致
        reword: function (value) {
            //通过形参拿到的参数是确认密码框的值
            var pwd = $('.regPage [name=password]').val();
            if (pwd != value) {
                return '两次密码不一致';
            }
        }

    })

   
    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        // 1. 阻止默认的提交行为
        e.preventDefault()
        // 2. 发起Ajax的POST请求
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                //登录提示信息
                return layer.msg(res.message)
            }
            layer.msg('注册成功! 请登录');

            //模拟用户点击返回登录按钮
            $('#loginLink').click()
        })
    })



    //监听用户登录事件
    $('#form_login').submit(function(e){
        e.preventDefault();
        //用户点击登录发起ajax请求
        $.ajax({
            url:'/api/login',
            method:'POST',
            //快速获取表单中的数据  this指向 $('#form_login')
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('密码错误!')
                }
                layer.msg('登录成功');
          //将登录成功得到的token字符串保存到本地储存器中
          //以键值对形式储存
           localStorage.setItem('token',res.token)
              location.href = './index.html'
                // console.log(res.token)
            }
        })
    })


    

  

})