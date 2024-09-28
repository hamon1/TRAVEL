/**
 * 만든 여행 계획 보드 리스트 - 박스(section)
 *
 * 보드 id, text - 보드 이름, text2 - ''
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

import Icon from 'react-native-vector-icons/MaterialIcons';

const ChatSection = ({id, text, text2, lastMessage, userId, otherUserName, userCount}) => {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        style={styles.section}
        onPress={() => navigation.navigate('chatScreen', {chatRoomId:id, userId:userId})}>
        <Text style={styles.text_Name}>{otherUserName}</Text>
        <Text style={styles.text}>{lastMessage||'주고 받은 대화 없음!'}</Text>
        <View style={styles.icon}>
          <Icon style={{marginRight: 4,}} name="people" size={24} color="#000000" />
          <Text>{userCount}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    // backgroundColor: '#FFE99C',
    backgroundColor: 'white',
    height: 100,
    width: '100%',
    borderBottomWidth: 0.2,
    borderBottomColor: 'gray',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  text_Name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    top: 20,
    left: 20,
  },
  text: {
    fontSize: 14,
    color: '#616161',
    top: 30,
    left: 25,
  },
  icon: {
    width: 56,
    height: 28,
    borderRadius: 15,
    backgroundColor: '#FFC107',
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    left: '82%',
  },
});

export default ChatSection;
