var userName = $('input[name="username"]');
var password = $('input[name="password"]');
var loginBtn = $('.login-btn');


loginBtn.click(function(){
    var name = userName.val();
    var pw = password.val();
    if(!name){
        alert('输入用户名');
        return;
    }
    if(!pw){
        alert('输入密码');
        return;
    }
    login(name,pw);
});

function login(name,pw){
    $.ajax({
        type:'post',
        url:'/login',
        data:{
            username:name,
            password:pw,
        },
        success:function(res){
            res = JSON.parse(res);
            if(res.code == 0){
                location.href = location.origin;
            }
            console.log(typeof res);
        },
        error:function(error){
            console.log(error);
        }
    });
}

