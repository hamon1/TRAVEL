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

const FriendProfile = ({onPress, id, text, text2}) => {
  // const navigation = useNavigation();
  return (
    <View style={styles.block}>
      <View style={styles.box}>
        <TouchableOpacity onPress={onPress} style={styles.iconBack}>
          <Icon name="right" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Image
          style={styles.image}
          /** 이미지 설정(기본 값)
           * 이후 사용자가 선택한 이미지로 변경 가능하게.
           */
          source={require('../../../assets/Defualtuserimage.png')}
        />
        <View style={styles.nameBlock}>
          {/* <Text style={styles.nameText}>{text}</Text> */}
        </View>
        <View style={styles.introduce_block}>
          {/* <Text style={styles.introduce_text}>{text2}t</Text> */}
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
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  box: {
    width: '92%',
    // backgroundColor: 'violet',
    backgroundColor: '#fb8c00',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 32,
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
    marginBottom: 12,
  },
  nameText: {
    // backgroundColor: 'red',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  introduce_block: {
    padding: 8,
    width: '84%',
    height: 80,
    // backgroundColor: 'blue',
  },
  introduce_text: {
    // backgroundColor: 'green',
    fontSize: 14,
    color: 'black',
    height: 64,
    fontStyle: 'italic',
  },
});

export default FriendProfile;
