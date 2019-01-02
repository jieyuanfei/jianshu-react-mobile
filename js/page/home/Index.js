/**
 * Created by wangdi on 4/11/16.
 */
'use strict';

import React, {Component} from 'react';
import {Text, View, StyleSheet, Platform, RefreshControl, ScrollView, ToastAndroid, Image, Dimensions, PixelRatio, Alert, AlertIOS} from 'react-native';
import px2dp from '../../util/px2dp';
import theme from '../../config/theme';
import SearchBar from '../../component/SearchBar';
import Swiper from 'react-native-swiper';
import ImageButton from '../../component/ImageButtonWithText';
import ListView from '../../component/SimpleListView';
import MenuBar from '../find/MenuBar'
const bannerImages = [
    require('../../image/carousel1.jpg'),
    require('../../image/carousel2.jpg'),
    require('../../image/carousel3.jpg')
];

const imgBtnImages = [
    require('../../image/home/hot.png'),
    require('../../image/home/huodong.png'),
    require('../../image/home/gongxian.png'),
    require('../../image/home/tuijianma.png'),
    require('../../image/home/pinglun.png'),
    require('../../image/home/like.png'),
    require('../../image/home/shengqing.png'),
    require('../../image/home/settings.png'),
];

export default class Index extends Component{
    constructor(props){
        super(props);
        this.state = {
            refreshing: true,
            loadedData: false,
            dataBlob: [],
            btnName: ['热门推荐','活动有礼','贡献排行','本周推荐','评论回复','喜欢收藏','投稿申请','更多']
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <SearchBar onPress={this._searchButtonCallback.bind(this)}/>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            colors={['red','#ffd500','#0080ff','#ff7963']}
                            tintColor={theme.themeColor}
                            title="Loading..."
                            titleColor={theme.themeColor}
                        />
                    }>
                    <Swiper
                        height={px2dp(150)}
                        autoplay={true}
                        bounces={true}>
                        <View style={styles.slide}>
                            <Image style={styles.image} source={bannerImages[0]} resizeMode="stretch"/>
                        </View>
                        <View style={styles.slide}>
                            <Image style={styles.image} source={bannerImages[1]} resizeMode="stretch"/>
                        </View>
                        <View style={styles.slide}>
                            <Image style={styles.image} source={bannerImages[2]} resizeMode="stretch"/>
                        </View>
                    </Swiper>
                    <View style={styles.imageBtnLine}>
                        {this.state.btnName.map((item, index) => {
                            return(
                                <ImageButton
                                    key={index}
                                    image={imgBtnImages[index]}
                                    imgSize={px2dp(30)}
                                    text={item}
                                    color="#666"
                                    btnStyle={styles.imgBtn}
                                    onPress={this._imageButtonCallback.bind(this, index)}/>
                            )})
                        }
                    </View>
                    <View style={styles.title}>
                        <ImageButton
                            icon="md-book"
                            imgSize={px2dp(20)}
                            btnStyle={{height:px2dp(50)}}
                        />
                        <Text style={{flex:1,paddingLeft: px2dp(7)}}>猜你喜欢</Text>
                        <Text style={{paddingRight: px2dp(4),color:'#bbb'}}>更多</Text>
                        <ImageButton
                            icon="ios-arrow-forward"
                            color="#bbb"
                            imgSize={px2dp(20)}
                            btnStyle={{height:px2dp(50)}}
                        />
                    </View>
                    <MenuBar/>
                </ScrollView>
            </View>
        );
    }

    _onRefresh() {
        this.setState({refreshing: true});
        this._fetchData();
    }

    _searchButtonCallback(){

    }

    _imageButtonCallback(position){
        this._alert();
    }

    _renderListView(){
        if(!this.state.refreshing || this.state.loadedData) {
            return (
                <ListView isRenderHeader={true} contents={this.state.dataBlob}/>
            );
        }
    }

    _fetchData(){
        this.setState({
            loadedData: true,
            refreshing: false
        });
    }

    componentDidMount(){
        this._fetchData();
    }

    _alert(){
        if(Platform.OS === 'android') {
            Alert.alert(
                'Message',
                "This function currently isn't available",
                [{text: 'OK', onPress: () => {}}]
            );
        }else if(Platform.OS === 'ios'){
            AlertIOS.alert(
                'Message',
                "This function currently isn't available",
                [{text: 'OK', onPress: () => {}}]
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.pageBackgroundColor
    },
    slide: {
        height: px2dp(150),
        width: Dimensions.get('window').width
    },
    image: {
        height: px2dp(150),
        width: Dimensions.get('window').width
    },
    imageBtnLine:{
        borderTopWidth:px2dp(1),
        borderTopColor:'#eee',
        flexDirection: 'row',
        flexWrap:'wrap',
        backgroundColor: '#fff',
        alignItems: 'center',
        borderBottomWidth: 1/PixelRatio.get(),
        borderBottomColor: '#c4c4c4'
    },
    imgBtn: {
        height: px2dp(80),
        width: Dimensions.get('window').width/4,
    },
    title:{
        height:px2dp(50),
        flex: 1,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        borderTopWidth:px2dp(10),
        borderTopColor:'#eee',
        paddingLeft:px2dp(10),
        paddingRight:px2dp(10),
    }
});
