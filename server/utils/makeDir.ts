import fs from 'fs';
import path from 'path';
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

export default makeDir;
