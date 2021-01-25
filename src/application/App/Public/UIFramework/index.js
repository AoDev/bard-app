import withVM from 'bard-instruments/lib/react-mobx/withVM2'
import UIFramework from './UIFramework'
import UIFrameworkVM from './UIFrameworkVM'
export default withVM(UIFramework, UIFrameworkVM)

// import {inject, observer} from 'mobx-react'
// export default inject('rootStore')(UIFramework)
// export default inject('rootStore')(observer(UIFramework))
