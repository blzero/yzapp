var content = $('.content');
var btn = $('.add-device');

btn.click(function(){
    var text = content.val();
    if(!text){
        alert('null');
        return;
    }
    addDevice(text);
});

var randomId = function(){
    var result = ''; 
    for(let i =0;i<5;i++){
        var capital = Math.random() * 26 + 65; //65-90
        var lower  =  Math.random() * 26 + 97;//97-122
        var dig = Math.random() * 10;
        capital = Math.floor(capital);
        lower = Math.floor(lower);
        dig = Math.floor(dig);

        var str1 = String.fromCharCode(capital);
        var str2 = String.fromCharCode(lower);

        result += `${dig}${str1}${str2}`;
    }

    return result;
}

var randomData = function(){
    var did = randomId();
    var electricity = Math.random() * 1000 + 1;//mA

    var voltage = Math.random() * 220 + 1;//V
    var temperature = Math.random() * 100 + 1;//℃

    var power = electricity*1000 * voltage;//W

    return{
        id:did,
        electricity:Math.floor(electricity),
        voltage:Math.floor(voltage),
        power:Math.floor(power),
        temperature:Math.floor(temperature),
    }

}


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


var  timingAddData = function(){
    var temp = [];
    var d = randomData();
    temp.push(d);
    addDevice(JSON.stringify(temp));
    setTimeout(timingAddData,50000);
}
// timingAddData();




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
        lis += `<li>${item.Id}:${item.electricity}:${item.voltage};:${item.power} --${item.deviceId}</li>`;
    }

    list.html(lis);

}