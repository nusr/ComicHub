import mustache from 'mustache';
import Path from 'path';
import urlConfig from '../shared/urlConfig';
import fs from 'fs';
import logger from './logger';

function generateMarkdown() {
    const sourceFilePath = Path.resolve(__dirname, '../views/README.md');
    const template = fs.readFileSync(sourceFilePath, 'utf8');
    const result = Object.values(urlConfig);
    const resultMarkdown = mustache.render(template, {
        siteList: result
    });
    const resultFilePath = Path.resolve(__dirname, '../../README.md');
    fs.writeFile(resultFilePath, resultMarkdown, (error: Error) => {
        if (error) {
            console.log(error);
        } else {
            logger.info(`[Update README.md Success] ${resultFilePath}`);
        }
    });
    return resultFilePath;
}

generateMarkdown();
