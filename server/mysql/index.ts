import mysql from 'mysql';
import config from '../shared/config';

export default function database(sql, data) {
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
