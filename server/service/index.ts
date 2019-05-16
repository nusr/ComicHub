import mysql from '../mysql';

function getAllData(tableName: string) {
  return new Promise(async (resolve) => {
    const sql = `SELECT * FROM ${tableName}`;
    const result = await mysql(sql, undefined);
    resolve(result);
  });
}

function searchItem(value: string | number, tableName: string, field = 'url') {
  return new Promise(async (resolve) => {
    const sql = `SELECT * FROM ${tableName} WHERE ${field}=?`;
    const results = await mysql(sql, [value]);
    resolve(results || []);
  });
}

function searchOne(
  value: string | number,
  tableName: string,
  field = 'url'
): any {
  return new Promise(async (resolve) => {
    const sql = `SELECT * FROM ${tableName} WHERE ${field}=?`;
    const results: any = (await mysql(sql, [value])) || [];
    resolve(results[0]);
  });
}

function addItem(data: any, tableName: string) {
  return new Promise(async (resolve) => {
    // 判断是否存在
    const results = await searchItem(data.url, tableName);
    if (results && results > 0) {
      resolve(false);
      return;
    }
    const sql = `INSERT INTO ${tableName} SET ?`;
    const realData = {
      ...data,
      create_time: +new Date(),
    };
    const result: any = await mysql(sql, realData);
    resolve(result.insertId > 0);
  });
}

function deleteItem(id: number, tableName: string) {
  return new Promise(async (resolve) => {
    const sql = `DELETE FROM ${tableName} WHERE id=?`;
    const result: any = await mysql(sql, [id]);
    resolve(result.affectedRows === 1);
  });
}

function editItem(data: any, tableName: string) {
  return new Promise(async (resolve) => {
    const sql = `UPDATE ${tableName} SET title=?,url=?,desc=? WHERE id=?`;
    const sqlData = [data.title, data.url, data.desc, data.id];
    const result: any = await mysql(sql, sqlData);
    resolve(result.affectedRows === 1);
  });
}

function foggySearch(
  value: string | number,
  tableName: string,
  field: string = 'title'
) {
  return new Promise(async (resolve) => {
    const sql = `SELECT * FROM ${tableName} WHERE ${field} LIKE ?`;
    const results = await mysql(sql, [value]);
    resolve(results);
  });
}

export default {
  getAllData,
  searchItem,
  addItem,
  deleteItem,
  editItem,
  foggySearch,
  searchOne,
};
