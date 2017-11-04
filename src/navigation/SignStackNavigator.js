import { StackNavigator } from 'react-navigation';
import { LoginScene, SignUpScene } from '@scenes';

const SignStackNavigator = StackNavigator({
  SignIn: {
    screen: LoginScene,
  },
  SignUp: {
  	screen: SignUpScene
  }
});

export default SignStackNavigator;