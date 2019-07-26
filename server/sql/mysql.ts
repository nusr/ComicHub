import mysql from 'mysql';
import config from '../shared';

export default function database(sql: string, data: object | null, callback: Function): void {
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
