#!/usr/bin/env tsx

import * as fs from 'node:fs'
import * as path from 'node:path'
import * as readline from 'node:readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

async function askQuestion(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer)
    })
  })
}

async function main() {
  const featureName = await askQuestion('What is the name of your feature? ')

  if (!featureName) {
    console.error('Feature name is required!')
    rl.close()
    return
  }

  const includeStoreStr = await askQuestion('Do you want to include a Store file? (y/N) ')
  const includeStore = includeStoreStr.toLowerCase() === 'y'

  const defaultDir = `src/App/${featureName}`

  const outputDir = await askQuestion(
    `Where should the feature be created? (default: ${defaultDir}) `
  )

  const dirPath = outputDir || defaultDir

  // Ensure the directory exists
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, {recursive: true})
    console.log(`Created directory: ${dirPath}`)
  }

  // Generate Component file
  const componentContent = `import {observer} from 'mobx-react'
import type {${featureName}VM} from './${featureName}VM'

export const ${featureName} = observer(({vm}: {vm: ${featureName}VM}) => {
  return (
    <div>
      Hello from ${featureName}
    </div>
  )
})
`

  // Generate ViewModel file
  const vmContent = `import * as store from '@lib/mobx/store.helpers'
import type {RootStore} from '@src/stores'
import {makeAutoObservable} from 'mobx'

export class ${featureName}VM {
  rootStore: RootStore
  set: store.SetMethod<${featureName}VM>
  assign: store.AssignMethod<${featureName}VM>

  destroyVM() {
    // cleanup
  }

  constructor({rootStore}: {rootStore: RootStore}) {
    this.rootStore = rootStore
    this.set = store.setMethod<${featureName}VM>(this)
    this.assign = store.assignMethod<${featureName}VM>(this)
    makeAutoObservable(this, {rootStore: false}, {autoBind: true, deep: false})
  }
}
`

  // Generate Store file if requested
  const storeContent = `import * as store from '@lib/mobx/store.helpers'
import type {RootStore} from '@src/stores'
import {makeAutoObservable} from 'mobx'

export default class ${featureName}Store {
  rootStore: RootStore
  set: store.SetMethod<${featureName}Store>
  assign: store.AssignMethod<${featureName}Store>
  toggle: store.ToggleMethod<${featureName}Store>

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    this.set = store.setMethod<${featureName}Store>(this)
    this.assign = store.assignMethod<${featureName}Store>(this)
    this.toggle = store.toggleMethod<${featureName}Store>(this)
    makeAutoObservable(this, {rootStore: false}, {deep: false, autoBind: true})
  }
}
`

  // Generate index file
  const indexContent = `import {withVM} from '@lib/mobx/withVM'
import {${featureName}} from './${featureName}'
import {${featureName}VM} from './${featureName}VM'
export default withVM(${featureName}, ${featureName}VM)
`

  // Generate empty less file
  const lessContent = `// ${featureName} styles
`

  // Create all files
  fs.writeFileSync(path.join(dirPath, `${featureName}.tsx`), componentContent)
  fs.writeFileSync(path.join(dirPath, `${featureName}VM.ts`), vmContent)
  fs.writeFileSync(path.join(dirPath, 'index.ts'), indexContent)
  fs.writeFileSync(path.join(dirPath, `${featureName}.less`), lessContent)

  if (includeStore) {
    fs.writeFileSync(path.join(dirPath, `${featureName}Store.ts`), storeContent)
    console.log(`- ${dirPath}/${featureName}Store.ts`)
  }

  console.log(`Created ${featureName} feature with the following files:`)
  console.log(`- ${dirPath}/${featureName}.tsx`)
  console.log(`- ${dirPath}/${featureName}VM.ts`)
  console.log(`- ${dirPath}/index.ts`)
  console.log(`- ${dirPath}/${featureName}.less`)

  rl.close()
}

main().catch((err) => {
  console.error('Error:', err)
  rl.close()
})
