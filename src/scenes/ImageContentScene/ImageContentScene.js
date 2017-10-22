import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from '@style/main';
import { ZImageView, ZButton } from '@components/index';
import { View } from 'react-native';
import { FlatList, StyleSheet, Text } from 'react-native';
import { fetchAnnotations } from '@actions';



export class ImageContentScene extends Component {

    constructor(props) {

        super(props);
    }

    componentDidMount(){
      this.props.fetchAnnotations(22);
    }

    componentWillMount(){
     this.props.fetchAnnotations(22); 
    }

    render(){

      let annotations = this.props.appData.annotations;
      const { navigate } = this.props.navigation;


      //BRK DELETE
      let contentUri = 'https://berlincon2016.symfony.com/bundles/sensiosymfonylive/images/berlincon2016/assets/postcard.jpg';
      //BRK DELETE

    	return(
        <View style={[style.zPage]}>

          <View style={{flex:2}}>
            <ZImageView imageUrl={contentUri}/>
          </View>

          <View style={{flex:1}}>
            <ZButton text="Annotate" onPress={() => navigate('ImageAnnotation')}/>
          </View>
                    


          <View style={{flex:3}}>
            <View style={styles.container}>
                <FlatList
                  data={annotations}
                  keyExtractor={(item, index) => item.body.value}
                  renderItem={ ({item}) => 
                    <View style={styles.item}>
                      <Text>{item.body.value}</Text>
                    </View> 
                  }
                />
            </View>
          </View>

        </View>
		  )
    }

}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   borderWidth: 1,
   borderColor: '#000'
  },
  item: {
    padding: 10,
    height: 44,
    borderBottomWidth: 1,
    borderBottomColor: '#000'
  },
})

function mapStateToProps (state) {
  return {
    appData: state.ImageContentReducer
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchAnnotations: (contentId) => dispatch(fetchAnnotations(contentId))
  }
}

export default connect( mapStateToProps, mapDispatchToProps)(ImageContentScene);