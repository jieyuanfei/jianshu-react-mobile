/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan
 * @flow
 */

import React, {Component, PropTypes} from 'react';
import ReactNative, {Dimensions, Text, View, StyleSheet, Platform, PixelRatio, ListView, TouchableOpacity, TouchableNativeFeedback, Image} from 'react-native';
import px2dp from '../../util/px2dp';
import Icon from 'react-native-vector-icons/Ionicons';
import testData from './data.json'


const deviceWidth = Dimensions.get('window').width
class Cell extends Component {


    render(){
        return ( <View style={styles.box}>
            {testData.rows2.map((item,index)=>{
                return this._renderItemContent(item,index)
            })}
        </View>)
    }
    _renderItemContent(item,index){
        return(
            <View style={styles.item} key={index}>
                <Image style={styles.img} source={{uri: item.url}}/>
                <Text style={styles.text}>{item.text}</Text>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start',marginTop:px2dp(15)}}>
                    <Text style={{color:'#d9d9d9',marginRight: 10}}>
                        <Icon name="md-person" color='#d9d9d9' size={px2dp(12)}/>揭远飞
                    </Text>
                    <Text style={{color:'#d9d9d9',marginRight: 10}}>
                        <Icon name="md-text" color='#d9d9d9' size={px2dp(12)}/>12
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    box:{
        flexDirection:'row',
        flexWrap:'wrap',
        marginTop: px2dp(10)
    },
    item:{
        flexDirection:'column',
        // backgroundColor:'#eee',
        width: deviceWidth/3,
        paddingLeft:px2dp(5),
        paddingBottom:px2dp(20)
    },
    img:{
        height:px2dp(145),
        width:deviceWidth/3-px2dp(10),
        borderRadius: 3
    },
    text:{
        fontSize:18,
        fontWeight:'500',
        textAlign:'left',
        color:'#333'
    }
});

export default Cell
