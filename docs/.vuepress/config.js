const fs = require('fs');
const path = require('path');
const dayjs = require('dayjs');
// 中文化
require('dayjs/locale/zh-cn');
dayjs.locale('zh-cn');
// formnow
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

// 获取处理力扣题列表
const leetcodeList = {};
['easy', 'medium'].forEach(key => {
  leetcodeList[key] = [];
  fs.readdir(path.join(__dirname, `../pages/leetcode/${key}`), (err, p) => {
    p.forEach(item => {
      const fileItem = item.split('.');
      if (fileItem.length > 2 && fileItem[0] !== '0') {
        leetcodeList[key].push({
          title: `${fileItem[0] * 1}.${fileItem[1]}`,
          path: `/pages/leetcode/${key}/${fileItem[0]}.${fileItem[1]}`,
        });
      };
    });
  })
});

module.exports = {
  // header左上角文字
  title: '不加冰',
  base: '/my-articles/',
  markdown: {
    // 代码行号
    lineNumbers: true,
  },
  themeConfig: {
    // header左上角logo
    logo: '/2022-03-24_115321.png',
    nav: [
      {
        text: '力扣算法',
        link: '/pages/leetcode/easy/001.两数之和',
      },
      {
        text: '学习笔记',
        link: '/pages/studyNote/尚硅谷React',
      },
      {
        text: '数据结构',
        link: '/pages/data/队列结构.md',
      },
      {
        text: '前端工程化',
        link: '/pages/engineering/引入ESLint、Prettier、pre-commit',
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
        text: '随心记',
        link: '/pages/notes/01-2022年6月记',
      },
    ],
    // 显示左侧所有标题
    // displayAllHeaders: true,
    sidebar: {
      '/pages/leetcode/': [
        {
          title: '简单',
          path: '/pages/leetcode/easy/001.两数之和',
          children: leetcodeList.easy,
        },
        {
          title: '中等',
          path: '/pages/leetcode/medium/002.两数相加',
          children: leetcodeList.medium,
        },
      ],
      '/pages/studyNote/': [
        ['/pages/studyNote/可视化与游戏', '可视化与游戏'],
        ['/pages/studyNote/尚硅谷React', '尚硅谷React'],
        ['/pages/studyNote/慕课网大前端', '慕课网大前端'],
        ['/pages/studyNote/开课吧web高级', '开课吧web高级'],
      ],
      '/pages/data/': [
        ['/pages/data/队列结构', '队列结构'],
        ['/pages/data/栈结构', '栈结构'],
        ['/pages/data/双向链表', '链表'],
        ['/pages/data/深度、广度优先遍历', '深度、广度优先遍历'],
      ],
      '/pages/engineering/': [
        ['/pages/engineering/引入ESLint、Prettier、pre-commit.md', '代码风格'],
        ['/pages/engineering/Git', 'Git'],
        ['/pages/engineering/webpack基础配置', 'Webpack基础配置'],
      ],
      '/pages/vue/': [
        ['/pages/vue/插槽、组件.md', '插槽&组件'],
        ['/pages/vue/过渡、动画.md', '过渡&动画'],
        ['/pages/vue/引入高德.md', '引入高德'],
      ],
      '/pages/uniapp/': [
        ['/pages/uniapp/uCharts地图标点', 'uCharts地图标点'],
        ['/pages/uniapp/编译安卓之webview', '编译安卓之webview'],
        ['/pages/uniapp/解决uni-datetime-picker选择时间长度', 'uni-datetime-picker选择时间长度'],
      ],
      '/pages/notes/': [
        ['/pages/notes/01-2022年6月记', '2022年6月记'],
        ['/pages/notes/02-2022年9月记', '2022年9月记'],
        ['/pages/notes/03-2022年12月记', '2022年12月记'],
        ['/pages/notes/04-2023年4月记', '2023年4月记'],
      ],
    },
    lastUpdated: '上次更新',
  },
  description: '',
  plugins: [
    [
      '@vuepress/last-updated',
      {
        transformer: timestamp => {
          return dayjs(timestamp).format('YYYY/MM/DD HH:mm');
        }
      }
    ]
  ],
};