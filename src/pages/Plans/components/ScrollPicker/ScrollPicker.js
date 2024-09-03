import React from 'react';
import {View, ScrollView, Text, Pressable, StyleSheet, Animated, TouchableOpacity} from 'react-native';

import debounce from 'lodash/debounce';
import { Time } from 'react-native-gifted-chat';
// import { TouchableOpacity } from 'react-native-gesture-handler';

const BUTTON_HEIGHT = 36;
const CONTAINET_HEIGHT = BUTTON_HEIGHT*3;

// 중앙 위치 계산
const getCenterPosition = (offsetY) => {
    return Math.round(offsetY  / BUTTON_HEIGHT) * BUTTON_HEIGHT;
};

// index 값으로 중앙 위치 계산
const getCenterPositionFromIndex = (index) => {
    return index * BUTTON_HEIGHT;
};

// 배열 앞뒤로 빈 문자열 채움
const fillEmpty = (visibleCount, values) => {
    console.log(values);
    const fillCount = (visibleCount - 1) / 2;
    for (let i = 0; i < fillCount; i++) {
        values.unshift('');
        values.push('');
    }
    return values;
};

const ScrollPicker = ({handleTimeChange, TimePickerClose}) => {
    const [selectedPeriod, setSelectedPeriod] = React.useState('오전'); // '오전' 또는 '오후'
    const [selectedHour, setSelectedHour] = React.useState('01'); // 시간
    const [selectedMinute, setSelectedMinute] = React.useState('00'); // 분

    const getArrayFromIndex = (index, position) => {
        switch (index) {
            case 0:
                return (
                    // console.log('0')
                    setSelectedPeriod(period[0][position+1])
                );
            case 1:
                return (
                    // console.log('1')
                    setSelectedHour(hour[0][position+1])
                );
            case 2:
                return (
                    // console.log('2')
                    setSelectedMinute(minute[0][position+1])
                );
            default:
                return [''];
    };
};

    const period = React.useState([
        '',
        '오전', '오후', ''
    ]);

    const hour = React.useState([
        '',
        '12', 
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        '11',
        ''
    ]);

    const minute = React.useState([
        '',
        '00',
        '05',
        '10',
        '15',
        '20',
        '25',
        '30',
        '35',
        '40',
        '45',
        '50',
        '55',
        ''
    ]);
    
    // const [clock, setClock] = React.useState(null);
    // const scrollY = new Animated.Value(0);
    // 스크롤 위치 추적을 위한 애니메이션 값 정의
    const scrollY = React.useRef(new Animated.Value(0)).current;
    // 스크롤뷰 참조 저장. 배열
    const refs = React.useRef(
        Array.from({ length: 3 }).map(() => React.createRef())
    );

    // 스크롤이 멈췄을 때 호출. 중앙 위치를 구한 후 위치 조정.
    const getScrollStop = (index) => (offsetY, label) => {
        const CENTER_POSITION = getCenterPosition(offsetY);
        // console.log('getScrollStop: ', offsetY);
        // refs.current[index].current.scrollTo({ y: CENTER_POSITION });
        const scrollViewRef = refs.current[index].current;
        if (Number.isInteger(CONTAINET_HEIGHT) ) {
            const position_index = CENTER_POSITION / 36;
            console.log(position_index, ' / ');
            getArrayFromIndex(index, position_index);
            // timestamp = `${selectedPeriod} ${selectedHour}:${selectedMinute}`;
        }
        console.log('scrollStop => ',CENTER_POSITION, label);
    if (scrollViewRef && typeof scrollViewRef.scrollTo === 'function') {
        scrollViewRef.scrollTo({ y: CENTER_POSITION });
    } else {
        console.warn('ScrollView ref is not defined or scrollTo method is missing');
    }
    };

    // 스크롤 이벤트에 대한 속성 반환
    const getScrollProps = (index) => {
        const onScrollStop = debounce(getScrollStop(index), 200, {
            leading: false, trailing: true,
        });
        console.log('getScrollProps => ', index);
        return {
            showsVerticalScrollIndicator: false,
            contentContainerStyle: {
                left: 0,
                right: 0,
                position: 'absolute',
            },
            ref: refs.current[index],
            onScrollBeginDrag: () => {
                onScrollStop.cancel(); // 드레그
            },
            onScrollEndDrag: (e) => {
                onScrollStop.cancel();
                onScrollStop(e.nativeEvent.contentOffset.y, 'onScrollEndDrag');
            },
            onMomentumScrollBegin: () => {
                onScrollStop.cancel(); // 관성
            },
            onMomentumScrollEnd: (e) => {
                onScrollStop.cancel();
                onScrollStop(e.nativeEvent.contentOffset.y, 'onMomentumScrollEnd');
            },
        };
    };

    // 스크롤 뷰의 속성 정의, 상태 관리
    const [scrollProps] = React.useState(() => {
        return Array.from({ length: 3 }).map((_, index) => getScrollProps(index));
    });

    // 버튼 클릭 시 해당 인덱스에 스크롤되도록 하는 함수
    const getOnPress = (scrollViewIdx, buttonIdx) => () => {
        console.log('getOnPress', scrollViewIdx, buttonIdx);
        const targetIdx = buttonIdx - 1;
        if (targetIdx < 0) return;
        const CENTER_POSITION = getCenterPositionFromIndex(targetIdx);
        scrollProps[scrollViewIdx].ref.current.scrollTo({y: CENTER_POSITION});
    };

    const pressButton = () => 
    {
        const timestamp = `${selectedPeriod} ${selectedHour}:${selectedMinute}`;
        handleTimeChange(timestamp);
        TimePickerClose();
        console.log('pressButton');
    }

    return (
        <View style={styles.bg}>
            <View style={styles.container}>
                {/* 오전/오후 선택 */}
                <ScrollView  
                {...scrollProps[0]}
                showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
                {period[0].map((item, index) => (
                    <Pressable style={styles.button} onPress={getOnPress(0, index)}>
                        <Text style={styles.item_text}>{item}</Text>
                    </Pressable>
                ))}
                </ScrollView>

                {/* 시간 선택 */}
                <ScrollView 
                {...scrollProps[1]}
                showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
                {hour[0].map((item, index) => (
                    <Pressable style={styles.button} onPress={getOnPress(1, index)}>
                        <Text style={styles.item_text}>{item}</Text>
                    </Pressable>
                ))}
                </ScrollView>

                {/* 분 선택 */}
                <ScrollView 
                {...scrollProps[2]}
                showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
                {minute[0].map((item, index) => (
                    <Pressable style={styles.button} onPress={getOnPress(2, index)}>
                        <Text style={styles.item_text}>{item}</Text>
                    </Pressable>
                ))}
                </ScrollView>
                <OverlayView />
                <TouchableOpacity onPress={()=>{pressButton()}} pointerEvents={'auto'} style={styles.over_button_add}>
                    <Text style={styles.button_text}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

// 스크롤 뷰 위에 표시될 오버레이 뷰 (pointerEvents = none)
const OverlayView = () => {
    return (
        <View pointerEvents={'none'} style={styles.over_container}>
            <View>
                <View style={styles.overlayView_column}/>
                <View style={styles.overlayView_center}>
                    <View style={styles.over_button}/>
                    <View style={styles.over_button}/>
                    <View style={styles.over_button}/>
                    <Text style={styles.over_text}>:</Text>
                </View>
                <View style={styles.overlayView_column}>
                </View>
            </View>
        </View>
    );
};

const AddButton = () => {
    return (
        <TouchableOpacity onPress={()=>{ handleTimeChange(timestamp);
            TimePickerClose(); }} pointerEvents={'auto'} style={styles.over_button_add}>
            <Text style={styles.button_text}>+</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    bg: {
        position: 'absolute',
    },
    container: {
        alignSelf: 'center',
        flexDirection: 'row',
        height: CONTAINET_HEIGHT,
        // borderWidth: 1,
        backgroundColor: 'white',
        // borderColor: 'yellow',
    },
    scrollView: {
        // borderWidth: 1,
        // borderColor: 'green',
        width: 60,
    },
    button: {
        // backgroundColor: 'red',
        // borderWidth: 1,
        height: BUTTON_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item_text: {
        fontWeight: 'bold',
    },
    over_container: {
        position: 'absolute',
        width: 60*3,
        height: CONTAINET_HEIGHT,
        // backgroundColor: 'green',
    },
    overlayView_column: {
        height: BUTTON_HEIGHT,
        width: 60*3,
        backgroundColor: 'rgba(255,255,255,0.8)',
    },
    overlayView_center: {
        height: BUTTON_HEIGHT,
        width: 60*3,
        flexDirection: 'row',
        top: -2,
        // borderWidth: 1,
    },
    over_button: {
        marginLeft: 6,
        marginRight: 6,
        width: 60-12,
        height: BUTTON_HEIGHT,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: '#fb8c00',
        // backgroundColor: 'blue',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    over_text: {
        position: 'absolute',
        right: 60-2,
        top: 6,
        fontSize: 18,
    },
    over_button_add: {
        position: 'absolute',
        right: -12,
        top: -36,
        // backgroundColor: '#fb8c00',
    },
    button_text: {
        fontSize: 24,
        color: '#fb8c00',
    },
})

export default ScrollPicker;