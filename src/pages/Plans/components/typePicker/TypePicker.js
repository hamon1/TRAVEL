import React, {useState} from 'react';
import {View, Text, StyleSheet, Modal, TouchableOpacity, Pressable} from 'react-native';

const TypePicker = ({visible, setModalClose, changePlaceSelector}) => {
    // const [isModalVisible, setModalVisible] = useState(false);

    const changeEditBox = (type) => {
        changePlaceSelector(type);
        setModalClose();
    };

    return (
        <Modal style={styles.container} transparent={true} visible={visible} animationType='fade'>
            <Pressable style={styles.bg} onPress={()=>setModalClose()}>
                <View style={styles.block}>
                    <TouchableOpacity style={styles.row} onPress={()=>changeEditBox('A')}>
                        <Text style={styles.rowText}>관광명소</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row} onPress={()=>changeEditBox('B')}>
                        <Text style={styles.rowText}>이동수단</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row}>
                        <Text style={styles.rowText}>숙소</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row}>
                        <Text style={styles.rowText}>식당/카페</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row}>
                        <Text style={styles.rowText}>기타</Text>
                    </TouchableOpacity>
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
        width: 88,
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