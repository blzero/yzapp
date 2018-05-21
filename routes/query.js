var db = require('../database/index');

const queryF = function (req, res, next) {

    if (!req.session.sign) {
        res.redirect('/login');
        return;
    }

    let sql = '';
    if (req.body.deviceId) {
        let deviceId = req.body.deviceId;
        sql = `SELECT * FROM device WHERE deviceId='${deviceId}'`;
    } else {
        sql = `SELECT * FROM device`;
    }

    db.query(sql, [], function (data) {

        res.end(JSON.stringify(data));
    });


};

module.exports = queryF;