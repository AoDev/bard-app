import {withVM} from '@lib/mobx/withVM'
import {PrivateHome} from './PrivateHome'
import {PrivateHomeVM} from './PrivateHomeVM'
export default withVM(PrivateHome, PrivateHomeVM)
