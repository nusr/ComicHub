const mysql = require('mysql');
const config = require('../shared/config');

function database(sql, data) {
    return new Promise((resolve) => {
        const connection = mysql.createConnection(config.mysql);
        connection.connect();
        connection.query(sql, data, function(error, results, fields) {
            if (error) {
                throw error;
            }
            resolve(results);
        });
        connection.end();
    });
}

module.exports = database;
