/**
 * 친구 목록 - 친구 박스
 *
 * 
 */

import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Octicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

const FriendSection = ({id, text, text2, onRemove}) => {
  const navigation = useNavigation();

  const remove = () => {
    Alert.alert(
      '삭제',
      '정말 삭제하시겠습니까?',
      [
        {
          text: '삭제',
          onPress: () => {
            onRemove(id);
          },
          style: 'destructive',
        },
        {
          text: '아니오',
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {},
      },
    );
  };

  return (
    <View>
      <TouchableOpacity style={styles.section}>
        <Image style={styles.userImage}></Image>
        <Text style={styles.text_Name}>{text}</Text>
        <Text style={styles.text}>{id}</Text>
        {/** 친구 삭제 */}
        <TouchableOpacity onPress={remove} style={styles.icon_remove}>
          <Icon name="x" size={24} color="#000000" />
        </TouchableOpacity>
        {/** 채팅창으로 이동 */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('chatRoom');
          }}
          style={styles.icon_message}>
          <Icon2 name="message" size={24} color="#000000" />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    top: 10,
    bottom: 10,
    backgroundColor: 'white',
    marginLeft: 10,
    marginBottom: 10,
    height: 120,
    width: '95%',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  text_Name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    top: 28,
    left: '28%',
    position: 'absolute',
  },
  text: {
    fontSize: 14,
    color: '#616161',
    top: 56,
    left: '28%',
    position: 'absolute',
  },
  icon_remove: {
    width: 24,
    height: 24,
    top: 24,
    left: '92%',
    position: 'absolute',
  },
  icon_message: {
    width: 24,
    height: 24,
    top: 24,
    left: '80%',
    position: 'absolute',
  },
  userImage: {
    width: 64,
    height: 64,
    borderRadius: 45,
    backgroundColor: 'gray',
    left: 16,
    top: '50%',
    transform: [{translateY: -32}],
  },
});

export default FriendSection;
