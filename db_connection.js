const mysql  = require('mysql');
require('dotenv').config();

// Database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'jonathan',
    password: 'uScSJ3yiifRpGIG@',
    database: 'Jonathan_Ljungberg_express_exam'
});


connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

module.exports = connection;