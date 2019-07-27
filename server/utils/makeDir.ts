import fs from 'fs';
import path from 'path';

function makeDir(dirname: string): boolean {
  if (!dirname) {
    return false;
  }
  if (fs.existsSync(dirname)) {
    return true;
  }
  if (makeDir(path.dirname(dirname))) {
    fs.mkdirSync(dirname);
    return true;
  }

  return false;
}

export default makeDir;
