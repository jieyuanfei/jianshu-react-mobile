/**
 * Created by wangdi on 6/11/16.
 */
'use strict';

import React, {Component} from 'react';
import {Text, StyleSheet, View, ScrollView, RefreshControl} from 'react-native';
import HotPanel from '../../component/HotPanel';
import ListViewForHomeTab from '../../component/ListViewForHome';
import ListViewForOtherTab from '../../component/SimpleListView';
import computeTime from '../../util/computeTime';
import theme from '../../config/theme';
import data from '../../data.json';
import Find from '../find/Recommend'

export default class HomeTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: true,
            loadedData: false,
            dataBlob: []
        };
    }

    componentDidMount() {
        this._fetchData();
    }

    render() {
        return (

            <View style={{flex:1}}>
                <Find/>
            </View>
        );
    }

    _renderContents() {
        let {tabTag} = this.props;
        if (tabTag === '首页')
            tabTag = '热门推荐';
        else
            tabTag += '热门';

        if (!this.state.refreshing || this.state.loadedData) {
            return (
                <View>
                    <HotPanel title={tabTag} contents={this.state.dataBlob}/>
                    { tabTag === '热门推荐' ?
                        <ListViewForHomeTab contents={this.state.dataBlob}/>
                        :
                        <ListViewForOtherTab contents={this.state.dataBlob}/>
                    }
                    <Demo/>
                </View>
            );
        }
    }

    _onRefresh() {
        this.setState({refreshing: true});
        this._fetchData();
    }

    _getCurrentTime() {
        function convertTime(time) {
            if (time <= 9)
                return '0' + time;
            return time;
        }

        var date = new Date();
        return date.getFullYear() + '-' + convertTime(date.getMonth() + 1) + '-' + convertTime(date.getDate()) + 'T' + convertTime(date.getHours()) + ':' + convertTime(date.getMinutes()) + ':' + convertTime(date.getSeconds() + '.' + date.getMilliseconds() + 'Z');
    }

    _fetchData() {
        let dataBlob = data.rows
        this.setState({
            dataBlob: dataBlob,
            loadedData: true,
            refreshing: false
        });
    }
}
