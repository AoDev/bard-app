import {withVM} from '@lib/mobx/withVM'
import {UIFramework} from './UIFramework'
import {UIFrameworkVM} from './UIFrameworkVM'
export default withVM(UIFramework, UIFrameworkVM)
