import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const PlanSection = ({id, text, text2}) => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity style={styles.section}>
        {/**TouchableOpacity / onPress=> plans로 이동 */}
        <Text style={styles.text_Name}>{text}</Text>
        <Text style={styles.text}>{id}</Text>
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
});

export default PlanSection;