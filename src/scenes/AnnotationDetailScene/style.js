import { StyleSheet } from 'react-native';
import { colors, styles, constants } from '@style/main';


const main = StyleSheet.create({
	semanticPropertyContainer:{
		flexDirection:'row',
		marginBottom:3
	},
	label: {
		fontSize: 15,
		fontWeight:'bold',
		flex:1
	},
	semanticProperty:{
		flex:2
	}
});

export default main;