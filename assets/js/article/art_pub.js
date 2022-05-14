initCate();
var layer = layui.layer
var form = layui.form
        
        // 获取文章类别
        function initCate(){
            $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res){
                if(res.status!==0){
                    return layer.msg('获取分类数据失败')
                }
                //调用模板引擎渲染分类可选项
                var sss = template('tpl-cate',res)
                $('[name=cate_id]').html(sss)
                // console.log(sss);
                
                //layui渲染机制问题//重新渲染页面
                form.render()
            }
    
            })
        }

//富文本初始化
        initEditor()

//封面图片裁剪
 // 1. 初始化图片裁剪器
 var $image = $('#image')

 // 2. 裁剪选项
 var options = {
   aspectRatio: 400 / 280,
   preview: '.img-preview'
 }

 // 3. 初始化裁剪区域
 $image.cropper(options)


//  模拟点击文件上传
$('#btnUploadImage').on('click',function(){
    $('#coverFile').click()
})
//点击文件上传
$('#coverFile').on('change',function(e){
    var files=e.target.files

    if(files.lenth===0){
        return
    }

    var newImgURL = URL.createObjectURL(files[0])
    console.log(newImgURL);
    $image
   .cropper('destroy')      // 销毁旧的裁剪区域
   .attr('src', newImgURL)  // 重新设置图片路径
   .cropper(options)        // 重新初始化裁剪区域

})

//定义文章发布状态
var art_state='已发布'
$('#saveSketch').on('click',function(){
    art_state='草稿'
})


$('#form_pub').on('submit', function(e) {
    // 1. 阻止表单的默认提交行为
    e.preventDefault()
    // 2. 基于 form 表单，快速创建一个 FormData 对象
    var fd = new FormData($(this)[0])
    // 3. 将文章的发布状态，存到 fd 中
    fd.append('state', art_state)
    // 4. 将封面裁剪过后的图片，输出为一个文件对象
    $image
      .cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布
        width: 400,
        height: 280
      })
      .toBlob(function(blob) {
        // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作
        // 5. 将文件对象，存储到 fd 中
        fd.append('cover_img', blob)
        // 6. 发起 ajax 数据请求
        publishArt(fd)
        function publishArt(fd){
            $.ajax({
                method:'POST',
                url:'/my/article/add',
                data:fd,
                contentType:false,
                processData:false,
                success:function(res){
                    if(res.status!==0){
                        return layer.msg(res.message)
                    }
                    layer.msg('发布文章成功！')
                    location.href='/article/art_list.html'
                }
        
            })
        }
      })
  })


