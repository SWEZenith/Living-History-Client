import { StackNavigator } from 'react-navigation';

import { 
	ProfileScene,
	ContentDetailScene,
	AnnotationDetailScene,	
} from '@scenes';

const ProfileStackNavigator = StackNavigator({
  Profile: { screen: ProfileScene },
  ContentDetail: { screen: ContentDetailScene },
  AnnotationDetail: { screen: AnnotationDetailScene },
});

export default ProfileStackNavigator;
