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
          collapsed: true,
          items: [
            {
              text: '敏捷开发',
              link: '/docs/bagu/common-theories/agile-dev'
            }
          ]
        },
        {
          text: 'Java八股文',
          link: '/docs/bagu/java-bagu/java-se',
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
