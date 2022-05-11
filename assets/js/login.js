$(function(){
// click -> reg
$('.link_login').on('click',function(){
    $('.login-box').hide();
    $('.reg-box').show();
})
// click ->login
$('.link_reg').on('click',function(){
    $('.reg-box').hide();
    $('.login-box ').show();
})

// layui提供的表单验证对象
var form=layui.form
form.verify({
    pass: [
        /^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
      ],
    repass:function(value){
        var pwd=$(".reg-box [name=password]" ).val();
        if(value!==pwd){
            return '两次密码不一致！'
        }
    } 
    }); 

//注册事件
$('#form_reg').on('submit',function(e){
    e.preventDefault();
    var data={
     username:$('#form_reg [name=username]').val(),
     password:$('#form_reg [name=password]').val()
    }
    $.post('/api/reguser',data,function(res){
        if(res.status!==0){
            return layer.msg(res.message);
        }
        layer.msg('注册成功，请登录！');
        $('.link_reg').click();
        
    })  
})            


//登陆事件
$('#form_login').submit(function(e){
    e.preventDefault();
    $.ajax({
       url:'/api/login', 
       method: 'POST',
       data: $(this).serialize(),
       success:function(res){
        if(res.status!==0){
            return layer.msg(res.message);
        }
        layer.msg('登录成功！');
        // token字符串（调用权限接口）存到本地存储内
        localStorage.setItem('token', res.token);
        location.href='/index.html';
        }
    })

})

})