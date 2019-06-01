## 1. 解决 puppeteer 安装失败

Chromium 在墙外，使用 Yarn 、Npm 会安装失败

服务端使用 cnpm 安装

```bash
cd server
cnpm i
```

## 2. 数据库表结构

见 [comic.sql](./comic.sql)

字段说明参见 [../server/type/index.ts](../server/type/index.ts)

## 3. Electron 模板

[electron-react-boilerplate](https://github.com/electron-react-boilerplate/examples/tree/master/examples/typescript) 的 React 版本不是 16.8+，不能使用 React Hooks。

所有使用了 Umi + Electron 模板，链接地址是 [https://github.com/wangtianlun/umi-electron-typescript](https://github.com/wangtianlun/umi-electron-typescript)

## 4. 不要直接修改 README.md 文件

请修改 [../server/views/README.md](../server/views/README.md)

## 5. PDF 转换为其他格式

1. GUI 转换工具 [https://calibre-ebook.com/](https://calibre-ebook.com/)
1. 命令行转换工具 [https://pandoc.org/index.html](https://pandoc.org/index.html)
