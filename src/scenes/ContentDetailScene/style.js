import { StyleSheet } from 'react-native';
import { colors, styles, constants } from '@style/main';

const values = {
	componentMargin:10
}

const main = StyleSheet.create({
	propertyContainer:{
		flex:1
	},
	annotationSection:{
		flex:2
	},
	titleContainer:{
		marginBottom: values.componentMargin
	},
	title: {
		fontSize: 18
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
	dateContainer:{
		flexDirection:'row',
		flexWrap:'wrap'
	},
	annotationContainer:{
	   flex: 1,
   		borderWidth: 1,
   		borderColor: colors.mainColor
	},
	annotationItem:{
	    padding: 10,
	    height: 44,
	    borderBottomWidth: 1,
	    borderBottomColor: colors.mainColor
	}
});

export default main;