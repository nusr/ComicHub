# 开发说明

## 不要直接修改 README.md 文件

请修改 [../server/views/README.md](README.md)，**README** 使用 mustache 渲染生成。

## 解决 puppeteer 安装失败

Chromium 在墙外，使用 Yarn 、Npm 会安装失败

服务端使用 cnpm 安装

```bash
cd server
cnpm i
```

## 使用 puppeteer 爬取

参见 [../server/routes/u17/index.ts](../server/routes/u17/index.ts) ，或者搜索整个项目 **puppeteer** 。

## 数据库表结构

见 [comic.sql](./comic.sql)

字段说明参见 [../server/type/index.ts](../server/type/index.ts)

## Electron 模板

[electron-react-boilerplate](https://github.com/electron-react-boilerplate/examples/tree/master/examples/typescript) 的 React 版本不是 16.8+，不能使用 React Hooks。

所以使用了 Umi + Electron 模板，链接地址是 [https://github.com/wangtianlun/umi-electron-typescript](https://github.com/wangtianlun/umi-electron-typescript)

服务端参考了 [https://github.com/DIYgod/RSSHub](https://github.com/DIYgod/RSSHub)。
