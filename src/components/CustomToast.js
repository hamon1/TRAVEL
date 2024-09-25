import React, { useState, useEffect } from 'react';
import { Modal, Text, View, StyleSheet } from 'react-native';

const CustomToast = ({ visible, message, OffToast }) => {
    const [show, setShow] = useState(false);

    console.log('customToast: visible? ', visible);

    useEffect(() => {
        if (visible) {
            setShow(true);
            setTimeout(() => {
                setShow(false);
                if (OffToast) {
                    OffToast();
                }
            }, 1600);
        }
    }, [visible]);

    return ( 
        <Modal
            transparent={true}
            visible={show}
            animationType="fade"
            onRequestClose={() => setShow(false)}
        >
            <View style={styles.centeredView}>
                <View style={styles.toastView}>
                    <Text style={styles.toastText}>{message}</Text>
                </View>
            </View>
        </Modal>

    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)', // 배경 반투명
    },
    toastView: {
        backgroundColor: '#333',
        padding: 15,
        borderRadius: 10,
        opacity: 0.9,
    },
    toastText: {
        color: 'white',
        fontSize: 16,
    },
})

export default CustomToast;