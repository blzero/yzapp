var content = $('.content');
var btn = $('.add-device');

btn.click(function(){
    var text = content.val();
    if(!text){
        alert('null');
        return;
    }
    addDevice(JSON.stringify(text));
});

// [{"electricity":22,"power":33,"voltage":44},{"electricity":22,"power":33,"voltage":44}]
var addDevice = function(data){
    console.log(data);
    $.ajax({
        type:'post',
        url:'/addDevice',
        data:{
            device:data,
        },
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
        lis += `<li>${item.Id}:${item.electricity}:${item.voltage};:${item.power}</li>`;
    }

    list.html(lis);

}