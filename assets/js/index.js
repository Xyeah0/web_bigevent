$(function(){
  getUserInfo()

  $('#btnLogout').on('click',function(){
    layer.confirm('确定退出系统?', {icon: 3, title:'提示'}, function(index){
    //  清除本地缓存身份标记token
     localStorage.removeItem('token')
     location.href='/login.html'
     layer.close(index);
    });
  })

  
})
//让子页面调用的函数要放到全局变量中,也不能放到$(function({}))中
function getUserInfo(){
  $.ajax({
      method:'GET',
      url:'/my/userinfo',
      success: function(res) {
        if (res.status !== 0) {
          return layui.layer.msg('获取用户信息失败！')
        }
        // 调用 renderAvatar 渲染用户的头像
        renderAvatar(res.data)
      }
      
  })
}
function renderAvatar(user) {
  // 1. 获取用户的名称
  var name =  user.username
  // 2. 设置欢迎的文本
  $('#welcome').html(name)
  // 3. 按需渲染用户的头像
  if (user.user_pic !== null) {
    // 3.1 渲染图片头像
    $('.layui-nav-img')
      .attr('src', user.user_pic)
      .show()
    $('.text-avatar').hide()
  } else {
    // 3.2 渲染文本头像
    $('.layui-nav-img').hide()
    var first = name[0].toUpperCase()
    $('.text-avatar')
      .html(first)
      .show()
  }
}