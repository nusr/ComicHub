# ComicHub

> Comic downloader (漫画下载器)

初版尚未完成，功能不稳定。

## 介绍

ComicHub 是一款漫画下载器。爬取网站的图片，生成 PDF、EPUB 文件。

Koa + MySQL + Umi + Electron + React + Typescript 打造 。

## 装包

前端装包

```bash
$ npm install
```

安装 cnpm , 服务端装包要用

```bash
$ npm install -g cnpm --registry=https://registry.npm.taobao.org
```

服务端装包

```bash
# 使用 yarn 或 npm  安装 puppeteer 会报错
$ cd server
$ cnpm install
```

### 运行

启动前端页面

```bash
$ npm run start
```

启动服务端

```bash
$ npm run start:server
```

## 功能

1. [x] 下载一集漫画
1. [x] MySQL 存储爬取链接
1. [x] 前端交互页面
1. [x] 生成 PDF 文件
1. [x] 生成 EPUB 文件
1. [ ] 下载整部漫画
1. [ ] 打包成桌面应用

## 支持漫画网站

更多站点，敬请期待！

1. [看漫画](https://www.manhuagui.com)

1. [土豪漫画](https://www.tohomh123.com)

## 常见问题

见 [FAQ](./docs/faq.md)

## 相关项目

1. [work_crawler](https://github.com/kanasimi/work_crawler)

## LICENSE

[MIT](LICENSE)
