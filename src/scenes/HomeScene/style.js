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
    width:280,
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
    flex: 0.8
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
  }
});

export default main;