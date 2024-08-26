import React from 'react';
import {View, StyleSheet} from 'react-native';

import Tag from './TypeTag';
import translation from './tag_trans_data/translations.json';

const tagContainer = ({types}) => {
    const tagCount = types.length;
    
    return (
        <View style={styles.box}>
        {/* // <>
        // <Tag types={types[0]} />
        // <Tag types={'tag2'} />
        // </> */}
        {types.map((type, index) => {
            const transType = translation[type];
            if (!transType) {
                return 
            }
            else {
                return(
                <Tag key={index} types={transType} />
                )
            }
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        top: 58,
        // margin: 10,
        flexDirection: 'row',
        flexWrap: 'wrap', // 여러 줄로 태그 감쌈
    }
});

export default tagContainer;