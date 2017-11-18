import { StyleSheet } from 'react-native';
import { colors, values } from '@style/main';



const main = StyleSheet.create({
	pageContainer: {
		flex:1, 
		justifyContent:'center', 
		alignItems:'center'
	},
	contentContainer:{
		flex:2,
		width:300
	},
	contentPresenter: {
		flex:1,
		borderWidth:1,
		borderColor:colors.mainColor
	},
	imageContent:{
		flex:1,
		resizeMode: 'stretch'
	},
	areaSelector: {
		position: 'absolute',
		borderWidth:3,
		borderColor: '#08ff20',
		alignItems: 'center',
		justifyContent: 'center'
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