/**
 * Created by wangdi on 4/11/16.
 */
'use strict';

import React, {Component} from 'react';
import {Text, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import TabNavigator from 'react-native-tab-navigator';
import FindFragment from '../page/find/HomeFragment';
import HomeFragment from '../page/home/Index';
import MeFragment from '../page/MeFragment';
import NotifyFragment from '../page/NotificationFragment';
import px2dp from '../util/px2dp';


export default class TabBar extends Component{
    static defaultProps = {
        selectedColor: '#ff7963',
        normalColor: '#a9a9a9'
    };

    constructor(props){
        super(props);
        this.state = {
            selectedTab: 'home',
            tabName: ['首页','发现','消息','我']
        }
    }

    render(){
        const {selectedColor} = this.props;
        const {tabName} = this.state;
        return(
            <TabNavigator
                hidesTabTouch={true}
                tabBarStyle={[styles.tabbar,{borderTopWidth: 0.5, borderTopColor: '#eee'}]}
                sceneStyle={{ paddingBottom: styles.tabbar.height,borderTopWidth:0 }}>
                <TabNavigator.Item
                    tabStyle={styles.tabStyle}
                    title={tabName[0]}
                    selected={this.state.selectedTab === 'home'}
                    selectedTitleStyle={{color: selectedColor}}
                    renderIcon={() => <Image style={styles.tab} source={this.state.homeNormal} />}
                    renderSelectedIcon={() => <Image style={styles.tab} source={this.state.homeSelected} />}
                    onPress={() => this.setState({ selectedTab: 'home' })}>
                    {<HomeFragment />}
                </TabNavigator.Item>
                <TabNavigator.Item
                    tabStyle={styles.tabStyle}
                    title={tabName[1]}
                    selected={this.state.selectedTab === 'compass'}
                    selectedTitleStyle={{color: selectedColor}}
                    renderIcon={() => <Image style={styles.tab} source={this.state.compassNormal} />}
                    renderSelectedIcon={() => <Image style={styles.tab} source={this.state.compassSelected} />}
                    onPress={() => this.setState({ selectedTab: 'compass' })}>
                   {<FindFragment navigator={this.props.navigator}/>}
                </TabNavigator.Item>
                <TabNavigator.Item
                    tabStyle={styles.addTabStyle}
                    selectedTitleStyle={{color: selectedColor}}
                    renderIcon={() => <Image style={styles.tabAdd} source={this.state.addCircle} />}>

                </TabNavigator.Item>
                <TabNavigator.Item
                    tabStyle={styles.tabStyle}
                    title={tabName[2]}
                    selected={this.state.selectedTab === 'notification'}
                    selectedTitleStyle={{color: selectedColor}}
                    renderIcon={() => <Image style={styles.tab} source={this.state.notificationNormal} />}
                    renderSelectedIcon={() => <Image style={styles.tab} source={this.state.notificationSelected} />}
                    onPress={() => this.setState({ selectedTab: 'notification' })}>
                    {<NotifyFragment navigator={this.props.navigator}/>}
                </TabNavigator.Item>
                <TabNavigator.Item
                    tabStyle={styles.tabStyle}
                    title={tabName[3]}
                    selected={this.state.selectedTab === 'me'}
                    selectedTitleStyle={{color: selectedColor}}
                    renderIcon={() => <Image style={styles.tab} source={this.state.meNormal} />}
                    renderSelectedIcon={() => <Image style={styles.tab} source={this.state.meSelected} />}
                    onPress={() => this.setState({ selectedTab: 'me' })}>
                    {<MeFragment navigator={this.props.navigator}/>}
                </TabNavigator.Item>
            </TabNavigator>
        );
    }

    componentWillMount() {
        const {selectedColor, normalColor} = this.props;
        Icon.getImageSource('md-notifications', 50, normalColor).then((source) => this.setState({ notificationNormal: source }));
        Icon.getImageSource('md-notifications', 50, selectedColor).then((source) => this.setState({ notificationSelected: source }));
        Icon.getImageSource('md-home', 50, normalColor).then((source) => this.setState({ homeNormal: source }));
        Icon.getImageSource('md-home', 50, selectedColor).then((source) => this.setState({ homeSelected: source }));
        Icon.getImageSource('md-person', 50, normalColor).then((source) => this.setState({ meNormal: source }));
        Icon.getImageSource('md-person', 50, selectedColor).then((source) => this.setState({ meSelected: source }));
        Icon.getImageSource('md-compass', 50, normalColor).then((source) => this.setState({ compassNormal: source }));
        Icon.getImageSource('md-compass', 50, selectedColor).then((source) => this.setState({ compassSelected: source }));
        Icon.getImageSource('ios-add-circle', 50, selectedColor).then((source) => this.setState({ addCircle: source }));
    }
}

const styles = StyleSheet.create({
    tabbar: {
        height: px2dp(40),
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: '#fff',

    },
    tabStyle:{
        paddingTop: px2dp(15)
    },
    addTabStyle:{
        paddingBottom: px2dp(0)
    },
    tab: {
        width: px2dp(18),
        height: px2dp(18)
    },
    tabAdd: {
        width: px2dp(30),
        height: px2dp(30)
    }
});
