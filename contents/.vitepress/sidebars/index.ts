export default {
  '/docs/coding': [
    {
      text: '代码实操',
      collapsed: true,
      items: [
        {
          text: '前端性能优化',
          items: [
            {
              text: '图片懒加载',
              link: '/docs/coding/optimization/lazyload',
            },
            {
              text: 'Sprite精灵图',
              link: '/docs/coding/optimization/sprite',
            },
          ],
        },
        {
          text: '用Rust刷LeetCode',
          link: '/docs/coding/leetcode/',
          items: [
            {
              text: '4.寻找两个正序数组的中位数',
              link: '/docs/coding/leetcode/findMedianSortedArrays',
            },
            {
              text: '13.罗马数字转整数',
              link: '/docs/coding/leetcode/romanToInt',
            },
          ],
        },
      ],
    },
  ],

  '/docs/bagu/': [
    {
      text: '精选八股文',
      collapsed: false,
      items: [
        {
          text: '通用概念',
          collapsed: false,
          items: [
            {
              text: '敏捷开发',
              link: '/docs/bagu/common-theories/agile-dev',
            },
          ],
        },
        {
          text: '前端八股文',
          collapsed: true,
          items: [
            {
              text: 'CSS',
              items: [
                {
                  text: '前端响应式布局',
                  link: '/docs/bagu/frontend-bagu/css/reactive-layout',
                },
                {
                  text: 'CSS选择器',
                  link: '/docs/bagu/frontend-bagu/css/selector',
                },
                {
                  text: '属性继承',
                  link: '/docs/bagu/frontend-bagu/css/inherit',
                },
                {
                  text: 'display属性',
                  link: '/docs/bagu/frontend-bagu/css/display',
                },
              ],
            },
            {
              text: '浏览器',
              items: [
                {
                  text: '渐进增强和优雅降级',
                  link: '/docs/bagu/frontend-bagu/browser/prog-enhance',
                },
              ],
            },
            {
              text: 'HTML',
              items: [
                {
                  text: 'HTML5 Drag API',
                  link: '/docs/bagu/frontend-bagu/html/drag-api',
                },
              ],
            },
          ],
        },
        {
          text: 'Java八股文',
          collapsed: true,
          items: [
            {
              text: 'Java SE',
              link: '/docs/bagu/java-bagu/java-se',
            },
          ],
        },
      ],
    },
    {
      text: '其它计算机八股文网址收藏',
      collapsed: true,
      link: '/docs/bagu/bagu-collection',
    },
  ],
}
