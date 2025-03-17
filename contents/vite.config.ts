import { defineConfig } from "vite"
import UnoCSS from "unocss/vite"
import { presetAttributify, presetWind3 } from 'unocss'
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig({
    plugins: [
        UnoCSS({
            presets: [
                presetWind3(),
                presetAttributify()
            ]
        }),
        wasm(),
        topLevelAwait()
    ],
    server: {
        host: '0.0.0.0',
        port: 8080,
    },
})