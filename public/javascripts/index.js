var content = $('.content');
var btn = $('.add-device');

btn.click(function(){
    var text = content.val();
    if(!text){
        alert('null');
        return;
    }
    addDevice(JSON.parse(text));
});

var addDevice = function(data){
    $.ajax({
        type:'post',
        url:'/addDevice',
        data:data,
        success:function(res){
            console.log( res);
        },
        error:function(error){
            console.log(error);
        }
    });
}

var queryBtn = $('.query-btn');
queryBtn.click(function(){
    $.ajax({
        type:'post',
        url:'/queryDevice',
        data:{},
        success:function(res){
            var data = JSON.parse(res);
            rendList(data);
            console.log( data);
        },
        error:function(error){
            console.log(error);
        }
    });
});
var rendList =function(data){
    var list = $('.list');
    var lis = '';
    for(var i = 0;i<data.length;i++){
        var item = data[i];
        lis += `<li>${item.Id}:${item.m}:${item.name}</li>`;
    }

    list.html(lis);

}