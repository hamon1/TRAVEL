import React from "react";
import { View, Text, StyleSheet } from "react-native";
import EventBlock from "react-native-calendars/src/timeline/EventBlock";

function Emptyplan() {
    return (
        <View styles={styles.block}>
            <Text styles={styles.description}>계획이 없습니다.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    block: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    description: {
        fontSize: 24,
        color: '#9e9e9e',
    },
});

export default Emptyplan