import withVM from 'bard-instruments/lib/react-mobx/withVM'
import AppSettings from './AppSettings'

class AppSettingsVM {
  constructor ({rootStore}) {
    this.settings = rootStore.coreStore.settings
  }
}

export default withVM(AppSettings, AppSettingsVM)
