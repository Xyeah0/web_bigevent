$(function(){


    var form =layui.form
    form.verify({
        pwd:[/^[\S]{6,12}$/,'密码长度必须为6-12位且为非空格'],
        samePwd:function(value){
            if(value === $('[name=oldPwd]').val()){
                return '新旧密码不能相同！'
            }
        },
        confPwd:function(value){
            if(value!==$('[name=newPwd]').val()){
                return '两次输入的新密码不相同！'
            }
        }
        
    })

$('.layui-form').on('submit',function(e){
    e.preventDefault();
    console.log("gggg");
    $.ajax({
        method:'post',
        url:'/my/updatepwd',
        data:$(this).serialize(),
        success:function(res){
            if(res.status !== 0){
                return layui.layer.msg(res.responseJSON.message)
            }
            layui.layer.msg('更新密码成功！')
            //重置表单
            $('.layui-form')[0].reset();
        }
    })
})





})