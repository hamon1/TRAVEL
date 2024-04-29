/*
화면 상단 고정 바

일부 화면은 back 버튼 포함됨
*/

import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const Header = () => {
  return (
    <View style={styles.container}>
      <Text>app name</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 84,
        backgroundColor: 'white',
        position: 'absolute',
        top: 0, // 아이폰 상단의 기본 바는 어떻게 취급하는거지? -> 일단은 띄어 놓음.
        flexDirection: 'row',
    justifyContent: 'space-around',
        alignItems: 'center',
    },
    
});

export default Header;
