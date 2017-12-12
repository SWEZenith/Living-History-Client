import { StyleSheet } from 'react-native';
import { colors, styles, values } from '@style/main';
import Dimensions from 'Dimensions';

const consts = {
	componentMargin:10
}

const win = Dimensions.get('window');

const main = StyleSheet.create({
	mapContainer:{
		marginBottom: consts.componentMargin,
		height: win.height,
		width: win.width,
	},
	map:{
		left:0,
		right:0,
		top:0,
		bottom:0,
		position:'absolute',
	},
});

export default main;