import Path from 'path';
import fs from 'fs';
import urlConfig from '../shared/urlConfig';
import { UrlConfigItem } from '../shared/type';

function generateMarkdown(): void {
  const sourceFilePath = Path.join(process.cwd(), '../docs/readmeTemplate.md');
  const template = fs.readFileSync(sourceFilePath, 'utf8');
  const list: UrlConfigItem[] = Object.values(urlConfig);
  // 排序  完成功能的排在前面
  list.sort((a: UrlConfigItem, b: UrlConfigItem) => Number(b.enabled) - Number(a.enabled));
  const siteList: string[] = list.map((item: UrlConfigItem) => {
    const flag: string = item.enabled ? '' : '~~';
    return `1. [${flag}${item.name} (${item.base})${flag}](${item.base})`;
  });
  const resultFilePath = Path.join(process.cwd(), '../README.md');
  const result: string = template.replace('---comic-site--', siteList.join('\n'));
  fs.writeFileSync(resultFilePath, result);
  console.log(`[Update README.md Success] ${resultFilePath}`);
}

generateMarkdown();
