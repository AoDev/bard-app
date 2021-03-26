import withVM from 'bard-instruments/lib/mobx/withVM'
import SignIn from './SignIn'
import SignInVM from './SignInVM'
export default withVM(SignIn, SignInVM)
