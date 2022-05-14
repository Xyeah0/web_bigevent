$(function(){


        //定义查询参数对象
        var q={
            //页码
            pagenum:1,
            //每页几条
            pagesize:2,
            //文章分类的id
            cate_id:'',
            //文章发布状态
            state:''
        }
        //form layer
        var layer=layui.layer
        var form=layui.form
    
    
        initTable()
        //获取文章列表
        function initTable(){
            $.ajax({
                method:'GET',
                url:'/my/article/list',
                data:q,
                success:function(res){
                    if(res.status !==0){
                        return layer.msg('获取文章列表失败！')
                    }
                    //模板引擎渲染页面数据
                    // layer.msg('获取文章列表成功！')
                    var htmlStr=template('tpl-table',res)
                    $('tbody').html(htmlStr)

                    renderPage(res.total)
                } 
            })
        }
        
        var laypage=layui.laypage
        // 定义分页方法
        function renderPage(total){

            laypage.render({
                elem: 'pageBox' ,//注意，这里的 test1 是 ID，不用加 # 号
                count: total ,//数据总数，从服务端得到
                limit:[q.pagesize],
                curr:q.pagenum,
                layout:['count','limit','prev', 'page', 'next','skip'],
                limits:[2,3,5,10],
                jump: function(obj, first){
                    //obj包含了当前分页的所有参数，比如：
                    q.pagenum=obj.curr;
                    q.pagesize=obj.limit;

                    if(!first){
                        initTable()
                      }
                }
                
              });
              
        }
    
        initCate()
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
    
    
    
    $('#form-search').on('submit',function(e){
        e.preventDefault();
        var cate_id=$('[name=cate_id]').val()
        var state=$('[name=state]').val()
        console.log(state);
        q.cate_id=cate_id;
        q.state=state;
        initTable()
    
    
    })


// 通过代理的形式，为删除按钮绑定点击事件
$('tbody').on('click', '.btn-delete', function() {
    var id = $(this).attr('data-id')
     var len = $('.btn-delete').length
    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
      $.ajax({
        method: 'GET',
        url: '/my/article/delete/' + id,
        success: function(res) {
          if (res.status !== 0){
            return layer.msg('删除文章失败！')
          }
          layer.msg('删除文章成功！')
          layer.close(index)
          initTable()
        }
      })
    })
  })


//   $('#form-search').on('submit',function(e){
//       e.preventDefault()
//         q.cate_id=$('[name=cate_id]').val()
//         q.state=$('[name=state]').val()
//         console.log(q)
//         initTable() 
//   })


})