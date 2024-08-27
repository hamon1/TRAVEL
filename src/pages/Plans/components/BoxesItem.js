import React from "react";
import { View, Text, StyleSheet } from "react-native";

function BoxesItem({id, text}) {
    return (
        <View style={styles.item}>
            <View style={styles.circle} />
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        padding: 16,
        alignItems: 'center',
        backgroundColor: 'blue',
    },
    circle: {
        width: 24,
        height: 50,
        //marginRight: 20,
    },
    text: {
        flex: 1,
        fontSize: 16,
        color: '#212121',
    },
});

export default BoxesItem;