import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

const WINDOW_HEIGHT = Dimensions.get('screen').height;

const EmptyView = () => {
    return (
        <View style={{height: WINDOW_HEIGHT-306, justifyContent: 'center', alignItems: 'center'}}>
            <Text>No Data</Text>
        </View>
    );
};

const styles = StyleSheet.create({

});

export default EmptyView;