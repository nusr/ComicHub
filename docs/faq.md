## 1. 解决 puppeteer 安装失败

Chromium 在墙外，需要翻墙。设置代理

```bash
npm config set proxy http://127.0.0.1:1087
```

安装 puppeteer

```bash
npm i --save puppeteer
```

或者使用 cnpm ，无需代理

```bash
cnpm i --save puppeteer
```

## 2. 数据库表结构

见 [comic.sql](./comic.sql)
