const fs = require('fs');
const path = require('path');
function makeDir(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (makeDir(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}

module.exports = makeDir;
