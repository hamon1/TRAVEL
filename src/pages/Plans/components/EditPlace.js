import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconOcticons from 'react-native-vector-icons/Octicons';
import IconFeather from 'react-native-vector-icons/Feather';

import firestore, {query, orderBy, doc, deleteDoc} from '@react-native-firebase/firestore';

import moment from 'moment';
import 'moment/locale/ko';
import 'moment/min/moment-with-locales';

import TypePicker from './typePicker/TypePicker';
import ScrollPicker from './ScrollPicker/ScrollPicker';
import Calendar from './Calendar';

const EditPlace = ({docId, placeData, changePlaceSelector}) => {
    const [plan, setPlan] = useState([]);

    moment.locale('ko');
    const day = moment().format('L');
    const [date, setDate] = useState(day);

    const t = moment().format('LT');
    const [time, setTime] = useState(t);

    const [isModalVisible, setModalVisible] = useState(false);
    const [isCanlendarVisible, setCanlendarVisible] = useState(false);
    const [isTimePickerVisible, setTimePickerVisible] = useState(false);

    const navigation = useNavigation();

    console.log('edit:', docId);

    console.log(moment.locale());

    const onInsert = async () => {
        try {
            console.log('inserting -> ', docId);
            const nextId = plan.length > 0 ? Math.max(...plan.map(p => p.pid)) + 1 : 1;
            const newPlan = {
            pid: nextId.toString(),
            userId: 0,
            type: 'place',
            placeName: placeData.data.structured_formatting.main_text,
            address: placeData.data.description,
            lat: placeData.details.geometry.location.lat,
            lng: placeData.details.geometry.location.lng,
            d_month: 1,
            d_day: 22,
            d_date: date,
            d_time: time,
            date: moment().format('l'),
            time: moment().format('LT'),
            timestamp: new Date(),
            };

            const docRef =  await firestore()
            .collection('plans')
            .doc(docId)
            .collection('planDetails')
            .add(newPlan);
            
            console.log("Inserted plan: " + docRef.id + "date: " + newPlan.timestamp + newPlan.date);
        } catch (error) {
        console.error("Error adding plan: " + error);
        }
    };

    const addPlan = () => {
        onInsert();
        navigation.pop();
    }

    const setModalOpen = () => {
        setModalVisible(true);
    }
    const setModalClose = () => {
        setModalVisible(false);
    }

    const CalenderOpen = () => {
        setCanlendarVisible(true);
    }
    const CalenderClose = () => {
        setCanlendarVisible(false);
    }

    const handleDateChange = (date) => {
        setDate(date);
    }

    const TimePickerOpen = () => {
        setTimePickerVisible(true);
    }
    const TimePickerClose = () => {
        setTimePickerVisible(false);
    }

    const handleTimeChange = (time) => {
        setTime(time);
    }

    return (
        <View style={styles.background}>
            <View style={styles.block}>
                <View style={styles.typeTextSection}>
                    <TouchableOpacity style={styles.typeBtn} onPress={setModalOpen}>
                        <Text style={styles.typeText}>place</Text>
                        <IconOcticons name="triangle-down" color="#616161" size={20}/>
                    </TouchableOpacity>
                    <TypePicker visible={isModalVisible} setModalClose={setModalClose} changePlaceSelector={changePlaceSelector}/>

                </View>
                <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                //   latitude: 37.78825,
                //   longitude: -122.4324,
                latitude: placeData.details.geometry.location.lat,
                longitude: placeData.details.geometry.location.lng,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
                }}
                />
            <View style={styles.textBlock}>
                <View style={styles.placeName}>
                    <Text style={styles.PlaceNameText}>{placeData.data.structured_formatting.main_text}</Text>
                </View>
                <View style={styles.address}>
                    <Text style={styles.addressText}>{placeData.data.description}</Text>
                </View>
                <View>
                    <Text></Text>
                </View>
            </View>
            <View style={styles.dateBlock}>
                <TouchableOpacity style={styles.dateline} onPress={()=>CalenderOpen()}>
                    <IconMaterialCommunityIcons name="calendar-month" size={20} color="#616161"/>
                    {/* <Text style={styles.dateText}>00-00-00</Text> */}
                    <Text style={styles.dateText}>{date}</Text>
                    <IconFeather name="edit-2" size={14} color="#616161"/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dateline} onPress={()=>TimePickerOpen()}>
                    <IconMaterialCommunityIcons name="clock-outline" size={20} color="#616161"/>
                    {/* <Text style={styles.dateText}>00:00</Text> */}
                    <Text style={styles.dateText}>{time}</Text>
                    <IconFeather name="edit-2" size={14} color="#616161"/>
                </TouchableOpacity>
            </View>
            <View style={styles.btnSection}>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => {navigation.pop()}}>
                <Text style={styles.cancelText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addBtn} onPress={addPlan}>
                <Text style={styles.addText}>추가</Text>
            </TouchableOpacity>
            </View>
            </View>
            <Modal visible={isCanlendarVisible} transparent={true}>
                <Pressable style={styles.modalBg} onPress={()=>setCanlendarVisible(false)}>
                    <Calendar handleDateChange={handleDateChange}/>
                </Pressable>
            </Modal>
            <Modal visible={isTimePickerVisible} transparent={true}>
            <View style={{width: '100%', height:'100%', justifyContent: 'center', alignItems: 'center',}}>
                <Pressable style={styles.modalBg} onPress={()=>setTimePickerVisible(false)}>
                </Pressable>
                    <View style={styles.background_time_picker} >
                        <ScrollPicker handleTimeChange={handleTimeChange} TimePickerClose={TimePickerClose}/>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        alignItems: 'center',
        top: 160,
        // backgroundColor: 'yellow',
    },
    text: {
        color: 'white',
    },
    block: {
        width: '90%',
        height: '80%',
        backgroundColor: '#E4E4E4',
        borderRadius: 15,
        // top: 200,
        top: -56,
        alignItems: 'center',
    },
    typeTextSection: {
        width: '90%',
        top: 8,
    },
    typeBtn: {
        // backgroundColor: 'yellow',
        width: 60,
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
    },
    typeText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#616161',
        marginRight: 6,
    },
    map: {
        width: '90%',
        height:'50%',
        // margin: 20,
        marginLeft: 20,
        marginBottom: 12,
        marginRight: 20,
        marginTop: 20,
        borderRadius: 15,
    },
    textBlock: {
        width: '90%',
    },
    placeName: {
        marginBottom: 10,
    },
    PlaceNameText: {
        fontSize: 16,
        fontWeight: '600',
        // color: '#616161',
    },
    address: {
        marginBottom: 10,
    },
    addressText: {

    },
    dateBlock: {
        position: 'absolute',
        left: 20,
        bottom: 20,
    },
    dateline: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    dateText: {
        fontWeight: '200',
        fontSize: 14,
        marginLeft: 8,
        marginRight: 8,
    },
    // time: {

    // },
    btnSection: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 16,
        right: 16,
    },
    cancelBtn: {
        margin: 4,
    },
    cancelText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#616161',
    },
    addBtn: {
        margin: 4,
        marginLeft: 20,
    },
    addText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#60A3D3',
    },
    modalBg: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    background_time_picker: {
        // position: 'absolute',
        width: 240,
        height: 200,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default EditPlace;