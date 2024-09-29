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
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Octicons';

const PlanSection = ({pid, title, text, text2, id, date, time, onRemove, onPress, docId, userId, guest}) => {
  const navigation = useNavigation();
  console.log('guest? ', guest);

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

  // const formattedDate = new Date({date});
  console.log('planSection -> ', docId);

  return (
    <View>
      <TouchableOpacity
        style={[styles.section,
        {backgroundColor: guest === true ? '#ffc43c' : '#fb8c00'}
        ]}
        onPress={() => navigation.navigate('planScreen', {title: title, id: pid, docId: docId, userId: userId})}>
        <Text style={styles.text_Name}>{title}</Text>
        <View style={styles.dateBox}>
          {/* <Icon name="calendar" size={20} color="black" style={styles.iconCalender}/> */}
          {/* <Text>생성된 날짜: </Text> */}
          <Text style={styles.dateText}>{date}   {time}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={remove} style={styles.icon}>
        <Icon name="x" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    top: 10,
    bottom: 10,
    // backgroundColor: '#FFE99C',
    // backgroundColor:'#fb8c00',
    marginLeft: 10,
    marginBottom: 10,
    borderRadius: 15,
    height: 112,
    width: '95%',
    shadowColor: '#4d4d4d',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  text_Name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    top: 22,
    left: 20,
  },
  // text: {
  //   fontSize: 14,
  //   color: '#616161',
    // top: 30,
    // left: 20,
  // },
  icon: {
    width: 24,
    height: 24,
    position: 'absolute',
    top: 24,
    right: 20,
    // backgroundColor: 'blue',
  },
  dateBox: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red',
    paddingLeft: 14,
    top: 30,
  },
  dateText: {
    fontWeight: '400',
    fontSize: 12,
    marginLeft: 10,
    // color: '#616161',
    color: 'white',
  },
});

export default PlanSection;
