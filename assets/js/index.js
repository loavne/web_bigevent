$(function() {
    // 调用getUserInfo获取用户信息
    getUserInfo();
    var layer = layui.layer;
    $('#btnLogout').on('click', function() {
        //弹出退出框
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function(index) {
            //1.清空
            localStorage.removeItem('token');
            //2重新跳转到登录页
            location.href = '/login.html'
                //3关闭弹出框
            layer.close(index);
        })
    })
})

function getUserInfo() {
    $.ajax({
        method: "GET",
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) return layui.layer.msg('获取用户信息失败');
            renderAvatar(res.data);
        }
    })
}

//渲染用户头像
function renderAvatar(user) {
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    if (user.user_pic !== null) {
        //渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide();
    } else {
        //渲染文字头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first);
    }
}