import withVM from 'bard-instruments/lib/mobx/withVM'
import AppSettings from './AppSettings'
import AppSettingsVM from './AppSettingsVM'
export default withVM(AppSettings, AppSettingsVM)
