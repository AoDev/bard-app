import withVM from 'bard-instruments/lib/react-mobx/withVM2'
import UserProfile from './UserProfile'
import UserProfileVM from './UserProfileVM'
export default withVM(UserProfile, UserProfileVM)
