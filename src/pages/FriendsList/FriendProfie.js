import React, {useState} from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

const FriendProfile = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.block}>
      <View style={styles.box}>
        <TouchableOpacity
          onPress={() => {
            navigation.pop();
          }}
          style={styles.iconBack}>
          <Icon name="right" size={24} color="#000000" />
        </TouchableOpacity>
        <Image
          style={styles.image}
          /** 이미지 설정(기본 값)
           * 이후 사용자가 선택한 이미지로 변경 가능하게.
           */
          source={require('../../assets/Defualtuserimage.png')}
        />
        <View style={styles.nameBlock}>
          <Text style={styles.nameText}>Name</Text>
        </View>
        <View style={styles.introduce_block}>
          <Text style={styles.introduce_text}>introduce_text</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    // backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: '92%',
    // backgroundColor: 'violet',
    backgroundColor: '#fb8c00',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 24,
    borderRadius: 10,
  },
  iconBack: {
    left: '40%',
    width: 24,
    // backgroundColor: 'red',
    alignItems: 'center',
    marginBottom: 12,
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 45,
    marginBottom: 4,
  },
  nameBlock: {
    padding: 8,
    // backgroundColor: 'blue',
    marginBottom: 24,
  },
  nameText: {
    // backgroundColor: 'red',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  introduce_block: {
    padding: 8,
    width: '80%',
    height: 80,
    // backgroundColor: 'blue',
  },
  introduce_text: {
    // backgroundColor: 'green',
    fontSize: 14,
    color: 'black',
    height: 64,
  },
});

export default FriendProfile;
