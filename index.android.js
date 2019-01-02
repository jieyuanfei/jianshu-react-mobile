import React, { Component } from 'react';
import {AppRegistry} from 'react-native';
import Navigation from './js/config/entry';

export default class testT extends Component {
    render() {
        return (
            <Navigation/>
        );
    }
}

AppRegistry.registerComponent('testT', () => testT);
