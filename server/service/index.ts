import mysql from '../sql/mysql';

function getAllData(tableName: string) {
    return new Promise(resolve => {
        const sql = `SELECT * FROM ${tableName}`;
        mysql(sql, null, (results: any) => {
            resolve(results);
        });
    });
}

async function searchItem(
    value: string | number,
    tableName: string,
    field: string = 'url'
) {
    return new Promise(resolve => {
        const sql = `SELECT * FROM ${tableName} WHERE ${field}=?`;
        mysql(sql, [value], (results: any = []) => {
            resolve(results);
        });
    });
}

function searchOne(
    value: string | number,
    tableName: string,
    field: string = 'url'
): any {
    return new Promise(resolve => {
        const sql = `SELECT * FROM ${tableName} WHERE ${field}=?`;
        mysql(sql, [value], (results: any = []) => {
            resolve(results[0]);
        });
    });
}

function addItem(data: any, tableName: string) {
    return new Promise(resolve => {
        // 判断是否存在
        searchItem(data.url, tableName).then((results: any = []) => {
            if (results && results > 0) {
                resolve(false);
                return;
            }
            const sql = `INSERT INTO ${tableName} SET ?`;
            const realData = {
                ...data,
                create_time: Number(new Date()),
            };
            mysql(sql, realData, (result: any = '') => {
                resolve(result.insertId > 0);
            });
        });
    });
}

function deleteItem(id: number, tableName: string) {
    return new Promise(resolve => {
        const sql = `DELETE FROM ${tableName} WHERE id=?`;
        mysql(sql, [id], (result: any = {}) => {
            resolve(result.affectedRows === 1);
        });
    });
}

function editItem(data: any, tableName: string) {
    return new Promise(resolve => {
        const sql = `UPDATE ${tableName} SET title=?,url=?,desc=? WHERE id=?`;
        const sqlData = [data.title, data.url, data.desc, data.id];
        mysql(sql, sqlData, (result: any = {}) => {
            resolve(result.affectedRows === 1);
        });
    });
}

function foggySearch(
    value: string | number,
    tableName: string,
    field: string = 'title'
) {
    return new Promise(resolve => {
        const sql = `SELECT * FROM ${tableName} WHERE ${field} LIKE ?`;
        mysql(sql, [value], (results: any = []) => {
            resolve(results);
        });
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
