import React from "react";
import {View, Pressable, StyleSheet} from "react-native";

import Icon from 'react-native-vector-icons/Octicons';

const BackButton = ({onPress}) => {
    return (
        <Pressable style={styles.block} onPress={onPress}>
            <Icon name="home" size={36} color='#fb8c00'/>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    block: {
        bottom: 32,
        right: 24,
        width: 56,
    height: 56,
    backgroundColor: 'white',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    shadowColor: '#4d4d4d',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    }
})

export default BackButton;