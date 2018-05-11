var express = require('express');
var router = express.Router();
var session = require('express-session');
var db = require('../database/index');

router.use(session({
  secret: 'app secret',
  cookie: {
    maxAge: 60 * 1000 * 300
  } //过期时间 ms
}))

//process session
/* GET home page. */

router.get('/', function (req, res) {
  //session 已经登陆
  if (req.session.sign) {

    res.render('index', {
      title: 'Express'
    });
  } else {
    //未登陆过
    // req.session.sign=true;
    // req.session.name = 'Type Zero';
    // res.send('Welcome:'+'<strong>'+req.session.name+'</strong>');
    res.redirect('/login');
  }
});

router.get('/login', function (req, res, next) {
  res.render('login', {
    title: 'login'
  });
});


router.post('/login', function (req, res, next) {
  var params = req.body;
  db.query('SELECT * FROM user', function (result) {

    let find = false;
    let canLogin = false;

    for (let i = 0; i < result.length; i++) {
      let name = result[i].name;
      let pw = result[i].pw;
      if (params.username == name) {
        find = true;
      }
      if (find && params.password == pw) {
        canLogin = true;
      }

      break;
    }

    let content = '';
    if (!find) {
      content = resultData(1);
      res.end(JSON.stringify(content));
      return;
    }
    if (!canLogin) {
      content = resultData(2);
      res.end(JSON.stringify(content));
      return;
    }

    if (canLogin) {
      req.session.sign = true;
      content = resultData(0);
      res.end(JSON.stringify(content));
      return;
    }

  });

});


router.post('/addDevice', function (req, res, next) {
  if (req.body) {
    var str = `INSERT INTO device (m,name) VALUES ('${req.body.M}','${req.body.NAME}')`;

    db.query(str, function () {

      res.end('success');
    });

  } else {
    res.end('null');
  }
});


router.post('/queryDevice', function (req, res, next) {
  var str = `SELECT * FROM device`;

  db.query(str, function (data) {

    res.end(JSON.stringify(data));
  });
});



function resultData(code) {
  switch (code) {
    case 0:
      return {
        code: code,
        msg: 'success'
      };
      break;
    case 1:
      return {
        code: code,
        msg: '用户不存在'
      };
      break;
    case 2:
      return {
        code: code,
        msg: '密码不正确'
      };
      break;
  }
}



module.exports = router;