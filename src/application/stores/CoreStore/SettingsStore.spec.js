import SettingsStore from './SettingsStore'

describe('SettingsStore', () => {
  describe('initial state', () => {
    it('should have sane defaults', () => {
      const settingsStore = new SettingsStore()
      expect(settingsStore.someFlag).toBe(true)
    })
  })
})