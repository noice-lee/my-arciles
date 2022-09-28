const dayjs = require('dayjs');

module.exports = {
  // header左上角文字
  title: '不加冰',
  base: '/',
  markdown: {
    // 代码行号
    lineNumbers: true,
  },
  themeConfig: {
    // header左上角logo
    logo: '/2022-03-24_115321.png',
    nav: [
      {
        text: '随心记',
        link: '/pages/notes/01-2022年中',
      },
      {
        text: 'Vue学习',
        link: '/pages/vue/插槽、组件.md',
      },
      {
        text: 'uniapp',
        link: '/pages/uniapp/uCharts地图标点.md',
      },
      {
        text: '数据结构',
        link: '/pages/data/队列结构.md',
      },
      {
        text: '前端工程化',
        link: '/pages/engineering/引入ESLint、Prettier、pre-commit',
      },
    ],
    // 显示左侧所有标题
    // displayAllHeaders: true,
    sidebar: {
      '/pages/notes/': [
        ['/pages/notes/01-2022年中', '2022年中记录'],
      ],
      '/pages/vue/': [
        ['/pages/vue/插槽、组件.md', '插槽&组件'],
        ['/pages/vue/过渡&动画.md', '过渡&动画'],
        ['/pages/vue/引入高德.md', '引入高德'],
      ],
      '/pages/uniapp/': [
        ['/pages/uniapp/uCharts地图标点', 'uCharts地图标点'],
        ['/pages/uniapp/编译安卓之webview', '编译安卓之webview'],
        ['/pages/uniapp/解决uni-datetime-picker选择时间长度', 'uni-datetime-picker选择时间长度'],
      ],
      '/pages/data/': [
        ['/pages/data/队列结构', '队列结构'],
        ['/pages/data/栈结构', '栈结构'],
        ['/pages/data/双向链表', '链表'],
        ['/pages/data/深度、广度优先遍历', '深度、广度优先遍历'],
      ],
      '/pages/engineering/': [
        ['/pages/engineering/引入ESLint、Prettier、pre-commit.md', '代码风格'],
        ['/pages/engineering/webpack基础配置', 'webpack基础配置'],
      ],
    },
    lastUpdated: 'Last Updated',
  },
  description: '',
  plugins: [
    [
      '@vuepress/last-updated',
      {
        transformer: timestamp => {
          return dayjs(timestamp).format('YYYY/MM/DD HH:mm:ss');
        }
      }
    ]
  ],
};