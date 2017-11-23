import { StyleSheet } from 'react-native';


const colors = {
	
  	mainColor: '#9B51E0',
  	pageBackgroundColor: '#FFF',
  	spinnerColor: '#FFF'
};

const values = {
	pagePadding: 10,
	fontSize: 15
};

const style = StyleSheet.create({
	zPage: {
		flex: 1,
		justifyContent: 'flex-start',
		backgroundColor: colors.pageBackgroundColor,
		paddingLeft: values.pagePadding,
		paddingRight: values.pagePadding,
		paddingTop: values.pagePadding,
		paddingBottom: values.pagePadding
	},
	logo:{
		width: 150,
		height: 150
	},
	logoText:{
		marginTop:10,
		fontSize:32,
		color:'#4F4F4F',
		fontFamily: 'Cochin',
		textAlign:'center',
		backgroundColor:'transparent'
	},
	spinnerContainer:{
		position:'absolute', 
        top:0, 
        left:0, 
        right:0, 
        bottom:0, 
        zIndex:9
	},
	spinnerDarkLayer:{
		position:'absolute', 
        top:0, 
        left:0, 
        right:0, 
        bottom:0, 
        zIndex:9,
        backgroundColor:'#000',
        opacity:0.3
	},
	spinner:{
		zIndex:10
	}
});

export { style, colors, values};