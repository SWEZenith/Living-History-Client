import { StyleSheet } from 'react-native';
import { colors, styles, constants } from '@style/main';



const main = StyleSheet.create({
  scene: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchSection: {
    flexDirection:'row',
    backgroundColor:colors.mainColor,
    padding:12,
    height:64
  },
  searchInput: {
    height:40,
    width:300,
    backgroundColor: 'white',
    borderColor:'#FFF',
    color: colors.mainColor,
    borderRadius:10
  },
  searchButton: {

    marginLeft:12,
    height: 40,
    width:40,
    backgroundColor:'#FFF',
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center'
  },
  searchText: {
    color:'#fff'
  },
  scrollSection: {
    flex: 1
  },
  annotationSection:{
    flex:1
  },
  createButton: {
    flex: 1,
    height: 30,
    backgroundColor:'#9B51E0',
    padding:5,
    borderRadius:50,
  },
  resultButton: {
    flex: 0.3,
  },
  resultText: {
    backgroundColor: '#000',
    color: '#FFF',
    height: 20,
  },
  resultImage: {
    height: 150,
  },
  annotationContainer:{
     flex: 1,
      borderWidth: 1,
      borderColor: colors.mainColor,
      overflow:'scroll',
  },
  annotationItem:{
      padding: 10,
      height: 44,
      borderBottomWidth: 1,
      borderBottomColor: colors.mainColor,
  },
  headerStyle: {
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'
  },
});

export default main;