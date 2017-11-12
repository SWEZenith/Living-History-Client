import { StyleSheet } from 'react-native';


const colors = {
	
  	mainColor: '#9B51E0',
  	pageBackgroundColor: '#FFF'
};

const values = {
	pagePadding: 10
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
	}
});

export { style, colors, values};