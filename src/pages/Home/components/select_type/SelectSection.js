import React from 'react';

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const SelectSection = ({section, changeType, value, closeModal}) => {
    function onPress() {
        changeType(value);
        closeModal();
    };

    return (
    <TouchableOpacity onPress={onPress} style={styles.list_section}>
        {/* <Text style={styles.text}>{JSON.stringify(section)}</Text> */}
        <Text style={styles.text}>{section}</Text>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    list_section: {
        backgroundColor: '#fb8c00',
        height: 30,
        width: 72,
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 0.2,
        borderBottomColor: 'gray',
        borderRadius: 20,
        shadowColor: '#4d4d4d',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    text: {
        color: 'white',
        fontWeight: '600',
    },
});

export default SelectSection;