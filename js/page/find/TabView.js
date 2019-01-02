/**
 * Created by wangdi on 6/11/16.
 */
'use strict';

import React, {Component} from 'react';
import {View,ScrollView} from 'react-native';
import VIP from './VIP';
import Special from './Special';
import px2dp from '../../util/px2dp'
import Recommend from './Recommend'
import HotPanel from "../../component/HotPanel";
import data from "./data.json";

export default class TabView extends Component {
    render() {
        let {tabTag} = this.props;
        if(tabTag === '推荐'){
            // return (
            //     <View style={{flex:1}}>
            //         <Recommend/>
            //     </View>
            // );
            return (
                <Recommend/>
            );
        }else if(tabTag === 'VIP'){
            return (
                <View style={{flex:1}}>
                    <VIP/>
                </View>
            );
        }else{
            return (
                <View style={{flex:1,marginBottom:px2dp(40)}}>
                    <Special/>
                </View>
            );
            // return (
            //     <ScrollView
            //         ref="scrollerView"
            //         style={{ flex: 1,marginBottom: px2dp(40),}}
            //         horizontal={false}
            //         showsHorizontalScrollIndicator={false}>
            //         <View style={{flex:1}}>
            //             <HotPanel title={'热门推荐'} contents={data.rows}/>
            //             <HotPanel title={'android'} contents={data.rows}/>
            //             <HotPanel title={'IOS'} contents={data.rows}/>
            //             <HotPanel title={'其他的'} contents={data.rows}/>
            //         </View>
            //
            //     </ScrollView>
            //
            // );
        }

    }



}
