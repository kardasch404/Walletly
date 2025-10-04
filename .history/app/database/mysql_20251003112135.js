    // db.js
    const mysql = require('mysql2'); // or 'mysql'

    const connection = mysql.createConnection({
        host: #
        user: 'user', 
        password: '', 
        database: 'walletly' 
    });

    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to MySQL database: ' + err.stack);
            return;
        }
        console.log('Connected to MySQL database as id ' + connection.threadId);
    });

    module.exports = connection;