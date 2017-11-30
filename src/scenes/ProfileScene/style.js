import { StyleSheet } from 'react-native';



const main = StyleSheet.create({
  scene: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchSection: {
    height: 40,
    flexDirection: 'row',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    padding: 5,
  },
  scrollSection: {
    flex: 0.8
  },
  searchButton: {
    flex: 0.12,
    height: 30,
    backgroundColor:'#9B51E0',
    padding:5,
    borderRadius:50,
  },
  createButton: {
    flex: 1,
    height: 30,
    backgroundColor:'#9B51E0',
    padding:5,
    borderRadius:50,
  },
  searchText: {
    color:'#fff',
    textAlign:'center',
  },
  resultButton: {
    flex: 0.3,
  },
  searchInput: {
    flex: 0.88,
    height: 40,
    backgroundColor: 'white'
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