import Path from 'path';
import fs from 'fs';
import urlConfig from '../shared/urlConfig';
import { UrlConfigItem } from '../shared/type';

function generateMarkdown(): void {
  const sourceFilePath = Path.join(process.cwd(), '../docs/readmeTemplate.md');
  const template = fs.readFileSync(sourceFilePath, 'utf8');
  const siteList: string[] = Object.values(urlConfig).filter((item: UrlConfigItem): boolean => item.enabled).map((item: UrlConfigItem) => {
    return `1. [${item.name}](${item.base})`;
  });
  const resultFilePath = Path.join(process.cwd(), '../README.md');
  const result: string = template.replace('---comic-site--', siteList.join('\n'));
  fs.writeFileSync(resultFilePath, result);
  console.log(`[Update README.md Success] ${resultFilePath}`);
}

generateMarkdown();
