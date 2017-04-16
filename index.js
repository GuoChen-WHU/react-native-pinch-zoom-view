import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
  PanResponder
} from 'react-native';

export default class PinchZoomView extends Component {

  static propTypes = {
    ...View.propTypes,
    scalable: PropTypes.bool
  };

  static defaultProps = {
    scalable: true
  };

  constructor(props) {
    super(props);
    this.state = {
      scale: 1,
      lastScale: 1,
      offsetX: 0,
      offsetY: 0,
      lastX: 0,
      lastY: 0
    },
    this.distant = 150;
  }

  componentWillMount() {
    this.gestureHandlers = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder.bind(this),
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder.bind(this),
      onPanResponderGrant: this._handlePanResponderGrant.bind(this),
      onPanResponderMove: this._handlePanResponderMove.bind(this),
      onPanResponderRelease: this._handlePanResponderEnd.bind(this),
      onPanResponderTerminationRequest: (evt) => true,
      onShouldBlockNativeResponder: (evt) => false
    });
  }

  _handleStartShouldSetPanResponder(e, gestureState) {
    // don't respond to single touch to avoid shielding click on child components
    return false;
  }

  _handleMoveShouldSetPanResponder(e, gestureState) {
    return this.props.scalable && gestureState.dx > 2 || gestureState.dy > 2 || gestureState.numberActiveTouches === 2;
  }

  _handlePanResponderGrant (e, gestureState) {
    if (gestureState.numberActiveTouches === 2) {
      var dx = Math.abs(e.nativeEvent.touches[0].pageX - e.nativeEvent.touches[1].pageX);
      var dy = Math.abs(e.nativeEvent.touches[0].pageY - e.nativeEvent.touches[1].pageY);
      var distant = Math.sqrt(dx*dx + dy*dy);
      this.distant = distant;
    }
  }

  _handlePanResponderEnd (e, gestureState) {
    this.setState({
      lastX: this.state.offsetX, 
      lastY: this.state.offsetY, 
      lastScale: this.state.scale
    });
  }

  _handlePanResponderMove(e, gestureState){
    // zoom
    if (gestureState.numberActiveTouches === 2) {
      var dx = Math.abs(e.nativeEvent.touches[0].pageX - e.nativeEvent.touches[1].pageX);
      var dy = Math.abs(e.nativeEvent.touches[0].pageY - e.nativeEvent.touches[1].pageY);
      var distant = Math.sqrt(dx*dx + dy*dy);
      var scale = distant / this.distant * this.state.lastScale;
      this.setState({scale: scale});
    }
    // translate
    else if (gestureState.numberActiveTouches === 1) {
      let offsetX = this.state.lastX + gestureState.dx / this.state.scale;
      let offsetY = this.state.lastY + gestureState.dy / this.state.scale;
      this.setState({ offsetX, offsetY });
    }
  }

  render() {
    return (
        <View
          {...this.gestureHandlers.panHandlers}
          style={[styles.container, this.props.style, {
            transform: [
              {scaleX: this.state.scale},
              {scaleY: this.state.scale},
              {translateX: this.state.offsetX},
              {translateY: this.state.offsetY}
            ]
          }]}>
          {this.props.children}
        </View>
    );
  }
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
