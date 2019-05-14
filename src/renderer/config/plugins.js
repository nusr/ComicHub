export default [
  [
    'umi-plugin-react',
    {
      antd: true,
      dll: true,
      dva: true,
      dynamicImport: true,
      hardSource: false,
      routes: {
        exclude: [/components/],
      },
      title: 'comic-hub',
    },
  ],
];
