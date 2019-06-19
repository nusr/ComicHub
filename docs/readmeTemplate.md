<h1 style="text-align:center">ComicHub</h1>

> 漫画下载器

[![build status](https://img.shields.io/travis/nusr/ComicHub/master.svg?style=flat-square)](https://travis-ci.org/nusr/ComicHub)
[![Test coverage](https://img.shields.io/codecov/c/github/nusr/ComicHub.svg?style=flat-square)](https://codecov.io/github/nusr/ComicHub?branch=master)
[![codebeat badge](https://codebeat.co/badges/d9f586aa-2e0a-4999-ad9a-4f51cb6f4fae)](https://codebeat.co/projects/github-com-nusr-comichub-master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/9600f74529c7446292b20527855f6aea)](https://www.codacy.com/app/nusr/ComicHub?utm_source=github.com&utm_medium=referral&utm_content=nusr/ComicHub&utm_campaign=Badge_Grade)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fnusr%2FComicHub.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fnusr%2FComicHub?ref=badge_shield)
![GitHub last commit (branch)](https://img.shields.io/github/last-commit/nusr/ComicHub/master.svg)
![GitHub commit activity the past week, 4 weeks, year](https://img.shields.io/github/commit-activity/y/nusr/ComicHub.svg)
![GitHub top language](https://img.shields.io/github/languages/top/nusr/ComicHub.svg)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/nusr/ComicHub.svg)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/nusr/ComicHub/pull/new)
[![MIT License](https://img.shields.io/github/license/nusr/ComicHub.svg)](http://opensource.org/licenses/MIT)

## 介绍

ComicHub 是一款漫画下载器。爬取漫画网站的图片，生成 PDF 文件。

Koa + MySQL + Umi + Electron + React + Typescript 打造 。

## 装包

配置淘宝镜像，加快下载速度

** 不推荐使用 cnpm 安装依赖 **

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
2. [x] MySQL 存储爬取链接
3. [x] 前端交互页面
4. [x] 生成 PDF 文件
5. [ ] 下载整部漫画
6. [ ] 打包成桌面应用

## 支持的漫画网站

更多站点，敬请期待！

{{#siteList}}

1. [{{ name }}]({{ &base }})
   {{/siteList}}

## 新增漫画网站

1. 查看 [/docs/joinUs.md](https://github.com/nusr/ComicHub/blob/master/docs/joinUs.md) 开发说明。
1. 在 [/server/router/index.ts](https://github.com/nusr/ComicHub/blob/master/server/router/index.ts) 里添加路由。
1. 在 [/server/routes/](https://github.com/nusr/ComicHub/tree/master/server/routes) 中新增脚本。

## 参与我们

欢迎提交 [issue](https://github.com/nusr/ComicHub/issues) 以及 Pull Requests 。

为了避免版权纠纷，只抓取免费漫画。

## 支持更多电子书格式

目前只支持 PDF 。更多格式请使用下列工具转换。

1. GUI 转换工具 [https://calibre-ebook.com/](https://calibre-ebook.com/)
1. 命令行转换工具 [https://pandoc.org/index.html](https://pandoc.org/index.html)

## 类似项目

1. [work_crawler](https://github.com/kanasimi/work_crawler)

## LICENSE

[MIT](LICENSE)
