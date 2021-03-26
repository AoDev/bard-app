import withVM from 'bard-instruments/lib/mobx/withVM'
import Dashboard from './Dashboard'
import DashboardVM from './DashboardVM'
export default withVM(Dashboard, DashboardVM)
