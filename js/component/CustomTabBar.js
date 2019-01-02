/**
 * Created by wangdi on 6/11/16.
 */
const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    Text,
    View,
    Animated,
    ScrollView,
    TouchableNativeFeedback,
    TouchableOpacity,
    Platform,
    Dimensions
} = ReactNative;
import px2dp from '../util/px2dp';
import theme from '../config/theme';
import ImageButton from './ImageButtonWithText';
import Icon from 'react-native-vector-icons/Ionicons';
const Button = (props) => {
    if(Platform.OS === 'android') {
        return <TouchableNativeFeedback
            delayPressIn={0}
            background={TouchableNativeFeedback.SelectableBackground()} // eslint-disable-line new-cap
            {...props}>
            {props.children}
        </TouchableNativeFeedback>;
    }else if(Platform.OS === 'ios') {
        return <TouchableOpacity {...props}>
            {props.children}
        </TouchableOpacity>;
    }
};

const WINDOW_WIDTH = Dimensions.get('window').width;

const ScrollableTabBar = React.createClass({
    propTypes: {
        goToPage: React.PropTypes.func,
        activeTab: React.PropTypes.number,
        tabs: React.PropTypes.array,
        backgroundColor: React.PropTypes.string,
        activeTextColor: React.PropTypes.string,
        inactiveTextColor: React.PropTypes.string,
        scrollOffset: React.PropTypes.number,
        style: View.propTypes.style,
        tabStyle: View.propTypes.style,
        tabsContainerStyle: View.propTypes.style,
        textStyle: Text.propTypes.style,
        renderTab: React.PropTypes.func,
        underlineStyle: View.propTypes.style,
        pullDownOnPress: React.PropTypes.func
    },

    getDefaultProps() {
        return {
            scrollOffset: 52,
            activeTextColor: 'navy',
            inactiveTextColor: 'black',
            backgroundColor: null,
            style: {},
            tabStyle: {},
            tabsContainerStyle: {},
            underlineStyle: {},
        };
    },

    getInitialState() {
        this._tabsMeasurements = [];
        return {
            _leftTabUnderline: new Animated.Value(0),
            _widthTabUnderline: new Animated.Value(0),
            _containerWidth: null,
        };
    },

    componentDidMount() {
        this.props.scrollValue.addListener(this.updateView);
    },

    updateView(offset) {
        const position = Math.floor(offset.value);
        const pageOffset = offset.value % 1;
        const tabCount = this.props.tabs.length;
        const lastTabPosition = tabCount - 1;

        if (tabCount === 0 || offset.value < 0 || offset.value > lastTabPosition) {
            return;
        }

        if (this.necessarilyMeasurementsCompleted(position, position === lastTabPosition)) {
            this.updateTabPanel(position, pageOffset);
            this.updateTabUnderline(position, pageOffset, tabCount);
        }
    },

    necessarilyMeasurementsCompleted(position, isLastTab) {
        return this._tabsMeasurements[position] &&
            (isLastTab || this._tabsMeasurements[position + 1]) &&
            this._tabContainerMeasurements &&
            this._containerMeasurements;
    },

    updateTabPanel(position, pageOffset) {
        const containerWidth = this._containerMeasurements.width;
        const tabWidth = this._tabsMeasurements[position].width;
        const nextTabMeasurements = this._tabsMeasurements[position + 1];
        const nextTabWidth = nextTabMeasurements && nextTabMeasurements.width || 0;
        const tabOffset = this._tabsMeasurements[position].left;
        const absolutePageOffset = pageOffset * tabWidth;
        let newScrollX = tabOffset + absolutePageOffset;

        // center tab and smooth tab change (for when tabWidth changes a lot between two tabs)
        newScrollX -= (containerWidth - (1 - pageOffset) * tabWidth - pageOffset * nextTabWidth) / 2;
        newScrollX = newScrollX >= 0 ? newScrollX : 0;

        if (Platform.OS === 'android') {
            this._scrollView.scrollTo({x: newScrollX, y: 0, animated: false, });
        } else {
            const rightBoundScroll = this._tabContainerMeasurements.width - (this._containerMeasurements.width);
            newScrollX = newScrollX > rightBoundScroll ? rightBoundScroll : newScrollX;
            this._scrollView.scrollTo({x: newScrollX, y: 0, animated: false, });
        }

    },

    updateTabUnderline(position, pageOffset, tabCount) {
        const lineLeft = this._tabsMeasurements[position].left;
        const lineRight = this._tabsMeasurements[position].right;

        if (position < tabCount - 1) {
            const nextTabLeft = this._tabsMeasurements[position + 1].left;
            const nextTabRight = this._tabsMeasurements[position + 1].right;

            const newLineLeft = (pageOffset * nextTabLeft + (1 - pageOffset) * lineLeft);
            const newLineRight = (pageOffset * nextTabRight + (1 - pageOffset) * lineRight);

            this.state._leftTabUnderline.setValue(newLineLeft);
            this.state._widthTabUnderline.setValue(newLineRight - newLineLeft);
        } else {
            this.state._leftTabUnderline.setValue(lineLeft);
            this.state._widthTabUnderline.setValue(lineRight - lineLeft);
        }
    },

    renderTab(name, page, isTabActive, onPressHandler, onLayoutHandler) {
        const { activeTextColor, inactiveTextColor, textStyle, } = this.props;
        const textColor = isTabActive ? activeTextColor : inactiveTextColor;
        const border = isTabActive ? {borderColor: '#ea6f5a',borderBottomWidth: 3}  : {};
        const fontWeight = isTabActive ? 'normal' : 'normal';

        return <Button
            key={`${name}_${page}`}
            accessible={true}
            accessibilityLabel={name}
            accessibilityTraits='button'
            onPress={() => onPressHandler(page)}
            onLayout={onLayoutHandler}>
            <View style={[styles.tab,border ]}>
                <Text style={[{color: textColor, fontWeight, }, textStyle, ]}>
                    {name}
                </Text>
            </View>
        </Button>;
    },

    measureTab(page, event) {
        const { x, width, height, } = event.nativeEvent.layout;
        this._tabsMeasurements[page] = {left: x, right: x + width, width, height, };
        this.updateView({value: this.props.scrollValue._value, });
    },

    render() {

        return <View style={{flexDirection: 'row',borderBottomWidth:1,borderBottomColor: '#eee'}}>
            <View
                style={styles.tabs}
                ref={'tabContainer'}
                onLayout={this.onTabContainerLayout}>
                {this.props.tabs.map((name, page) => {
                    const isTabActive = this.props.activeTab === page;
                    const renderTab = this.props.renderTab || this.renderTab;
                    return renderTab(name, page, isTabActive, this.props.goToPage);
                })}
            </View>
            <ImageButton
                icon="md-search"
                color="#ccc"
                imgSize={px2dp(20)}
                btnStyle={[styles.imgBtn]}/>
        </View>;
    },

    componentWillReceiveProps(nextProps) {
        // If the tabs change, force the width of the tabs container to be recalculated
        if (JSON.stringify(this.props.tabs) !== JSON.stringify(nextProps.tabs) && this.state._containerWidth) {
            this.setState({ _containerWidth: null, });
        }
    },

    onTabContainerLayout(e) {
        this._tabContainerMeasurements = e.nativeEvent.layout;
        let width = this._tabContainerMeasurements.width;
        if (width < WINDOW_WIDTH) {
            width = WINDOW_WIDTH;
        }
        this.setState({ _containerWidth: width, });
        this.updateView({value: this.props.scrollValue._value, });
    },

    onContainerLayout(e) {
        this._containerMeasurements = e.nativeEvent.layout;
        this.updateView({value: this.props.scrollValue._value, });
    },
});

module.exports = ScrollableTabBar;

const styles = StyleSheet.create({
    tab: {
        height: theme.actionBar.height,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft:px2dp(15),
        marginRight:px2dp(15),
        paddingTop: (Platform.OS === 'ios') ? px2dp(20) : 0,
        paddingLeft:px2dp(5),
        paddingRight:px2dp(5),
    },
    container: {
        flex: 1,
        height: theme.actionBar.height,
        borderWidth: 0.5,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: '#eee',
    },
    tabs: {
        flex:1,
        paddingLeft:px2dp(50),
        flexDirection: 'row',
        justifyContent: 'center',
    },
    imgBtn: {
        height: theme.actionBar.height,
        backgroundColor: '#fff',
        width: px2dp(50),
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: (Platform.OS === 'ios') ? px2dp(20) : 0
    }
});
