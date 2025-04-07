import {watch} from 'node:fs'
import path from 'node:path'
import type {RsbuildPlugin} from '@rsbuild/core'
import {logger} from '@rsbuild/core'
import {type IWriteFilesOptions, listFiles, writeFiles} from './listIcons'

interface ListIconsPluginOptions extends Omit<IWriteFilesOptions, 'svgFiles'> {
  srcFolder: string
}

export function listIconsPlugin(options: ListIconsPluginOptions): RsbuildPlugin {
  let cache: string[] = []
  let watcher: ReturnType<typeof watch> | null = null

  return {
    name: 'list-icons-plugin',
    setup(api) {
      api.onBeforeEnvironmentCompile(async ({isWatch}) => {
        const {srcFolder, ...writeOptions} = options
        const svgFiles = await listFiles(srcFolder)

        if (JSON.stringify(cache) === JSON.stringify(svgFiles)) {
          if (writeOptions.verbose) {
            logger.info(
              `[svg-sprite] No changes detected in ${path.relative(process.cwd(), srcFolder)}`
            )
          }
          return
        }

        if (writeOptions.verbose) {
          logger.info(`[svg-sprite] Found ${svgFiles.length} SVGs for sprite`)
        }

        try {
          await writeFiles({svgFiles, ...writeOptions})
          cache = svgFiles

          // Set up file watcher in watch mode
          if (isWatch && !watcher) {
            let debounceTimer: NodeJS.Timeout

            watcher = watch(srcFolder, {recursive: true}, async (_eventType, filename) => {
              if (filename && path.extname(filename).toLowerCase() === '.svg') {
                // Debounce updates to handle multiple rapid changes
                clearTimeout(debounceTimer)
                debounceTimer = setTimeout(async () => {
                  if (writeOptions.verbose) {
                    logger.info(`SVG file changed: ${filename}`)
                  }
                  const updatedFiles = await listFiles(srcFolder)
                  await writeFiles({svgFiles: updatedFiles, ...writeOptions})
                  cache = updatedFiles
                }, 300)
              }
            })

            // Clean up watcher when build ends
            api.onBeforeCreateCompiler(() => {
              watcher?.close()
              watcher = null
            })
          }
        } catch (err) {
          console.error('Error in list-icons-plugin:', err)
          throw err
        }
      })
    },
  }
}
