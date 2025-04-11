import {resolve} from 'node:path'
import {defineConfig} from '@rsbuild/core'
import {pluginLess} from '@rsbuild/plugin-less'
import {pluginReact} from '@rsbuild/plugin-react'
import {pluginSvgIcons} from 'rsbuild-plugin-svg-icons'
import {frontendGuidePlugin} from './tools/frontendGuide'
import {listIconsPlugin} from './tools/iconList'
import {biomeFormat} from './tools/iconList/formatters/biomeFormat'

const SRC_FOLDER = resolve(__dirname, 'src')
const ICON_COMPONENT_FOLDER = resolve(SRC_FOLDER, 'ui-framework', 'components', 'Icon')
const SVG_SPRITE_FOLDER = resolve(SRC_FOLDER, 'assets', 'svg-sprite')

// biome-ignore lint/style/noDefaultExport: rsbuild expects default export
export default defineConfig({
  resolve: {
    alias: {
      '@lib': resolve(SRC_FOLDER, 'lib'),
      '@ui': resolve(SRC_FOLDER, 'ui-framework'),
      '@src': resolve(SRC_FOLDER),
    },
  },
  performance: {
    chunkSplit: {
      strategy: 'split-by-experience',
      forceSplitting: {
        vendor: /[\\/]node_modules[\\/]/,
      },
    },
  },
  plugins: [
    pluginReact(),
    pluginLess(),
    pluginSvgIcons({
      iconDirs: [SVG_SPRITE_FOLDER],
      symbolId: '[name]',
    }),
    listIconsPlugin({
      srcFolder: SVG_SPRITE_FOLDER,
      output: {
        tsDefinitions: resolve(ICON_COMPONENT_FOLDER, 'iconNames.d.ts'),
        list: resolve(SRC_FOLDER, 'App', 'Public', 'UIFramework', 'spriteIconList.ts'),
      },
      verbose: true,
      formatCode: biomeFormat,
    }),
    frontendGuidePlugin(),
  ],
  html: {
    template: resolve(SRC_FOLDER, 'index.html'),
    tags: [
      {
        tag: 'meta',
        attrs: {
          'http-equiv': 'Content-Security-Policy',
          content: [
            // Restricts all resources to same origin by default
            "default-src 'self'",
            // Controls JavaScript execution - allows inline scripts and eval() in development
            `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''}`,
            // Allows CSS from same origin and inline styles
            "style-src 'self' 'unsafe-inline'",
            // Allows images from same origin, data URLs, blob URLs, and githubusercontent (for docs images)
            "img-src 'self' data: blob: https://user-images.githubusercontent.com",
            // Allows fonts from same origin and data URLs
            "font-src 'self' data:",
            // Allows network connections to same origin and blob URLs (for audio playback)
            "connect-src 'self' blob:",
            // Allows media (audio/video) from same origin and blob URLs
            "media-src 'self' blob:",
            // Allows web workers from same origin and blob URLs
            "worker-src 'self' blob:",
            // Controls which URLs can be used in <base> tags
            "base-uri 'self'",
            // Controls which URLs can be used as form submission targets
            "form-action 'self'",
            // Controls which URLs can be loaded in <iframe> elements
            "frame-src 'none'",
            // Controls which URLs can be loaded in <object>, <embed>, or <applet> elements
            "object-src 'none'",
            // Controls which URLs can be loaded as web app manifests
            "manifest-src 'self'",
            // Prevents loading of mixed content (HTTP resources on HTTPS pages)
            'block-all-mixed-content',
            // Forces the browser to upgrade HTTP to HTTPS
            'upgrade-insecure-requests',
          ].join('; '),
        },
      },
    ],
  },
})
