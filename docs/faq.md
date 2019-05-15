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

服务端装包

```bash
cd server
cnpm i
```

## 2. 数据库表结构

见 [comic.sql](./comic.sql)

## 3. Electron 模板

[electron-react-boilerplate](https://github.com/electron-react-boilerplate/examples/tree/master/examples/typescript) 的 React 版本不是 16.8+，不能使用 React Hooks。

所有使用 Umi + Electron 模板，链接地址是 [https://github.com/wangtianlun/umi-electron-typescript](https://github.com/wangtianlun/umi-electron-typescript)
