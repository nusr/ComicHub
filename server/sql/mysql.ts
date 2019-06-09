import mysql from 'mysql';
import config from '../shared/config';

export default function database(sql: string, data: any, callback: any): void {
    const connection = mysql.createConnection(config.mysql);
    connection.connect();
    connection.query(sql, data, (error, results) => {
        if (error) {
            throw error;
        }
        callback(results);
    });
    connection.end();
}
