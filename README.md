<p align="center">
  <a href="https://github.com/nusr/ComicHub" rel="noopener noreferrer">
 <img src="./docs/logo.svg" alt="Project logo"></a>
</p>

<h3 align="center">ComicHub</h3>

<div>

[![build status](https://img.shields.io/travis/nusr/ComicHub/master.svg?style=flat-square)](https://travis-ci.org/nusr/ComicHub)
[![Test coverage](https://img.shields.io/codecov/c/github/nusr/ComicHub.svg?style=flat-square)](https://codecov.io/github/nusr/ComicHub?branch=master)
[![codebeat badge](https://codebeat.co/badges/d9f586aa-2e0a-4999-ad9a-4f51cb6f4fae)](https://codebeat.co/projects/github-com-nusr-comichub-master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/9600f74529c7446292b20527855f6aea)](https://www.codacy.com/app/nusr/ComicHub?utm_source=github.com&utm_medium=referral&utm_content=nusr/ComicHub&utm_campaign=Badge_Grade)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fnusr%2FComicHub.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fnusr%2FComicHub?ref=badge_shield)
[![DeepScan grade](https://deepscan.io/api/teams/4611/projects/6382/branches/52943/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=4611&pid=6382&bid=52943)
![GitHub last commit (branch)](https://img.shields.io/github/last-commit/nusr/ComicHub/master.svg)
![GitHub commit activity the past week, 4 weeks, year](https://img.shields.io/github/commit-activity/y/nusr/ComicHub.svg)
![GitHub top language](https://img.shields.io/github/languages/top/nusr/ComicHub.svg)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/nusr/ComicHub.svg)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/nusr/ComicHub/pull/new)
[![MIT License](https://img.shields.io/github/license/nusr/ComicHub.svg)](http://opensource.org/licenses/MIT)

</div>

---

<p align="center"> Comic Downloader (漫画下载器)
</p>

## 介绍

ComicHub 是一款漫画下载器。爬取漫画网站的图片，生成 PDF 文件。

## 技术栈

-   [Koa](https://github.com/koajs/koa) - Expressive middleware for node.js using ES2017 async functions
-   [MySQL](https://github.com/mysqljs/mysql)
-   [Umi](https://github.com/umijs/umi) - Pluggable enterprise-level react application framework.
-   [React](https://github.com/facebook/react) - A declarative, efficient, and flexible JavaScript library for building user interfaces.
-   [Typescript](https://github.com/microsoft/TypeScript) - TypeScript is a superset of JavaScript

## 🎉 功能

1. [x] 下载一集漫画
2. [x] MySQL 存储爬取链接
3. [x] 前端交互页面
4. [x] 生成 PDF 文件
5. [ ] 下载整部漫画
6. [ ] 打包成桌面应用
7. [ ] 多语言

## 支持的网站

更多站点，敬请期待！

1. [看漫画](https://www.manhuagui.com)

1. [土豪漫画](https://www.tohomh123.com)

1. [有妖气漫画](http://www.u17.com/)

## 装包

配置淘宝镜像，加快下载速度

**不推荐使用 cnpm 安装依赖**

```bash
$ npm i -g nrm # Mac 用户加上 sudo
$ nrm use taobao
```

前端安装依赖

```bash
$ npm install
```

服务端安装依赖

```bash
$ cd server
$ npm install
```

## 运行

启动前端页面

```bash
$ npm run start
```

启动服务端

```bash
$ npm run start:server
```

## 测试

```bash
$ npm run test
```

## 打包

```bash
$ npm run build
```

## 支持更多格式

目前只支持 PDF 。更多格式请使用下列工具转换。

1. GUI 转换工具 [https://calibre-ebook.com/](https://calibre-ebook.com/)
2. 命令行转换工具 [https://pandoc.org/index.html](https://pandoc.org/index.html)

## 新增漫画网站

1. 查看 [/docs/joinUs.md](https://github.com/nusr/ComicHub/blob/master/docs/joinUs.md) 开发说明。
2. 在 [/server/router/index.ts](https://github.com/nusr/ComicHub/blob/master/server/router/index.ts) 里添加路由。
3. 在 [/server/routes/](https://github.com/nusr/ComicHub/tree/master/server/routes) 中新增脚本。

## 参与项目

欢迎提交 [issue](https://github.com/nusr/ComicHub/issues) 以及 Pull Requests 。

为了避免版权纠纷，只抓取免费漫画。

## 类似项目

1. [work_crawler](https://github.com/kanasimi/work_crawler)
