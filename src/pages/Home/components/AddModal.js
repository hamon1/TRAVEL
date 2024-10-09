import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CONTAINER_HEIGHT = 60;

export const AddModal = ({yPosition}) => {
    return (
        <View style={[styles.container, {top: yPosition - 40}]}>
            {/* <Text style={styles.title_text}>Add Friend</Text> */}
            <TouchableOpacity style={styles.add_button}>
                <Text style={styles.add_text}>새로운 플랜 생성</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.add_button}>
                <Text style={styles.add_text}>기존 플랜에 추가</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: 120,
        height: CONTAINER_HEIGHT,
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        left: '62%',
    },
    title_text: {

    },
    add_button: {
        height: CONTAINER_HEIGHT/2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    add_text: {

    },
})