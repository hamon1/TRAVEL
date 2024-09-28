import React from 'react';
import { View, Text, TextInput, StyleSheet } from'react-native';

const TextBox = ({messageText}) => {
    return (
        <View style={styles.container}>
            <Text>{messageText}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'yellow',
        // width: 10,
        // height: 50,
        justifyContent: 'center',
        marginHorizontal: 8,
        // alignItems: 'center',
    },
})

export default TextBox;