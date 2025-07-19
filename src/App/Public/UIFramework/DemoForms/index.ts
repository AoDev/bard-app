import {withVM} from '@lib/mobx/withVM'
import {DemoForms} from './DemoForms'
import {DemoFormsVM} from './DemoFormsVM'
export default withVM(DemoForms, DemoFormsVM)
