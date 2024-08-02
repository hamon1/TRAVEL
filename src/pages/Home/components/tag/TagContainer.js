import React from 'react';
import {View, StyleSheet} from 'react-native';

import Tag from './TypeTag';

const tagContainer = ({types}) => {
    const tagCount = types.length;
    return (
        <View style={styles.box}>
            <Tag types={types[0]} />
            <Tag types={'tag2'} />
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        top: 60,
        margin: 10,
        flexDirection: 'row',
    }
});

export default tagContainer;