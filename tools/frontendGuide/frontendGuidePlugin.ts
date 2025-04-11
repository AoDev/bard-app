import {mkdir, readFile, writeFile} from 'node:fs/promises'
import {join} from 'node:path'
import type {RsbuildPlugin} from '@rsbuild/core'
import chokidar from 'chokidar'
import {glob} from 'fast-glob'

interface GuideSection {
  id: string
  title: string
  content: string
  order: number
}

async function generateGuideSections() {
  // Find all markdown files in the frontend guide directory
  const files = await glob('docs/frontend-guide/*.md')

  // Process each file
  const sections: GuideSection[] = await Promise.all(
    files.map(async (file) => {
      const content = await readFile(file, 'utf-8')
      const id = file.split('/').pop()?.replace('.md', '') || ''
      const order = parseInt(id.split('-')[1]) || 0
      const title = content.split('\n')[0].replace('#', '').trim()

      return {
        id,
        title,
        content,
        order,
      }
    })
  )

  // Sort sections by order
  sections.sort((a, b) => a.order - b.order)

  // Create output directory
  const outputDir = join(process.cwd(), 'src/App/Public/UIFramework/FrontendGuide')
  await mkdir(outputDir, {recursive: true})

  // Generate JSON file
  const jsonContent = JSON.stringify(sections, null, 2)
  await writeFile(join(outputDir, 'sections.json'), jsonContent)
}

/**
 * @example
 * ```ts
 * // in rsbuild.config.ts
 * import {frontendGuidePlugin} from './tools/frontend-guide-plugin'
 * export default defineConfig({
 *   plugins: [frontendGuidePlugin()],
 * })
 * ```
 */
export const frontendGuidePlugin = (): RsbuildPlugin => ({
  name: 'frontend-guide-plugin',
  setup(api) {
    // Generate sections during build and dev
    api.modifyBundlerChain(async () => {
      await generateGuideSections()
    })

    // Watch for changes
    if (process.env.NODE_ENV === 'development') {
      const watcher = chokidar.watch('docs/frontend-guide/*.md', {ignoreInitial: true})

      watcher.on('add', generateGuideSections)
      watcher.on('change', generateGuideSections)
      watcher.on('unlink', generateGuideSections)

      // Clean up watcher when the plugin is disposed
      process.on('SIGINT', () => {
        watcher.close()
        process.exit(0)
      })
    }
  },
})
