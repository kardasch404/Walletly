    // db.js
    const mysql = require('mysql2'); // or 'mysql'

    const connection = mysql.createConnection({
        host: 'localhost', 
        user: 'your_username', 
        password: 'your_password', 
        database: 'your_database_name' 
    });

    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to MySQL database: ' + err.stack);
            return;
        }
        console.log('Connected to MySQL database as id ' + connection.threadId);
    });

    module.exports = connection;