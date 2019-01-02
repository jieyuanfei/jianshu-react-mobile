/**
 * Created by wangdi on 4/11/16.
 */
'use strict';

import React, {Component} from 'react';
import {Text, View, StyleSheet, Platform, RefreshControl, ScrollView, ToastAndroid, Image, Dimensions, PixelRatio, Alert, AlertIOS} from 'react-native';
import px2dp from '../util/px2dp';
import theme from '../config/theme';
import computeTime from '../util/computeTime';
import SearchBar from '../component/SearchBar';
import Swiper from 'react-native-swiper';
import ImageButton from '../component/ImageButtonWithText';
import ListView from '../component/SimpleListView';
import data from '../data.json'

const bannerImages = [
    require('../image/banner1.jpg'),
    require('../image/banner2.png')
];

const imgBtnImages = [
    require('../image/trend.png'),
    require('../image/rank.png'),
    require('../image/hot.png')
];

export default class CompassFragment extends Component{
    constructor(props){
        super(props);
        this.state = {
            refreshing: true,
            loadedData: false,
            dataBlob: [],
            btnName: ['沸点','贡献榜','本周最热']
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
                            colors={['red','#ffd500','#0080ff','#99e600']}
                            tintColor={theme.themeColor}
                            title="Loading..."
                            titleColor={theme.themeColor}
                        />
                    }>
                    <Swiper
                        height={px2dp(130)}
                        autoplay={true}
                        bounces={true}>
                        <View style={styles.slide}>
                            <Image style={styles.image} source={bannerImages[0]} resizeMode="stretch"/>
                        </View>
                        <View style={styles.slide}>
                            <Image style={styles.image} source={bannerImages[1]} resizeMode="stretch"/>
                        </View>
                    </Swiper>
                    <View style={styles.imageBtnLine}>
                        {this.state.btnName.map((item, index) => {
                            return(
                                <ImageButton
                                    key={index}
                                    image={imgBtnImages[index]}
                                    imgSize={px2dp(35)}
                                    text={item}
                                    color="#000"
                                    btnStyle={styles.imgBtn}
                                    onPress={this._imageButtonCallback.bind(this, index)}/>
                            )})
                        }
                    </View>
                    { this._renderListView() }
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
        let dataBlob = data.rows
        this.setState({
            dataBlob: dataBlob,
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

    },
    image: {
        height: px2dp(130),
        width: Dimensions.get('window').width
    },
    imageBtnLine:{
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        borderBottomWidth: 1/PixelRatio.get(),
        borderBottomColor: '#c4c4c4'
    },
    imgBtn: {
        height: px2dp(80),
        width: Dimensions.get('window').width/3,
    }
});
