import { StyleSheet } from 'react-native';
import { colors, styles, constants } from '@style/main';

const statics = {
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
	contentBody:{
		flex:1
	},
	imageContent:{
		flex:1,
		resizeMode: 'contain',
		marginBottom: 10
	},
	textContent:{
		marginBottom: 10
	},
	editorContainerContainer:{
		flex:4,
		alignItems: 'center'
	},
	editorContainer:{
		flex:1,
		width:300
	},
	footer:{
		flex:1,
		justifyContent:'flex-end'
	},
	button:{
    	height: 30,
    	width:200,
    	backgroundColor:'#9B51E0',
    	padding:5,
    	borderRadius:50,
  	},
  	buttonText:{
  		textAlign:'center',
  		color:'#FFF'
  	},
	areaSelector: {
		position: 'absolute',
		borderWidth:3,
		borderColor: '#08ff20',
		alignItems: 'center',
		justifyContent: 'center',
		width:50,
		height:50
	},
	contentPresenter:{
		flex:1
	},
	contentContainer:{
		flex:1,
		width:300
	},
	imageContentContainer:{
		flex:1, 
		alignItems:'center'
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
	dropdown:{
		marginTop:20,
		width:300,
		height:31,
		borderWidth:1,
		borderColor: colors.mainColor
	},
	dropdownText:{
	    fontSize: statics.fontSize,
	    marginTop:1,
	    marginBottom:1,
	    lineHeight: 28
	},
  	dropdownBody: {
	    width: 300,
	    height: 150,
	    borderColor: colors.mainColor,
	    borderWidth: 2,
	    borderRadius: 3,
	  },
  	dropdownTextStyle: {
		fontSize: statics.fontSize,
  	}	  	

});

export default main;