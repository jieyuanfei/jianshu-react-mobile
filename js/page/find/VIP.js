//
//  Created by Liu Jinyong on 17/4/5.
//  Copyright © 2016年 Liu Jinyong. All rights reserved.
//
//  @flow
//  Github:
//  https://github.com/huanxsd/react-native-refresh-list-view

import React, {Component} from 'react'
import {View, StyleSheet, Text, Platform, Dimensions, Image,ScrollView,PixelRatio} from 'react-native'
import MenuBar from './MenuBar'
import px2dp from '../../util/px2dp'
import Icon from 'react-native-vector-icons/Ionicons';
import ImageButton from "../../component/ImageButtonWithText";
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
class Recommend extends Component {
    constructor(props){
        super(props);
        this.state = {
            refreshing: true,
            loadedData: false,
            dataBlob: [],
            btnName: ['热门推荐','活动有礼','贡献排行','本周推荐','评论回复','喜欢收藏','投稿申请','更多']
        }
    }
    render() {
        return (
            <ScrollView
                ref="scrollerView"
                style={styles.container}
                horizontal={false}
                showsHorizontalScrollIndicator={false}>
                <View style={styles.item}>
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
                                    />
                            )})
                        }
                    </View>
                    <Text style={styles.titleText}>
                        <Icon name="md-bookmarks" color='#666' size={px2dp(16)}/> 关注我的连载
                    </Text>
                    <MenuBar/>
                </View>

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: px2dp(40),
    },
    title: {
        fontSize: 18,
        height: 84,
        textAlign: 'center'
    },
    titleText: {
        fontSize: px2dp(16),
        height: px2dp(60),
        color: '#666',
        justifyContent: 'center',
        textAlignVertical: 'center',
        borderBottomWidth: px2dp(8),
        borderTopWidth: px2dp(8),
        borderColor: '#eee',
        paddingLeft: px2dp(5)

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
})

export default Recommend
