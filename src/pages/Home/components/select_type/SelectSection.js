import React from 'react';

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const SelectSection = ({key, section, changeType, value}) => {
    return (
    <TouchableOpacity onPress={() => changeType(value)}>
        <Text>{JSON.stringify(section)}</Text>
        {/* <Text>{section}</Text> */}
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

});

export default SelectSection;