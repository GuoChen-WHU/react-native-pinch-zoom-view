# react-native-pinch-zoom-view

A pinch-to-zoom view for React Native. All the components wrapped in the view is scalable while still be able to respond to touch events.

## Install

`npm install react-native-pinch-zoom-view --save`

## Usage

`require` the `react-native-pinch-zoom-view` module and then use the `<PinchZoomView>` tag to wrap your content instead of `<View>`.

```javascript
'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  TextInput
} from 'react-native';
import PinchZoomView from 'react-native-pinch-zoom-view';

class APP extends Component {
  render() {
    return (
      <PinchZoomView>
        <TextInput style={{width: 100}}></TextInput>
      </PinchZoomView>
    );
  }
}

AppRegistry.registerComponent('APP', () => APP);
```

## Properties

#### `scalable`

Values: `true` or `false`
Default: `true`

In some cases, you may want to disable the pinch-zoom behaviour, just set `scalable={false}` on the component.

### `minScale`

Type: `Number`
Default: `0.5`

Minimum scaling.

### `maxScale`

Type: `Number`
Default: `2`

Maximum scaling.

## Example

Check out a simple example in [Example](https://github.com/GuoChen-WHU/react-native-pinch-zoom-view/tree/master/Example).