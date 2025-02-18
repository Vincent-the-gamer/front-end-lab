import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import { defineConfig } from 'vitepress'
import { config } from './configs'
import { docsConfig } from './docs'
import { ImagePlugin } from './plugins/markdown/image' 
import useBaseUrl from './hooks/useBaseUrl'

const baseUrl = useBaseUrl()

export default defineConfig({
  base: baseUrl,
  ...docsConfig,
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档',
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                },
              },
            },
          },
        },
      },
    },
  },
  head: [
    // favicon.ico
    ['link', { rel: 'icon', href: `${baseUrl}/favicon.ico`}],
    // others
    ['link', { rel: 'icon', href: '/logo/json.svg' }],
  ],
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      link: '/',
      ...config,
    }
  },
  markdown: {
    codeTransformers: [
      transformerTwoslash(),
    ],
    config: (md) => {
      md.use(ImagePlugin) 
    },
  },
  lastUpdated: true,
})
