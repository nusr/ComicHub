# comic

> PDF 漫画生成器。

## 介绍

comic 是一款漫画生成器。爬取网站的图片，生成 PDF 文件。

## 装包

前端装包

```bash
npm i
```

服务端装包

```bash
cd server
npm i
```

### 运行

首先通过以下命令启动渲染进程(默认端口：8000)

```bash
yarn start:renderer
```

然后启动主进程

```bash
yarn start:main
```

服务端运行

```bash
npm run start:server
```

## 打包

```bash
npm run pack
```

如果想把代码打包成一个 dmg 文件或者 zip 文件，可以执行以下命令

```bash
npm run dist
```

## 功能

1. [x] 服务端爬取漫画
2. [x] Mysql 存储爬取链接
3. [ ] 生成 PDF 文件
4. [ ] 前端交互页面
5. [ ] 打包成桌面应用

## 支持漫画网站

1. [土豪漫画](https://www.manhuagui.com)

## 常见问题

见 [FAQ](./docs/faq.md)

## 相关项目

1. [work_crawler](https://github.com/kanasimi/work_crawler)
