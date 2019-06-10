# 开发说明

**第一次贡献代码？**

请查看 [开源贡献指南](https://github.com/freeCodeCamp/how-to-contribute-to-open-source/blob/master/README-CN.md)。

## 不要直接修改 README.md 文件

请修改 [../server/views/README.md](README.md)，**README** 使用 mustache 渲染生成。

添加爬取站点或者修改了 [readmeTemplate.md](readmeTemplate.md)，`git add` 前运行 `npm run readme`，刷新 **README.md** 。

## 解决 puppeteer 安装失败

Chromium 在墙外，使用 Yarn 、Npm 会安装失败

服务端使用 cnpm 安装

```bash
cd server
cnpm i
```

## 使用 puppeteer

页面动态渲染生成，使用 puppeteer 爬取图片。

参见 [../server/routes/u17/index.ts](../server/routes/u17/index.ts) ，或者搜索整个项目 **puppeteer** 。

## 数据库表结构

见 [comic.sql](comic.sql)

字段说明参见 [../server/type/index.ts](../server/types/index.ts)

## 开发配置

使用环境变量用作配置，绝大部分配置都可以在 [../.env](../.env) 中进行配置。前端和服务端的配置均在里面。
