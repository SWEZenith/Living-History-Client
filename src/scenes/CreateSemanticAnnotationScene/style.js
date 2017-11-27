import { StyleSheet } from 'react-native';
import { colors, values } from '@style/main';

const constants = {
	fontSize: 15
}


const main = StyleSheet.create({

	content:{
		flex:6,
		borderWidth:1,
		borderColor: colors.mainColor,
		padding:5,
		marginBottom: 10
	},
	pageContainer: {
		flex:1, 
		justifyContent:'center', 
		alignItems:'center'
	},
	contentContainer:{
		flex:2, 
		marginTop:20
	},

	contentPresenter:{
		flex:1
	},
	contentView:{
		paddingTop:6,
		paddingRight:7,
		paddingLeft:1
	},
	editorContainer: {
		flex:2,
		marginTop:20
	},
	textSelector:{
		
	},
	dropdown:{
		marginTop:20,
		height:31,
		borderWidth:1,
		borderColor: colors.mainColor
	},
	dropdownText:{
	    fontSize: constants.fontSize,
	    marginTop:1,
	    marginBottom:1,
	    lineHeight: 28
	},
  	dropdownBody: {
	    height: 150,
	    borderColor: colors.mainColor,
	    borderWidth: 2,
	    borderRadius: 3,
	  },
  	dropdownTextStyle: {
		fontSize: constants.fontSize,
  	},
	footer: {
		flex:1,
		justifyContent:'flex-end',
		marginBottom:40
	},
	button:{
    	height: 30,
    	backgroundColor:'#9B51E0',
    	padding:5,
    	borderRadius:50,
  	},
  	buttonText:{
  		textAlign:'center',
  		color:'#FFF'
  	},
  	textContent:{
  		fontSize:14
  	}
});

export default main;