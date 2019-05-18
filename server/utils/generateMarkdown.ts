import mustache from 'mustache';
import Path from 'path';
import urlConfig from '../shared/urlConfig';
import fs from 'fs';

function generateMarkdown() {
    const sourceFilePath = Path.resolve(__dirname, '../../views/README.md');
    const template = fs.readFileSync(sourceFilePath, 'utf8');
    const result = Object.values(urlConfig);
    const resultMarkdown = mustache.render(template, {
        siteList: result,
    });
    const resultFilePath = Path.resolve(__dirname, '../../../README.md');
    fs.writeFile(resultFilePath, resultMarkdown, error => {
        if (error) {
            console.log(error);
        }
    });
}

generateMarkdown();
