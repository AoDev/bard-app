import withVM from 'bard-instruments/lib/mobx/withVM'
import UserProfile from './UserProfile'
import UserProfileVM from './UserProfileVM'
export default withVM(UserProfile, UserProfileVM)
