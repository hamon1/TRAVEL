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

    },
})

export default TextBox;