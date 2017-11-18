import React from 'react';
import { TouchableHighlight, View, Text, StyleSheet,Alert, FlatList } from 'react-native';
import { connect } from 'react-redux';



const content = "aaaaaaaaa1. annotationwwwwwwww2. annotationbbbbbbbbbb";
const annotations = [
  {start: 9, end:22},
  {start: 30, end:43}
];
const components = [];
const generatedAnnotations = [];
let startIndex = 0;

function createComponents(){

  annotations.forEach((annotation, counter) => {

    let preText = "";
    let annotationText = "";

    if(annotation.start != 0)
      preText = content.substring(startIndex, annotation.start);

    annotationText = content.substring(annotation.start, annotation.end);

    if(preText != "")
      components.push({isAnnotation: false, text: preText});

    if(annotationText != "") {
      components.push({isAnnotation: true, text: annotationText})
      generatedAnnotations.push({isAnnotation: true, text: annotationText})
    }

    startIndex = annotation.end;

    if(counter == annotations.length - 1)
      components.push({isAnnotation: false, text: content.substring(annotation.end, content.length)})
  });

  return components;
}


const TextContentExampleContainer = (props) => {
  
  return (
    <View style={{flex:1, backgroundColor:'#7f8c8d'}}>
      <Text style={{fontWeight:'bold', marginTop:40}}>Content</Text>
      <View style={{flex:1, borderWidth: 1, margin:35, padding:10}}>
      <Text>
        {createComponents().map((item, key) => {
          return (
            item.isAnnotation ? 
            <Text key={key} 
              style={{ backgroundColor: 'yellow' }} 
              onPress={()=> {Alert.alert(item.text)}}>
                {item.text}
            </Text> : 
            <Text key={key}
              selectable="true">
                {item.text}
            </Text>
          );
        })}
      </Text>
      </View>
      <View style={{flex:2}}>
        <Text style={{fontWeight:'bold'}}>Annotations</Text>
        <View style={{flex:1, margin:35, borderWidth:1}}>
          <FlatList
            data={generatedAnnotations}
            renderItem={
              ({item}) => <Text style={{color:'red', borderBottomWidth:1, borderBotton:'gray'}}>{item.text}</Text>
            }
        />
        </View>
      </View>
    </View>



  )
}



function mapStateToProps (state) {
  return {
  }
}

function mapDispatchToProps (dispatch) {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TextContentExampleContainer);