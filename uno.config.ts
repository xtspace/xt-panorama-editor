import {
  defineConfig,
  presetIcons,
  presetUno,
  transformerDirectives,
} from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
    presetRemToPx({
      baseFontSize: 4,
    }),
  ],
  rules: [
    ["flex-center", {display: "flex", "align-items": "center", "justify-content": "center"}]
  ],
  transformers: [
    transformerDirectives(),
  ],
})