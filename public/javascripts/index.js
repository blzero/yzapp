var content = $('.content');
var btn = $('.add-device');

btn.click(function () {
    var text = content.val();
    if (!text) {
        alert('null');
        return;
    }
    addDevice(text);
});

var randomId = function () {
    var result = '';
    for (let i = 0; i < 5; i++) {
        var capital = Math.random() * 26 + 65; //65-90
        var lower = Math.random() * 26 + 97; //97-122
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

var randomData = function () {
    var deviceIds = ["4Zv5Wc6Cn8Ao2Gh", "1Nx9Up7Va4Da0If", "7Nt6Rx3Dt7Nw8Ep", "0Pj7Ow7Uf7Wy9Kn", "8Fl9Hi0Ct8Aq0Vv", "5Vh7Kc3Yq3Ir4Nu", "6Ht1Xm2Yu8Mi4Qu", "1Ty3Yb7Db1Oi7Qg", "8Zg7Sb3Ki0Vc9Ug", "6Um2Gt1Na7Pv9Uy", "3Ng5Oq8Qf1Vw9Ja", "4Wd7Tl1Sm9Sk1Zf", "2Fd0Mi5Hh4Fy6Kd", "3Bs8Tp3Yc7Zl5Re", "5Ce2Qy5Ln9Gj8Ck", "7Eu9Gm1Xj1Rp3Ly", "4Mj1Bq9Jn8Th0Ub", "4Ns8Js7Cb9Nz3Sw", "9Eq5Zy1Po2Jj1Xd", "0Sm5Tr8Th8Dz7Yc", "1Nu7Yq4Et2Tj7Vl", "7Ap0Oa6Iv5Cx6Cj", "7Mx7Ju5Aq2Hd5Np", "8Fd7Pa2Na1Tb7Lj", "4Wv0To9Ov0Cb0Vd", "6Ro1Oc2El3Al3Os", "1Bt4Px0Fy8Vq4Xv", "9Gy1Xi2Au0Br1Tl", "0Yn2Rr5Av4Mt3Ey", "9Ez1Qu7Al3Vj6Ly", "2Cy2Vf8Wj1Au2Oy", "1Bp6Yr8Fv0Ox6Na", "0Ms0Wk1Fl1Wc1Rk", "0Hn4Fy8Pa9Et9Ic", "4Fg8Fw8Si6Tm4Vw", "3Xh6Vn4Mn0Cm9Ib", "3Fs9Pf8Is2Il5Fj", "9Yv1Mi6Yi1Jd6Jq", "5Kc7Ll2Na4Sv8Wq", "7At3Qd3Bs6Cu2Kt", "4Nm2Wm0Sq9Uo4Ht", "1Up5Hu5Db5Al2Ds", "7Il5Nu6Pv6Uk0Sd", "8Ga9Nr7Yz6Yl1Ew", "8Xp1Xs9Uu2To9Do", "2Op3Ga8Fn5Gv4Fd", "3Sz9Eo8Wt5Cc3Fy"];

    // var did = randomId();
    {
        var r = Math.random() * deviceIds.length;
        r = Math.floor(r);
        var did = deviceIds[r];
    }
    var electricity = Math.random() * 1000 + 1; //mA

    var voltage = Math.random() * 220 + 1; //V
    var temperature = Math.random() * 100 + 1; //℃

    var power = electricity / 1000 * voltage; //W

    return {
        id: did,
        electricity: Math.floor(electricity),
        voltage: Math.floor(voltage),
        power: Math.floor(power),
        temperature: Math.floor(temperature),
    }

}

// [{"id":"3Sz9Eo8Wt5Cc3Fy","electricity":146,"voltage":32,"power":4,"temperature":41}]
var addDevice = function (data) {
    console.log(data);
    $.ajax({
        type: 'post',
        url: '/addDevice',
        data: {
            device: data,
        },
        success: function (res) {
            console.log(res);
        },
        error: function (error) {
            console.log(error);
        }
    });
}


var timingAddData = function () {
    var temp = [];
    var d = randomData();
    temp.push(d);
    // console.log(JSON.stringify(temp));
    addDevice(JSON.stringify(temp));
    setTimeout(timingAddData, 240000);
}
// timingAddData();




var queryBtn = $('.query-btn');
queryBtn.click(function () {
    $.ajax({
        type: 'post',
        url: '/queryDevice',
        data: {},
        success: function (res) {
            var data = JSON.parse(res);
            rendList(data);
            // var temp = [];
            // data.map(function (item, i) {
            //     temp.push(item.deviceId);
            // });
            // console.log(temp);

            console.log(data);
        },
        error: function (error) {
            console.log(error);
        }
    });
});
var rendList = function (data) {
    var list = $('.list');
    var lis = '';
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        lis += `<li>${item.Id}:${item.electricity}:${item.voltage};:${item.power} --${item.deviceId}</li>`;
    }

    list.html(lis);

}