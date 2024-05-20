/**
 * 설정 화면
 *
 * 로그아웃, 회원탈퇴
 */

import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

const Setting = () => {
  return (
    <View style={style.block}>
      <Pressable style={style.item}>
        <Text style={style.itemText}>로그아웃</Text>
      </Pressable>
    </View>
  );
};

const style = StyleSheet.create({
  block: {
    flex: 1,
    paddingTop: 32,
  },
  item: {
    borderTopWidth: 0.2,
    borderBottomWidth: 0.2,
    borderColoer: '#eeeeee',
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  itemText: {
    fontSize: 16,
  },
});

export default Setting;
