import { StyleSheet } from 'react-native';
import Dimensions from 'Dimensions';
const {width, height} = Dimensions.get('window');

const main = StyleSheet.create({
	pageContainer:{
		flex: 1,
        flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
    scrollSection: {
		justifyContent: 'space-between',
		width: width,
		height: height
	},
	scrollSectionDimension: {
		flex: 1,
		flexDirection: 'column'
	},
	backgroundImage:{
		backgroundColor: '#ccc',
      	flex: 1,
  		resizeMode:'stretch',
		position: 'absolute'
    },
    darkLayer:{
    	flex:1, 
    	backgroundColor:'#333333', 
    	opacity:0.7, 
		position: 'absolute',
		width: width,
		height: height
    },
    logoContainer:{
    	flex:2, 
    	justifyContent:'center', 
    	alignItems:'center'
    },
    formContainer:{
    	flex:2, 
    	alignItems:'center', 
    	justifyContent:'flex-end'
    },
	componentContainer:{
		marginBottom:16
	},
	footerContainer:{
		flex:1,
		alignItems:'center', 
		justifyContent:'flex-start'
	},
	errorText:{
		color:'red', 
		marginTop:10, 
		textAlign:'center'
	},
    newAccountButtonContainer: {
        marginBottom:20
    },
    newAccountButtonText:{
        backgroundColor:'transparent',
        color:'#FFF',
        textDecorationLine:'underline'
    },
    loginButton: {
        backgroundColor:'#eb5756'
    },
    textInput: {
        borderColor:'#FFF', color:'#FFF'
    }
});

export default main;