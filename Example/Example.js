import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  View
} from 'react-native';
import PinchZoomView from 'react-native-pinch-zoom-view';

export default class Example extends Component {
  render() {
    return (
      <PinchZoomView>
        <Text>View</Text>
        <View style={styles.view}></View>
        <View style={styles.divider}></View>

        <Text>Text</Text>
        <Text>Some Text</Text>
        <View style={styles.divider}></View>

        <Text>TextInput</Text>
        <TextInput style={styles.textInput}></TextInput>
        <View style={styles.divider}></View>

        <Text>Image</Text>
        <Image source={{uri: 'https://facebook.github.io/react/logo-og.png'}}
               style={styles.image} />
        <View style={styles.divider}></View>
        
        <Text>Touchable*</Text>
        <TouchableOpacity style={styles.rect}></TouchableOpacity>
      </PinchZoomView>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    width: 100,
    height: 100,
    borderWidth: 1
  },
  textInput: {
    width: 100
  },
  image: {
    width: 100, 
    height: 100
  },
  rect: {
    width: 100,
    height: 100,
    backgroundColor: '#ddd'
  },
  divider: {
    marginBottom: 25
  }
});