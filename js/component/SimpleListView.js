/**
 * Created by wangdi on 9/11/16.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {Text, View, StyleSheet, Platform, PixelRatio, ListView, TouchableOpacity, TouchableNativeFeedback, Image} from 'react-native';
import px2dp from '../util/px2dp';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../config/theme';
import MainPage from '../page/MainPage';

export default class SimpleListView extends Component{
    static propTypes = {
        isRenderHeader: PropTypes.bool
    }

    static defaultProps = {
        isRenderHeader: false
    }

    constructor(props){
        super(props);
        const ds = new ListView.DataSource({
           rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            dataSource: ds.cloneWithRows(this.props.contents)
        }
    }

    _itemClickCallback(rowData){
        MainPage.switchToWebViewPage(rowData);
    }

    _renderItem(rowData, sectionID, rowID, highlightRow){
        if(Platform.OS === 'ios') {
            return (
                <TouchableOpacity
                    onPress={this._itemClickCallback.bind(this, rowData)}
                    activeOpacity={theme.btnActiveOpacity}>
                    {this._renderItemContent(rowData)}
                </TouchableOpacity>
            )
        }else if(Platform.OS === 'android'){
            return (
                <TouchableNativeFeedback onPress={this._itemClickCallback.bind(this, rowData)}>
                    {rowData.images.length === 1?this._renderItemContentImageOne(rowData):this._renderItemContent(rowData)}
                </TouchableNativeFeedback>
            )
        }
    }

    _renderItemContentImageOne(rowData){
        return(
            <View style={[styles.item,{flexDirection: 'row',}]}>

                <View style={{flex: 1,paddingRight: px2dp(13)}}>
                    <Text style={styles.title} numberOfLines={2}>{rowData.title}</Text>
                    {this._renderItemContext(rowData.text)}
                    {this._renderItemOperation()}
                </View>
                <Image style={{height:px2dp(75),width: px2dp(75),borderRadius: 5}} source={{uri: rowData.images[0]}}/>

            </View>
        );
    }
    _renderItemContent(rowData){
        return(
            <View style={styles.item}>

                <Text style={styles.title} numberOfLines={2}>{rowData.title}</Text>
                {rowData.images.length>2?this._renderItemImage(rowData.images):this._renderItemContext(rowData.text)}
                {this._renderItemOperation()}
            </View>
        );
    }
    _renderItemContext(text){
        return(<Text style={styles.content} numberOfLines={2}>{text}</Text>)
    }
    _renderItemImage(images){
        return(<View style={styles.images}>
            <Image style={styles.image} source={{uri: images[0]}}/>
            <Image style={[styles.image,{marginRight:px2dp(10),  marginLeft:px2dp(10)}]} source={{uri: images[1]}}/>
            <Image style={styles.image} source={{uri: images[2]}}/>
        </View>)
    }
    _renderItemOperation(){
        return(<View style={styles.operation}>
            <Text style={{color:'#d9d9d9',marginRight: 10}}>揭远飞</Text>
            <Text style={{color:'#d9d9d9',marginRight: 10}}>
                <Icon name="md-text" color='#d9d9d9' size={px2dp(12)}/>12
            </Text>
            <Text style={{color:'#d9d9d9',marginRight: 10}}>
                <Icon name="ios-thumbs-up" color='#d9d9d9' size={px2dp(12)}/>1
            </Text>
            <Text style={{color:'#d9d9d9',marginRight: 10}}>
                <Icon name="md-heart" color='#d9d9d9' size={px2dp(10)}/>12
            </Text>
        </View>)
    }
    _renderHeader(){
        if(this.props.isRenderHeader) {
            return (
                <View style={styles.header}>
                    <Text>热门文章</Text>
                </View>
            );
        }
    }

    render(){
        return(
            <ListView
                style={styles.listView}
                dataSource={this.state.dataSource}
                renderRow={this._renderItem.bind(this)}
                renderHeader={this._renderHeader.bind(this)}
            />
        );
    }
}

const styles = StyleSheet.create({
    listView: {
        // marginTop: px2dp(15)
    },
    header: {
        backgroundColor: '#fff',
        height: px2dp(40),
        paddingLeft: px2dp(15),
        justifyContent: 'center'
    },
    item: {
        flexDirection: 'column',
        width: theme.screenWidth,
        // height: px2dp(80),
        backgroundColor: '#fff',
        paddingLeft: px2dp(10),
        paddingRight: px2dp(10),
        paddingTop:px2dp(8),
        paddingBottom:px2dp(6),
        borderBottomColor: '#eee',
        borderBottomWidth: 0.5
    },
    title: {
        color: '#333',
        fontSize: px2dp(15),
    },
    content: {
        paddingTop:px2dp(5),
        paddingBottom:px2dp(5),
        color:'#d9d9d9'
    },
    operation: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },

    images: {
        paddingTop:px2dp(5),
        paddingBottom:px2dp(5),
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    image: {
        flex:1,
        height: px2dp(65),
        borderRadius: 5,
        backgroundColor: '#f4f4f4',
        resizeMode: 'cover'
    },
    infoBar: {
        flexDirection: 'row',
        marginTop: px2dp(3)
    },
    infoBarText: {
        fontSize: px2dp(11),
        color: theme.grayColor
    }
});
