import { StyleSheet } from 'react-native';



const style = StyleSheet.create({
	zPage: {
		flex: 1,
		justifyContent: 'flex-start',
		backgroundColor: '#ecf0f1',
		paddingLeft: 10,
		paddingRight: '3%',
		paddingTop:10,
		paddingBottom:10
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

const colors = {
	
  	mainColor: '#9B51E0'
};

export { style, colors};