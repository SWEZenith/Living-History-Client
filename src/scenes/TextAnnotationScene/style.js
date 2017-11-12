import { StyleSheet } from 'react-native';
import { colors, values } from '@style/main';

const constants = {
	fontSize: 15
}


const main = StyleSheet.create({
	pageContainer: {
		flex:1, 
		justifyContent:'center', 
		alignItems:'center'
	},
	contentContainer:{
		flex:2, 
		marginTop:20
	},
	contentPresenter: {
		height: '100%', 
		width:300, 
		borderColor: colors.mainColor, 
		borderWidth: 1,
		fontSize:constants.fontSize
	},
	contentView:{
		paddingTop:6,
		paddingRight:7,
		paddingLeft:1
	},
	editorContainer: {
		flex:2,
		width:300,
		marginTop:20
	},
	footer: {
		flex:1, 
		justifyContent:'flex-end',
		marginBottom:40
	}
});

export default main;