import React from 'react';
import {View, Text, StyleSheet} from 'react-native';


const Tag = ({types}) => {
    return (
        <View>

        <View style={styles.block}>
            <Text>#{types}</Text>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        backgroundColor: 'orange',
        width: 'auto',
        height: 26,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
});

export default Tag;