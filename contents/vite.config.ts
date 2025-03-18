import { presetAttributify, presetWind3 } from 'unocss'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import topLevelAwait from 'vite-plugin-top-level-await'
import wasm from 'vite-plugin-wasm'

export default defineConfig({
  plugins: [
    UnoCSS({
      presets: [
        presetWind3(),
        presetAttributify(),
      ],
    }),
    wasm(),
    topLevelAwait(),
  ],
  server: {
    host: '0.0.0.0',
    port: 8080,
  },
})
