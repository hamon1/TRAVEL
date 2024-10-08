/**
 * 설정 화면
 *
 * 로그아웃, 회원탈퇴
 */

import React from 'react';
import {View, Text, StyleSheet, Pressable, Platform} from 'react-native';
import { signOut } from '../../lib/auth';
import { useUserContext } from '../../components/UserContext';
const Setting = () => {
  const { setUser } = useUserContext();

  const onLogout = async () => {
    await signOut();
    setUser(null)
  }
  return (
    <View style={styles.block}>
      <Pressable
        onPress={onLogout}
        style={({pressed}) => [
          styles.item,
          pressed && Platform.select({ios: {opacity: 0.5}}),
        ]}
        android_ripple={{
          color: '#eee',
        }}>
        <Text style={styles.itemText} >로그아웃</Text>
      </Pressable>
      <Pressable style={styles.item}>
        <Text style={styles.itemText}>회원탈퇴</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
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
