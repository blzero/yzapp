const mysql = require('mysql');


const db = function () {

    var connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        database:'test'
    });

    open();
    function open() {
        connection.connect();
    }

    function close() {
        connection.end();
    }

    function query(condition,values,callback) {
        values = values || [];
        // open();
        connection.query(condition,values, function (err, rows, fields) {
            if (err) throw err;
            callback && callback(rows);
        });
        // close();

    }

    return {
        query:query,
    }
}

module.exports =  db();