import React from 'react';
import {Platform, Pressable, StyleSheet, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Octicons';

function CalendarButton({onPress}) {
     const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={() => navigation.push('CalendarView')}>
        <Icon name="calendar" color={'black'} size={30} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  
});

export default CalendarButton;