# 开发说明

**第一次贡献代码？**

请查看 [开源贡献指南](https://github.com/freeCodeCamp/how-to-contribute-to-open-source/blob/master/README-CN.md)。

## 不要直接修改 README.md 文件

修改 [readmeTemplate.md](readmeTemplate.md)

添加爬取站点或者修改了 [readmeTemplate.md](readmeTemplate.md)，`git add` 前运行 `npm run readme`，刷新 **README.md** 。

## 使用 puppeteer

页面动态渲染生成，使用 puppeteer 爬取图片。

参见 [../server/routes/u17/index.ts](../server/routes/u17/index.ts) ，或者搜索整个项目 **puppeteer** 。

## 数据库使用


1. 从[https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/)下载应用，安装 MySQL
2. 启动本地 MySQL，使用默认端口即可
3. 建立数据库 **comic**
4. 导入数据库表到数据库 **comic**
 
> 如何导入数据库，查看[https://www.runoob.com/mysql/mysql-database-import.html](https://www.runoob.com/mysql/mysql-database-import.html)

数据库表结构见 [comic.sql](comic.sql)

字段说明参见 [../server/type/index.ts](../server/types/index.ts)

## 开发配置

使用环境变量用作配置，绝大部分配置都可以在 [../.env](../.env) 中进行配置。前端和服务端的配置均在里面。

服务端配置文件: [../server/shared/config.ts](../server/shared/statusCode.ts)

前端 Webpack 配置文件夹: [../config](../config)
