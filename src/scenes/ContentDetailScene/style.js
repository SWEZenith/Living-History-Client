import { StyleSheet } from 'react-native';
import { colors, styles, constants } from '@style/main';
import Dimensions from 'Dimensions';

const values = {
	componentMargin:10
}

const win = Dimensions.get('window');

const main = StyleSheet.create({
	propertyContainer:{
		flex:6
	},
	annotationSection:{
		flex:6
	},
	titleContainer:{
		marginBottom: values.componentMargin
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	tagContainer:{
		marginBottom: values.componentMargin,
		flexDirection:'row',
		flexWrap:'wrap'
	},
	tag:{
		borderWidth:1, 
		borderColor: colors.mainColor,
		padding:5, 
		borderRadius:10, 
		marginRight:5
	},
	mapContainer:{
		marginBottom: values.componentMargin,
		height: win.height * 0.18,
		width: win.width * 0.95,
	},
	map:{
		left:0,
		right:0,
		top:0,
		bottom:0,
		position:'absolute',
		height: win.height * 0.18,
		width: win.width * 0.95,
	},
	dateContainer:{
		flexDirection:'row',
		flexWrap:'wrap'
	},
	annotationContainer:{
	   flex: 1,
   		borderWidth: 1,
   		borderColor: colors.mainColor,
   		overflow:'scroll'
	},
	annotationItem:{
	    padding: 10,
	    height: 44,
	    borderBottomWidth: 1,
	    borderBottomColor: colors.mainColor
	},
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
	footer:{
		flex:2,
		justifyContent:'flex-end'
	},
	footerLeftContainer:{
		flex:1,
		marginRight:10,
		justifyContent:'flex-end'
	},
	footerRightContainer:{
		flex:1,
		marginLeft:10,
		justifyContent:'flex-end'
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
	areaSelector: {
		position: 'absolute',
		borderWidth:3,
		borderColor: '#08ff20',
		alignItems: 'center',
		justifyContent: 'center'
	}
});

export default main;