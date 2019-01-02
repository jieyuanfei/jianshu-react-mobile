/**
 * Created by wangdi on 7/11/16.
 */
import React, {Component, PropTypes} from 'react';
import {Text, View, StyleSheet, Platform, TouchableNativeFeedback, TouchableOpacity} from 'react-native';
import theme from '../config/theme';
import px2dp from '../util/px2dp';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageButton from "./ImageButtonWithText";

export default class SearchBar extends Component{
    static propTypes = {
        onPress: PropTypes.func
    };

    render(){
        if(Platform.OS === 'android'){
            return(
                <View style={styles.container}>
                    <ImageButton
                        icon="md-qr-scanner"
                        imgSize={px2dp(30)}
                        btnStyle={styles.imgBtn}
                    />
                    <TouchableNativeFeedback onPress={this.props.onPress}>
                        {this.renderContent()}
                    </TouchableNativeFeedback>
                    <ImageButton
                        icon="ios-alarm-outline"
                        imgSize={px2dp(30)}
                        btnStyle={styles.imgBtn}
                    />
                    <ImageButton
                        icon="md-paper-plane"
                        imgSize={px2dp(30)}
                        btnStyle={styles.imgBtn}
                    />
                </View>
            );
        }else if(Platform.OS === 'ios'){
            return(
                <View style={styles.container}>
                    <TouchableOpacity onPress={this.props.onPress} activeOpacity={theme.btnActiveOpacity}>
                        {this.renderContent()}
                    </TouchableOpacity>
                </View>
            );
        }
    }

    renderContent(){
        return(
            <View style={styles.searchBar}>
                <Icon name="ios-search" size={px2dp(16)} color="#6f6f71"/>
                <Text style={styles.text}>搜索</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: theme.actionBar.height,
        backgroundColor: '#f5f5f5',
        justifyContent: 'flex-start',
        flexDirection:'row',
        paddingTop: (Platform.OS === 'ios') ? px2dp(20) : 0
    },
    searchBar: {
        flexDirection: 'row',
        height: px2dp(26),
        flex:1,
        marginTop:px2dp(7),
        paddingLeft: px2dp(13),
        paddingRight: px2dp(13),
        backgroundColor: '#fff',
        alignItems: 'center',
        marginRight: px2dp(8),
        marginLeft: px2dp(8),
        borderRadius: px2dp(22)
    },
    text: {
        fontSize: px2dp(15),
        color: '#6f6f71',
        marginLeft: px2dp(13)
    },
    imgBtn: {
        height:theme.actionBar.height,
        width:theme.actionBar.height,
    }
});
