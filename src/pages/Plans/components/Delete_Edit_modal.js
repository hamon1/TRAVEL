import React, {useRef} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MODAL_HEIGHT = 36;
const MODAL_WIDTH = 92;

const Delete_Edit_Modal = ({Yposition, onPress}) => {

    return (
        <View style={{top: Yposition + 40, left: 8,}}>
            <View style={styles.container}>
                <View style={styles.bubble}/>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.del_text}>삭제</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={onPress}>
                    <Text style={styles.edit_text}>수정</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: MODAL_WIDTH,
        height: MODAL_HEIGHT,
        borderRadius: 15,
        backgroundColor: '#d9d9d9',
        flexDirection: 'row',
        alignItems: 'center',
    },
    bubble: {
        position: 'absolute',
        width: 16,
        height: 16,
        borderRadius: 25,
        backgroundColor: '#d9d9d9',
        left: 82,
    },
    button: {
        width: MODAL_WIDTH/2,
        height: MODAL_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'yellow',
        // borderWidth: 0.5,
    },
    del_text: {
        color: 'red',
    },
    edit_text: {

    },
})

export default Delete_Edit_Modal;