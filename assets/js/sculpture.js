$(function () {
    var layer = layui.layer;
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)


    //为按钮绑定点击事件
    $('#shangchuang').on('click', function () {
        //模拟file文件点击，上传图像
        $('#file').click()
    });

    // 为文件选择框绑定change事件，当页面内容发生改变时将触发此事件
    $('#file').on('change', function (e) {
        // console.log(e)
        var files = e.target.files;
        console.log(files.length)
        //判断用户是否选择照片
        if (files.length == 0) {
            return layer.msg('请上传图片！！！');
        }
        //1.拿到用户选择的文件
        var file = e.target.files[0];
        //根据选择的文件，创建一个对应的 URL 地址：
        var newImgURL = URL.createObjectURL(file);
        //先`销毁`旧的裁剪区域，再`重新设置图片路径`，之后再`创建新的裁剪区域`：
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域


    })


    //为确定按钮绑定单击响应事件
    $('#confirm_btn').on('click', function () {
        //1..拿到用户裁剪之后的头像
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
 //2.调用接口上传到服务器进行保存
    $.ajax({
        method:'POST',
        url:'/my/update/avatar',
        data:{
            avatar:dataURL
        },
        success:function(res){
            if(res.status !== 0 ){
                return layer.msg('更换头像失败！！！');
            }
            layer.msg('更新头像成功！！！');
            window.parent.getUserInfor();
        }
    })

    })
   


})

