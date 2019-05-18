import mysql from 'mysql';
import config from '../shared/config';

export default function database(sql: string, data: any, callback: any) {
    const connection = mysql.createConnection(config.mysql);
    connection.connect();
    connection.query(sql, data, function(error, results) {
        if (error) {
            throw error;
        }
        callback(results);
    });
    connection.end();
}
