/**
 * Created by wangdi on 13/11/16.
 */
import React, {PropTypes} from 'react';
import ReactNative, {Text, View, StyleSheet, Platform, PixelRatio, WebView, ToastAndroid, BackAndroid, ActivityIndicator} from 'react-native';
import px2dp from '../util/px2dp';
import theme from '../config/theme';
import NavigationBar from '../component/WebViewNavigationBar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PageComponent from './BackPageComponent';

export default class WebViewPage extends PageComponent{
    constructor(props){
        super(props);
        this.state = {

        };
    }

    render(){
        const data = this.props.rowData;
        return(
            <View style={{flex: 1}}>
                <NavigationBar userInfo={data.user} onPress={this._handleBack.bind(this)}/>
                <WebView
                    source={{uri: data.url}}
                    style={styles.webView}
                    renderLoading={this._renderLoading.bind(this)}
                    startInLoadingState={true}
                    onLoad={this._showTips.bind(this, 'load')}
                    onError={this._showTips.bind(this, 'error')}
                />
                <View style={styles.bottom}>
                    <Icon name="favorite-border" color='#ea6f5a' size={px2dp(22)}/>
                    <Icon name="chat-bubble-outline" size={px2dp(22)} color={theme.grayColor} style={{marginLeft: px2dp(17)}}/>
                    <Icon name="share" size={px2dp(22)} color={theme.grayColor} style={{marginLeft: px2dp(17)}}/>
                    <View style={styles.info}>
                        <Text style={{fontSize: 13}}>阅读 {data.ready_num} • 收藏 {data.like_num} • 评论 {data.comment_num}</Text>
                    </View>
                </View>
            </View>
        );
    }

    _showTips(msg){
        //ToastAndroid.show(msg, ToastAndroid.SHORT);
    }

    _renderLoading(){
        return(
            <View style={{justifyContent: 'center', paddingTop: px2dp(20)}}>
                <ActivityIndicator color={theme.themeColor} size="large"/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    webView: {
        flex: 1,
        backgroundColor: theme.pageBackgroundColor
    },
    bottom: {
        width: theme.screenWidth,
        height: px2dp(49),
        backgroundColor: '#fff',
        borderTopWidth: 1/PixelRatio.get(),
        borderTopColor: '#c4c4c4',
        flexDirection: 'row',
        paddingLeft: px2dp(20),
        paddingRight: px2dp(20),
        alignItems: 'center'
    },
    info:{
        flex: 1,
        flexDirection: 'row-reverse',
        alignItems:'center',
    }
});
