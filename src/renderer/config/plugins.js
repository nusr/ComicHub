import os from 'os';

export default [
  [
    'umi-plugin-react',
    {
      antd: true,
      dll: true,
      dva: {
        hmr: true,
      },
      dynamicImport: true,
      routes: {
        exclude: [/components/],
      },
      title: 'comic-downloader',
      ...(os.platform() === 'darwin'
        ? {
            dll: {
              exclude: ['@babel/runtime'],
              include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
            },
            hardSource: false,
          }
        : {}),
    },
  ],
];
