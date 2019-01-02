/**
 * Created by wangdi on 4/11/16.
 */

'use strict';

import React, {Component} from 'react';
import {Text, View, StyleSheet, Platform, TouchableOpacity,Image,Dimensions} from 'react-native';
import theme from '../config/theme';
import px2dp from "../util/px2dp";

export default class NotificationFragment extends Component{

    render(){
        return(
            <View style={styles.container}>
                <Image style={styles.content}
                       source={require('../image/notification.jpg')}/>
            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        width:Dimensions.get('window').width-px2dp(2),
        alignItems: 'flex-start',
        justifyContent: 'center',
    }
});
