$(function(){
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],

        //判断两次密码是否一致
        //这里的value是指给那个input标签加，value的值就是那个input

        samePwd:function(value){
           //判断原密码的值是否与当前的密码相等
           console.log()
           if($('[name = oldPwd]').val() === value){
            return '新的密码和旧密码不能一致';
           }
        },
        validata:function(value){
            if(value !== $('[name = newPwd]').val()){
                return '两次密码输入的不一致!!!';
            }
        }
        
    })



    //监听表表单提交事件
    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        //手动发起请求
        $.ajax({
            method:'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0 ){
                    return layer.msg('更新信息失败！！')
                }
                layer.msg('更新密码成功！！！');
                // 更新信息成功之后，我需要将信息清空,重置表单
                $('.layui-form')[0].reset();
            }
        })

    })
})