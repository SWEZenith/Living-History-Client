import { StackNavigator } from 'react-navigation';

import { ProfileScene } from '@scenes';

const ProfileStackNavigator = StackNavigator({
  Profile: {
    screen: ProfileScene
  }
});

export default ProfileStackNavigator;