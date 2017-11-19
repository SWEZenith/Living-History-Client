import { StyleSheet } from 'react-native';
import { colors, values } from '@style/main';
import Dimensions from 'Dimensions';

const win = Dimensions.get('window');

const main = StyleSheet.create({
	  scene: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  formContainer:{
    flex:2, 
    alignItems:'center', 
  },
  componentContainer:{
    marginBottom:16
  },
  textInput: {
    borderRadius: 0,
    width: win.width * 0.95,
    textAlign: 'left',
  },
  textEditor: {
    borderRadius: 0,
    width: win.width * 0.95,
    height: win.height * 0.5,
    textAlign: 'left',
  },
  editorContainer: {
    flex:2,
    width: win.width * 0.95,
    height: win.height * 0.5,
    marginTop:16,
    marginLeft: win.width * 0.025,
  },
  textSection: {
    flex: 0.1,
    backgroundColor: 'white',
    marginTop: 20,
  },
  datePickerSection: {
    flex: 0.1,
    backgroundColor: 'white',
    flexDirection: 'row',
    marginTop: 20,
  },
  datePickerDay: {
    flex: 0.25,
  },
  datePickerMonth: {
    flex: 0.35,
  },
  datePickerYear: {
    flex: 0.4,
  },
  text: {
    color:'#9B51E0',
    textAlign:'center',
    height: 50,
  },
  formSection: {
    flex: 0.5,
    flexDirection: 'column',
    padding: 5,
  },
  scrollSection: {
    flex: 1,
    flexDirection: 'column',
  },
  createButton: {
    flex: 0.1,
    height: 30,
    backgroundColor:'#9B51E0',
    padding:5,
    borderRadius:50,
  },
  locationButton: {
    flex: 0.1,
    height: 30,
    backgroundColor:'white',
    padding:5,
    borderRadius:50,
    borderColor:'#9B51E0',
  },
  searchText: {
    color:'#fff',
    textAlign:'center',
  },
  formInput: {
    flex: 0.05,
    backgroundColor: 'white'
  },
  formInputBox: {
    flex: 0.2,
    backgroundColor: 'white',
    textAlignVertical: 'top'
  },
  buttonSection: {
    flex: 0.1,
    padding: 5,
  }
});

export default main;