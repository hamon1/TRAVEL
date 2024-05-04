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

import Icon from 'react-native-vector-icons/Octicons';

const PlanSection = ({id, text, text2, onRemove}) => {
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
        {/**TouchableOpacity / onPress=> plans로 이동 */}
        <Text style={styles.text_Name}>{text}</Text>
        <Text style={styles.text}>{id}</Text>

        <TouchableOpacity onPress={remove} style={styles.icon}>
          <Icon name="x" size={30} color="#ffffff" />
        </TouchableOpacity>
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
    height: 120,
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
  icon: {
    width: 24,
    height: 24,
    top: -20,
    left: '90%',
  },
});

export default PlanSection;
