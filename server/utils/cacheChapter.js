const md5 = require('../utils/md5');
const logger = require('../utils/logger');
const fs = require('fs');
const path = require('path');
let chapterList = {};
const cacheDir = path.resolve(__dirname, '../cache');
const chapterHistory = `${cacheDir}/history.json`;
try {
    chapterList = require(chapterHistory) || {};
} catch (error) {
    chapterList = {};
}

function setData(url, data) {
    if (cacheDir && !fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir);
    }
    const hash = md5(url) + '';
    chapterList[hash] = data;
    fs.writeFile(chapterHistory, JSON.stringify(chapterList), (error) => {
        if (error) {
            logger.error(`error`);
        }
    });
}

function getData(url) {
    const hash = md5(url) + '';
    return chapterList[hash];
}

module.exports = {
    setData,
    getData,
};
