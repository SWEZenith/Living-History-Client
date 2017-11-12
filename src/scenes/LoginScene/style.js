import { StyleSheet } from 'react-native';



const main = StyleSheet.create({
	pageContainer:{
		flex: 1
	},
	backgroundImage:{
		backgroundColor: '#ccc',
      	flex: 1,
  		resizeMode:'stretch',
      	position: 'absolute',
    	width: '100%',
        height: '100%',
    },
    darkLayer:{
    	flex:1, 
    	backgroundColor:'#333333', 
    	opacity:0.7, 
    	position: 'absolute',
        width: '100%',
        height: '100%'
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
	newAccountButton:{
		height:5
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