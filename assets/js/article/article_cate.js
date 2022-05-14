$(function(){

  var form=layui.form;

    initAtrCateList();
        function initAtrCateList(){

            $.ajax({
                method: 'GET',
                url:'/my/article/cates',
                success:function(res){
                //    var htmlstr= template('tpl-table',res);
                //    $('tbody').html(htmlstr);
                var htmlStr = template('tpl-table', res)
        $('tbody').html(htmlStr)
                }

            })
        }

        var indexAdd = null
        $('#btnAddCate').on('click', function() {
          indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
          })
        })

        $('body').on('submit','#form_add',function(e){
          e.preventDefault();
          $.ajax({
            method:'POST',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:function(res){
              if(res.status!==0){
                return layui.layer.msg('新增分类失败')
              }
              initAtrCateList()
              layui.layer.msg('新增分类成功')
              // 根据索引，关闭对应的弹出层
              layer.close(indexAdd)
            }
          })
        })

          
          var indexEdit = null;
          $('tbody').on('click','.btn-edit', function(){
            console.log($(this).attr("data-id"));
            //弹出一个修改文章分类信息的层
            indexEdit = layer.open({
              type: 1,
              area: ['500px', '250px'],
              title: '编辑文章类别',
              content: $('#dialog-edit').html()
            })

            var id=$(this).attr("data-id");
            $.ajax({
              method:'GET',
              url:'/my/article/cates/'+id,
              success:function(res){
                form.val("form_edit",res.data);
              }
            })

          })

          $('body').on('submit','#form_edit',function(e){
            e.preventDefault();
            console.log($(this).serialize());
            $.ajax({
              method:'POST',
              url:'/my/article/updatecate',
              data:$(this).serialize(),
              success:function(res){
                if(res.status!==0){
                  return layui.layer.msg('修改分类失败')
                }
                initAtrCateList()
                layui.layer.msg('修改分类成功')
                // 根据索引，关闭对应的弹出层
                layer.close(indexAdd)
              }
            })
          })

  // 通过代理的形式，为删除按钮绑定点击事件
  $('tbody').on('click', '.btn-delete', function() {
    var id = $(this).attr('data-id')
    // 提示用户是否要删除
    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
      $.ajax({
        method: 'GET',
        url: '/my/article/deletecate/' + id,
        success: function(res) {
          if (res.status !== 0) {
            return layer.msg('删除分类失败！')
          }
          layer.msg('删除分类成功！')
          layer.close(index)
          initAtrCateList()
        }
      })
    })
  })




})