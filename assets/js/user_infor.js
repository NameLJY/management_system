$(function () {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function (value) {      
            //拿到value值
            if (value.length > 6) {
                return "昵称不能超过6个字符";
            }
          c
            layer.msg('修改昵称成功')
            
        }
    })

    initGetInfor()
     
    // 初始化用户信息
    function initGetInfor() {
        $.get({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                //d调用form.val（） 快速为表单赋值
               //console.log(res)
                form.val('foruserinfor', res.data);
               
            }
        })
    }


    //重置表单数据
    $('#btnrest').on('click', function (e) {
        //  阻止表单默认重置行为
        e.preventDefault();
        initGetInfor()
    })


    //监听表的提交事件 
    $('.layui-form').on('submit', function (e) {
        //阻止表的默认提交行为
        e.preventDefault();

        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            //快速获取表单中填入的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                };
                //调用父页面中的方法重新渲染头像,以ifram为例，他是index主页的子页
                //window代表当前的这个页面
                window.parent.getUserInfor()
            }



        })

    })

})