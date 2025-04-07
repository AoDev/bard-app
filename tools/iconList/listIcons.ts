import {promises as fs} from 'node:fs'
import path from 'node:path'
import {logger} from '@rsbuild/core'
import {normalizeError} from '../../src/lib/error'

async function listFiles(srcFolder: string): Promise<string[]> {
  try {
    const files = await fs.readdir(srcFolder)
    const svgFiles = files
      .filter((file) => path.extname(file).toLowerCase() === '.svg')
      .map((file) => path.parse(file).name)
      .sort()

    return svgFiles
  } catch (err) {
    throw new Error(`Error reading folder: ${normalizeError(err)}`)
  }
}

export interface IWriteFilesOptions {
  svgFiles: string[]
  output?: {tsDefinitions?: string; list?: string}
  formatCode?: (code: string, parser?: string) => Promise<string>
  verbose?: boolean
}

async function writeFiles({
  svgFiles,
  output,
  formatCode = (code) => Promise.resolve(code),
  verbose = false,
}: IWriteFilesOptions): Promise<void> {
  if (output?.tsDefinitions) {
    const tsDefinitions = `/** Auto-generated file by rsbuild list-icons-plugin */\n export type IconName = ${svgFiles
      .map((file) => JSON.stringify(file))
      .join('|')}`

    const formattedTsDefinitions = await formatCode(tsDefinitions, 'typescript')
    await fs.writeFile(output.tsDefinitions, formattedTsDefinitions)
    if (verbose) {
      logger.success(
        `[svg-sprite] TS definitions written to ${path.relative(process.cwd(), output.tsDefinitions)}`
      )
    }

    if (output?.list) {
      // Get the relative path from list file to tsDefinitions file
      const relativePath = path.relative(
        path.dirname(output.list),
        path.dirname(output.tsDefinitions)
      )
      const importPath = path.join(relativePath, path.parse(output.tsDefinitions).name)
      const iconList = `/** Auto-generated file by rsbuild list-icons-plugin */\n import type {IconName} from '${importPath}'\n export const spriteIconList: IconName[] = ${JSON.stringify(
        svgFiles
      )};`

      const formattedIconList = await formatCode(iconList, 'typescript')
      await fs.writeFile(output.list, formattedIconList)
      if (verbose) {
        logger.success(`[svg-sprite] List written to ${path.relative(process.cwd(), output.list)}`)
      }
    }
  }
}

export {listFiles, writeFiles}
