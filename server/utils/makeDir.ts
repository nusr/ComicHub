import fs from 'fs';
import path from 'path';

function makeDir(dirname: string) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (makeDir(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
    return false;
}

export default makeDir;
