/**
 * Created by wangdi on 9/11/16.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {Text, View, StyleSheet, Platform, TouchableOpacity, TouchableNativeFeedback, ListView, Image, PixelRatio} from 'react-native';
import px2dp from '../util/px2dp';
import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from '../config/theme';
import MainPage from '../page/MainPage';
import TextButton from '../component/TextButton';

export default class ListViewForHome extends Component{
    static propTypes = {
        refreshing: PropTypes.func
    };

    constructor(props){
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            dataSource: ds.cloneWithRows(this.props.contents)
        };
    }

    _itemClickCallback(rowData){
        MainPage.switchToWebViewPage(rowData);
    }

    _userNameClickCallback(userInfo){
        MainPage.switchToIndividualPage(userInfo);
    }

    _renderItem(rowData, sectionID, rowID, highlightRow){
        return(
            <View style={styles.items}>
                <View style={styles.userBar}>
                    <View style={{flex: 10}}>
                        <Image style={styles.avatar} source={{uri: rowData.user.avatar_large}}/>
                    </View>
                    <View style={{flex: 90, marginLeft: px2dp(10)}}>
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            <TextButton
                                onPress={this._userNameClickCallback.bind(this, rowData.user)}
                                text={rowData.user.username}
                                color='steelblue'
                                fontSize={px2dp(14)}
                            />
                            <Text style={{fontSize: px2dp(12), color: theme.grayColor}}>{rowData.tags[0]}</Text>
                        </View>
                        <View style={{marginTop:px2dp(3)}}>
                            <Text style={{fontSize: px2dp(11), color: theme.grayColor}} numberOfLines={1}>{rowData.user.jobTitle} @ {rowData.user.company} • {rowData.time}</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={styles.content} numberOfLines={3}>{rowData.content}</Text>
                    { Platform.OS === 'ios' ?
                        <TouchableOpacity
                            onPress={this._itemClickCallback.bind(this, rowData)}
                            activeOpacity={theme.btnActiveOpacity}>
                            {this._renderItemContent(rowData)}
                        </TouchableOpacity>
                        :
                        <TouchableNativeFeedback onPress={this._itemClickCallback.bind(this, rowData)}>
                            {this._renderItemContent(rowData)}
                        </TouchableNativeFeedback>
                    }
                </View>
                <View style={styles.bottom}>
                    <Icon name="favorite-border" color='#58c900' size={px2dp(25)}/>
                    <Text style={styles.commentText}>{rowData.collectionCount}</Text>
                    <Icon name="chat-bubble-outline" size={px2dp(25)} color={theme.grayColor}/>
                </View>
            </View>
        );
    }

    render(){
        return(
            <ListView
                style={styles.listView}
                dataSource={this.state.dataSource}
                renderRow={this._renderItem.bind(this)}
            />
        )
    }

    _renderItemContent(rowData){
        return(
            <View style={styles.linkView}>
                <View style={{flex: 20}}>
                    {rowData.screenshot ?
                        <Image source={{uri: rowData.screenshot.url}}
                               style={styles.linkImage}/>
                        :
                        <Image source={require('../image/user_article_no_data.png')}
                               style={styles.linkImage}/>
                    }
                </View>
                <View style={{
                    flex: 80,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    padding: px2dp(5)
                }}>
                    <Text style={styles.linkText} numberOfLines={2}>{rowData.title}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    listView: {
        marginTop: px2dp(10)
    },
    items: {
        backgroundColor: '#fff',
        borderTopWidth: 1/PixelRatio.get(),
        borderBottomWidth: 1/PixelRatio.get(),
        borderBottomColor: '#c4c4c4',
        borderTopColor: '#e4e4e4',
        marginBottom: px2dp(7)
    },
    userBar: {
        padding: px2dp(10),
        flexDirection: 'row',
        height: px2dp(45),
        width: theme.screenWidth
    },
    avatar: {
        width: px2dp(34),
        height: px2dp(34),
        borderRadius: 3
    },
    content: {
        color: '#000',
        padding: px2dp(10)
    },
    linkView: {
        flexDirection: 'row',
        height: px2dp(60),
        width: theme.screenWidth-px2dp(20),
        borderWidth: 1/PixelRatio.get(),
        borderColor: theme.grayColor,
        marginLeft: px2dp(10),
        marginRight: px2dp(10)
    },
    linkImage:{
        width: px2dp(59),
        height: px2dp(59),
        resizeMode: 'cover',
        backgroundColor: '#f4f4f4'
    },
    linkText: {
        fontSize: px2dp(16),
        color: '#000',
        fontWeight: 'bold'
    },
    banner: {
        width: theme.screenWidth,
        height: px2dp(120),
        resizeMode: 'cover',
        marginTop: px2dp(10),
    },
    bottom: {
        flexDirection: 'row',
        padding: px2dp(10),
        alignItems: 'center'
    },
    commentText: {
        marginRight: px2dp(25),
        marginLeft: px2dp(5)
    }
});
