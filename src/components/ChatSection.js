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

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ChatSection = ({id, text, text2}) => {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity style={styles.section}>
        <Text style={styles.text_Name}>{text}</Text>
        <Text style={styles.text}>{id}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.messageIcon}>
        <Icon name="message" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    top: 10,
    bottom: 10,
    backgroundColor: '#FFE99C',
    marginLeft: 10,
    marginBottom: 10,
    borderRadius: 15,
    height: 100,
    width: '95%',
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
  messageIcon: {
    position: 'absolute',
  },
});

export default ChatSection;
