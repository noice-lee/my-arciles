const dayjs = require('dayjs');
// 中文化
require('dayjs/locale/zh-cn');
dayjs.locale('zh-cn');
// formnow
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

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
          children: [
            {
              title: '1.两数之和',
              path: '/pages/leetcode/easy/001.两数之和',
            },
            {
              title: '9.回文数',
              path: '/pages/leetcode/easy/009.回文数',
            },
            {
              title: '13.罗马数字转整数',
              path: '/pages/leetcode/easy/013.罗马数字转整数',
            },
            {
              title: '14.最长公共前缀',
              path: '/pages/leetcode/easy/014.最长公共前缀',
            },
            {
              title: '20.有效的括号',
              path: '/pages/leetcode/easy/020.有效的括号',
            },
            {
              title: '21.合并两个有序链表',
              path: '/pages/leetcode/easy/021.合并两个有序链表',
            },
            {
              title: '26.删除有序数组中的重复项',
              path: '/pages/leetcode/easy/026.删除有序数组中的重复项',
            },
            {
              title: '27.移除元素',
              path: '/pages/leetcode/easy/027.移除元素',
            },
            {
              title: '35.搜索插入位置',
              path: '/pages/leetcode/easy/035.搜索插入位置',
            },
            {
              title: '58.最后一个单词的长度',
              path: '/pages/leetcode/easy/058.最后一个单词的长度',
            },
            {
              title: '66.加一',
              path: '/pages/leetcode/easy/066.加一',
            },
            {
              title: '67.二进制求和',
              path: '/pages/leetcode/easy/067.二进制求和',
            },
            {
              title: '69.x 的平方根',
              path: '/pages/leetcode/easy/069.x 的平方根',
            },
            {
              title: '83.删除排序链表中的重复元素',
              path: '/pages/leetcode/easy/083.删除排序链表中的重复元素',
            },
            {
              title: '88.合并两个有序数组',
              path: '/pages/leetcode/easy/088.合并两个有序数组',
            },
            {
              title: '94.二叉树的中序遍历',
              path: '/pages/leetcode/easy/094.二叉树的中序遍历',
            },
            {
              title: '118.杨辉三角',
              path: '/pages/leetcode/easy/118.杨辉三角',
            },
            {
              title: '119.杨辉三角 II',
              path: '/pages/leetcode/easy/119.杨辉三角 II',
            },
            {
              title: '121.买卖股票的最佳时机',
              path: '/pages/leetcode/easy/121.买卖股票的最佳时机',
            },
            {
              title: '125.验证回文串',
              path: '/pages/leetcode/easy/125.验证回文串',
            },
            {
              title: '136.只出现一次的数字',
              path: '/pages/leetcode/easy/136.只出现一次的数字',
            },
            {
              title: '141.环形链表',
              path: '/pages/leetcode/easy/141.环形链表',
            },
          ]
        },
        {
          title: '中等',
          path: '/pages/leetcode/medium/002.两数相加',
          children: [
            {
              title: '2.两数相加',
              path: '/pages/leetcode/medium/002.两数相加',
            },
          ]
        },
      ],
      '/pages/studyNote/': [
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