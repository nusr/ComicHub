import fs from 'fs';
import path from 'path';

function makeDir(dirname: string): boolean {
    if (!fs.existsSync(dirname)) {
        if (makeDir(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
    return false;
}

export default makeDir;
