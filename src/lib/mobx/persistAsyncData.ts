import {type IReactionDisposer, reaction} from 'mobx'
import type {AsyncData} from './AsyncData'

type PersistedData<T> = {
  value: T
  updatedAt: number
}

/**
 * Makes an AsyncData instance persistent by connecting it to a storage service.
 * It handles loading the cached data on initialization and auto-saving it when the data changes.
 *
 * @param storage The storage service to use. It must have `get` and `save` methods.
 * @param storageKey The key to use for storing the data in the local storage.
 * @param asyncData The MobX AsyncData instance to make persistable.
 * @param options Optional configuration for migration.
 * @returns An object with `init` and `destroy` methods to control the persistence lifecycle.
 */
export function persistAsyncData<T>(
  storage: {
    get: <V>(key: string, defaultValue: V) => Promise<V>
    save: <V>(key: string, value: V) => Promise<V>
  },
  storageKey: string | (() => string),
  asyncData: AsyncData<T>,
  options?: {
    migrate?: (storedData: unknown) => PersistedData<T>
  }
) {
  let stopAutoSave: IReactionDisposer | undefined

  const init = async () => {
    // Stop any previous persistence reaction
    stopAutoSave?.()

    const defaultValue = {value: asyncData.initialValue, updatedAt: 0}
    const key = typeof storageKey === 'string' ? storageKey : storageKey()
    const stored = await storage.get<PersistedData<T>>(key, defaultValue)
    const isMigrated =
      typeof stored === 'object' && stored !== null && 'value' in stored && 'updatedAt' in stored
    const storedUpdated = !isMigrated && options?.migrate ? options.migrate(stored) : stored

    if (!isMigrated) {
      if (!options?.migrate) {
        throw new Error(`${key} requires migration`)
      }
      await storage.save(key, storedUpdated)
    }
    if (isMigrated && options?.migrate) {
      console.warn(`${key} is already migrated. Remove the migrate function`, storedUpdated)
    }

    if (storedUpdated.updatedAt > 0) {
      asyncData.assign({...storedUpdated, loaded: true})
    }

    // Automatically save the data whenever it changes.
    stopAutoSave = reaction(
      () => asyncData.value,
      (value) => {
        if (value !== asyncData.initialValue) {
          storage.save(key, {value, updatedAt: Date.now()})
        }
      },
      {name: `autosave-${key}`, delay: 300}
    )
  }

  const destroy = () => {
    stopAutoSave?.()
  }

  return {init, destroy}
}
