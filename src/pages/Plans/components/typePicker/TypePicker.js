import React, {useState} from 'react';
import {View, Text, StyleSheet, Modal, TouchableOpacity, Pressable} from 'react-native';

const TypePicker = ({visible, setModalClose, changePlaceSelector, values, width, positon, setType = () => {}}) => {
    // const [isModalVisible, setModalVisible] = useState(false);

    const changeEditBox = (type) => {
        changePlaceSelector(type);
        setType(type);
        setModalClose();
    };
    // console.log(values.length);

    return (
        <Modal style={styles.container} transparent={true} visible={visible} animationType='fade'>
            <Pressable style={styles.bg} onPress={()=>setModalClose()}>
                <View style={[styles.block, {width: width, top: 236 + positon}]}>
                    {/* {['관광지', '이동수단', '숙소', '식당/카페', '기타'].map((item, index)=> {
                        return (
                            <TouchableOpacity key={index} style={styles.row} onPress={()=>changeEditBox(index)}>
                                <Text style={styles.rowText}>{item}</Text>
                            </TouchableOpacity>
                        )
                    })} */}
                    {values.map((item, index)=> {
                        
                        // console.log(values);
                        return (
                            <TouchableOpacity key={index} style={styles.row} onPress={()=>changeEditBox(index)}>
                                <Text style={styles.rowText}>{item}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </Pressable>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0)',
    },
    bg: {
        // backgroundColor: 'red',
        flex: 1,
    },
    block: {
        // backgroundColor: 'red',
        // width: 88,
        // height: 100,
        top: 236,
        left: '5%',
        // transform: [{translateY: -100}],
        // borderRadius: 10,
        backgroundColor: '#E4E4E4',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        shadowColor: '#4d4d4d',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.2,
    },
    row: {
        padding: 4,
        justifyContent: 'center',
    },
    rowText: {
        // backgroundColor: 'yellow',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
        // paddingHorizontal: 8,
        paddingVertical: 4,
        color: '#616161',
    },
})

export default TypePicker;