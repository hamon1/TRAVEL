import React, { useState, useContext } from 'react';
import {Pressable, StyleSheet, View, Modal, Text} from 'react-native';
import DayContext from '../context/DayContext';
import Icon from 'react-native-vector-icons/Octicons';
import CalendarView from './CalendarView';
import { format } from 'date-fns';
import {ko} from 'date-fns/locale';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

function CalendarButton() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  //const { days } = useContext(DayContext);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [visible, setVisible] = useState(false);
  /*
  const openCalendar = () => {
    setIsModalVisible(true);
  };
  const onPressModalClose = () => {
    setIsModalVisible(false);
  }
  */
  // Datetimepickermodal
  const onPressDate = () => {
    setMode('date');
    setVisible(true);
  };
  const onPressTime = () => {
    setMode('time');
    setVisible(true);
  };
  const onConfirm = (selectedDate) => {
    setVisible(false);
    //onChangeDate(selectedDate);
    setDate(selectedDate);
  };
  const onCancel = () => {
    setVisible(false);
  };
  return (
    <View style={styles.container}>
      <Pressable style={styles.button}>
        <Icon name="calendar" color={'black'} size={24} />
      </Pressable>

      <Pressable onPress={onPressDate}>
        <Text style={styles.datetext}>
          {format(new Date(date), 'PPP', {
            locale: ko,
          })}
        </Text>
      </Pressable>
      <View style={styles.separator}/>
      <Pressable onPress={onPressTime}>
        <Text style={styles.datetext}>{format(new Date(date), 'p', {locale: ko})}</Text>
      </Pressable>

      <DateTimePickerModal 
        isVisible={visible}
        mode={mode}
        onConfirm={onConfirm}
        onCancel={onCancel}
        date={date}
      />
      {/*
      <View style={{ marginBottom: 400}}>
        <Modal
          animationType="slide"
          visible={isModalVisible}
          transparent={true}
        >
          <View style={styles.modalView}>
            <Pressable
              onPress={onPressModalClose}>
              <Icon name="x" color={'black'} size={24} 
                style={styles.xbutton}
              />
            </Pressable>
            <View>
              <CalendarView/>
            </View>
          </View>
        </Modal>
      </View>
        */}
    </View>
  );
}

const styles = StyleSheet.create({
  separator: {
    width: 15,
  },
  datetext: {
    fontSize: 20,
  },
  container: {
    flexDirection: 'row',
    //backgroundColor: 'gray',
    marginTop: 150,
  },
  modalView: {
    marginTop: 160,
    margin: 30,
    backgroundColor: 'white',
    borderRadius:20,
    padding: 35,
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTextStyle: {
    color: '#17191c',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 50,
  },
});

export default CalendarButton;