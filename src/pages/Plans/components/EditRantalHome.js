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

import { formatDate } from '../util/FormatDate';
import { getFieldFromDoc } from '../util/getFieldFromDoc';
import { formatDateForSorting } from '../util/formatDateForSorting';

const EditRantalHome = ({docId, placeData, changePlaceSelector, box_type, box_type_en, edit, dd_date, dd_time, dataId}) => {
    const [plan, setPlan] = useState([]);

    moment.locale('ko');
    const day = moment().format('L');
    const [date, setDate] = useState(formatDate(day));
    
    const t = moment().format('LT');
    const [time, setTime] = useState(t);

    const [checkInDate, setCheckInDate] = useState(formatDate(day) || dd_date);
    const [checkInTime, setCheckInTime] = useState(t);
    const [checkOutDate, setCheckOutDate] = useState(formatDate(day) );
    const [checkOutTime, setCheckOutTime] = useState(t);

    const [isModalVisible, setModalVisible] = useState(false);
    const [isCanlendarVisible_checkin, setCanlendarVisible_checkin] = useState(false);
    const [isCanlendarVisible_checkout, setCanlendarVisible_checkout] = useState(false);

    const [isCanlendarVisible, setCanlendarVisible] = useState(false);
    const [isTimePickerVisible, setTimePickerVisible] = useState(false);
    const [currentSelection, setCurrentSelection] = useState(null);

    // const [isTimePickerVisible, setTimePickerVisible] = useState(false);

    const [Type, setType] = useState(2);
    const handleTypeChange = (type) => {
        setType(type);
    }

    const navigation = useNavigation();

    // console.log('edit:', docId);

    // console.log(moment.locale());

    const onInsert = async () => {
        const date_sorting_check_in = formatDateForSorting(checkInDate, checkInTime);
        const date_sorting_check_out = formatDateForSorting(checkOutDate, checkOutTime);
        try {
            // Check-in plan
            const nextIdCheckIn = plan.length > 0 ? Math.max(...plan.map(p => p.pid)) + 1 : 1;
            const checkInPlan = {
                pid: nextIdCheckIn.toString(),
                userId: 0,
                type: 'rantalHome',
                data: placeData,
                placeName: placeData.data.structured_formatting.main_text,
                address: placeData.data.description,
                lat: placeData.details.geometry.location.lat,
                lng: placeData.details.geometry.location.lng,
                d_date: checkInDate,
                d_time: checkInTime,
                date_sorting: date_sorting_check_in,
                timestamp: new Date(),
                checkInOrOut: 'check-in',
            };
    
            const checkInDocRef = await firestore()
                .collection('plans')
                .doc(docId)
                .collection('planDetails')
                .add(checkInPlan);
            
            await firestore()
                .collection('plans')
                .doc(docId)
                .collection('planDetails')
                .doc(checkInDocRef.id)
                .update({ DataId: checkInDocRef.id });
    
            console.log("Inserted check-in plan: " + checkInDocRef.id);
    
            // Check-out plan
            const nextIdCheckOut = nextIdCheckIn + 1;
            const checkOutPlan = {
                pid: nextIdCheckOut.toString(),
                userId: 0,
                type: 'rantalHome',
                data: placeData,
                placeName: placeData.data.structured_formatting.main_text,
                address: placeData.data.description,
                lat: placeData.details.geometry.location.lat,
                lng: placeData.details.geometry.location.lng,
                d_date: checkOutDate,
                d_time: checkOutTime,
                date_sorting: date_sorting_check_out,
                timestamp: new Date(),
                checkInOrOut: 'check-out',
            };
    
            const checkOutDocRef = await firestore()
                .collection('plans')
                .doc(docId)
                .collection('planDetails')
                .add(checkOutPlan);
            
            await firestore()
                .collection('plans')
                .doc(docId)
                .collection('planDetails')
                .doc(checkOutDocRef.id)
                .update({ DataId: checkOutDocRef.id });
    
            console.log("Inserted check-out plan: " + checkOutDocRef.id);
        } catch (error) {
            console.error("Error adding check-in/check-out plan: " + error);
        }
    };
    

    // const onInsert = async () => {
    //     try {
    //         console.log('inserting -> ', docId);
    //         const nextId = plan.length > 0 ? Math.max(...plan.map(p => p.pid)) + 1 : 1;
    //         const newPlan = {
    //         pid: nextId.toString(),
    //         userId: 0,
    //         type: 'rantalHome',
    //         data: placeData,
    //         placeName: placeData.data.structured_formatting.main_text,
    //         address: placeData.data.description,
    //         lat: placeData.details.geometry.location.lat,
    //         lng: placeData.details.geometry.location.lng,
    //         d_month: 1,
    //         d_day: 22,
    //         d_date: date,
    //         d_time: time,
    //         date: moment().format('l'),
    //         time: moment().format('LT'),
    //         timestamp: new Date(),
    //         };

    //         const docRef =  await firestore()
    //         .collection('plans')
    //         .doc(docId)
    //         .collection('planDetails')
    //         .add(newPlan);
            
    //         console.log("Inserted plan: " + docRef.id + "date: " + newPlan.timestamp + newPlan.date);

    //         // 문서 추가 후, 문서 ID를 해당 데이터에 추가
    //         await firestore()
    //         .collection('plans')
    //         .doc(docId)
    //         .collection('planDetails')
    //         .doc(docRef.id) // 문서 ID 참조
    //         .update({ DataId: docRef.id }); // ID를 문서 데이터에 업데이트

    //         console.log("Document ID added to the data: ", docRef.id);
    //     } catch (error) {
    //     console.error("Error adding plan: " + error);
    //     }
    // };

    const onUpdate = async () => {
        const getCheckInOrOut = await getFieldFromDoc(docId, dataId, 'checkInOrOut');
        console.log('update-searching: ', getCheckInOrOut);

        let selectedDate = date;

        if (getCheckInOrOut === 'check-in') {
            console.log('update-check-in', checkInDate);
            selectedDate = checkInDate;
        }
        else if (getCheckInOrOut === 'check-out') {
            console.log('update-check-out', checkOutDate);
            selectedDate = checkOutDate;
        }
        else {
            console.log('can not found check in or out');
        }
        try {
            console.log('updating ', dataId)
            if (dataId) {
                console.log('updating -> ', docId);
                const updatedPlan = {
                    placeName: placeData.data.structured_formatting.main_text,
                    data: placeData,
                    type: box_type_en[Type],
                    address: placeData.data.description,
                    lat: placeData.details.geometry.location.lat,
                    lng: placeData.details.geometry.location.lng,
                    d_date: selectedDate,
                    d_time: time,
                    timestamp: new Date(),
                };

                await firestore()
                    .collection('plans')
                    .doc(docId)
                    .collection('planDetails')
                    .doc(dataId)
                    .update(updatedPlan);
                
                console.log("Updated plan: " + dataId);
            } else {
                console.error("Error: Plan ID is not set");
            }
        } catch (error) {
            console.error("Error updating plan: " + error);
        }
    };


    const handleSubmit = () => {
        if (edit) {
            onUpdate();  // 수정 모드일 때 업데이트
        } else {
            onInsert();  // 추가 모드일 때 새로 생성
        }
        navigation.pop();
    }

    // const addPlan = () => {
    //     onInsert();
    //     navigation.pop();
    // }

    const setModalOpen = () => {
        setModalVisible(true);
    }
    const setModalClose = () => {
        setModalVisible(false);
    }

    const CalenderOpen_checkin = () => {
        setCanlendarVisible_checkin(true);
    }

    const CalenderOpen_checkout = () => {
        setCanlendarVisible_checkout(true);
    }

    const CalenderClose = () => {
        setCanlendarVisible(false);
    }

    const handleDateChange = (date) => {
        console.log('handleDateChange: ', date);
        const [year, month, day] = date.split('-');
        // setDate(`${year.slice(-2)}-${month}-${day}`);
        const formattedDate = `${year.slice(-2)}-${month}-${day}`;
        console.log('handleDateChanged: ', formattedDate);
        
        if (currentSelection === 'checkin') {
            setCheckInDate(formattedDate);
        } else if (currentSelection === 'checkout') {
            setCheckOutDate(formattedDate);
        }

        setCanlendarVisible(false);
    }

    const openCalendar = (selection) => {
        setCurrentSelection(selection);
        setCanlendarVisible(true);
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

    const handleCheckInDateChange = (date) => {
    console.log('handleCheckInDateChange: ', date);
    const [year, month, day] = date.split('-');
    setCheckInDate(`${year.slice(-2)}-${month}-${day}`);
    };

    const handleCheckOutDateChange = (date) => {
        console.log('handleCheckOutDateChange: ', date);
        const [year, month, day] = date.split('-');
        setCheckOutDate(`${year.slice(-2)}-${month}-${day}`);
    };

    const handleCheckInTimeChange = (time) => {
        setCheckInTime(time);
    };

    const handleCheckOutTimeChange = (time) => {
        setCheckOutTime(time);
    };


    return (
        <View style={styles.background}>
            <View style={styles.block}>
                <View style={styles.typeTextSection}>
                    <TouchableOpacity style={styles.typeBtn} onPress={setModalOpen}>
                        <Text style={styles.typeText}>숙소</Text>
                        <IconOcticons name="triangle-down" color="#616161" size={20}/>
                    </TouchableOpacity>
                    <TypePicker 
                    visible={isModalVisible} 
                    setModalClose={setModalClose} 
                    changePlaceSelector={changePlaceSelector} 
                    values={box_type} 
                    width={88} 
                    positon={0} 
                    setType={handleTypeChange}
                    />
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
                    <Text numberOfLines={1} ellipsizeMode='middle' style={styles.PlaceNameText}>{placeData.data.structured_formatting.main_text}</Text>
                </View>
                <View style={styles.address}>
                    <Text style={styles.addressText}>{placeData.data.description}</Text>
                </View>
                <View>
                    <Text></Text>
                </View>
            </View>
            <View style={styles.dateBlock}>
                <View style={{flexDirection: 'row', }}>
                    {/* <Text style={[styles.dateText, {width: 56, }]}>체크인: </Text> */}
                    <TouchableOpacity style={styles.dateline} onPress={()=>openCalendar('checkin')}>
                        <IconMaterialCommunityIcons name="calendar-month" size={20} color="#616161"/>
                        {/* <Text style={styles.dateText}>00-00-00</Text> */}
                        <Text style={styles.dateText}>{checkInDate}</Text>
                        {/* <IconFeather name="edit-2" size={14} color="#616161"/> */}
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.dateline, {marginLeft: 8,}]} onPress={()=>TimePickerOpen()}>
                        <IconMaterialCommunityIcons name="clock-outline" size={20} color="#616161"/>
                        {/* <Text style={styles.dateText}>00:00</Text> */}
                        <Text style={styles.dateText}>{checkInTime}</Text>
                        <IconFeather name="edit-2" size={14} color="#616161"/>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', }}>
                    <TouchableOpacity style={styles.dateline} onPress={()=>openCalendar('checkout')}>
                        {/* <Text style={[styles.dateText, {width: 56,}]}>체크아웃: </Text> */}
                        <IconMaterialCommunityIcons name="calendar-month" size={20} color="#616161"/>
                        {/* <Text style={styles.dateText}>00-00-00</Text> */}
                        <Text style={styles.dateText}>{checkOutDate}</Text>
                        {/* <IconFeather name="edit-2" size={14} color="#616161"/> */}
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.dateline, {marginLeft: 8,}]} onPress={()=>TimePickerOpen()}>
                        <IconMaterialCommunityIcons name="clock-outline" size={20} color="#616161"/>
                        {/* <Text style={styles.dateText}>00:00</Text> */}
                        <Text style={styles.dateText}>{checkOutTime}</Text>
                        <IconFeather name="edit-2" size={14} color="#616161"/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.btnSection}>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => {navigation.pop()}}>
                <Text style={styles.cancelText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addBtn} onPress={handleSubmit}>
                <Text style={styles.addText}>추가</Text>
            </TouchableOpacity>
            </View>
            </View>
            <Modal visible={isCanlendarVisible} transparent={true}>
                <Pressable style={styles.modalBg} onPress={()=>setCanlendarVisible(false)}>
                    <Calendar handleDateChange={handleDateChange}/>
                </Pressable>
            </Modal>
            <Modal visible={isCanlendarVisible_checkout} transparent={true}>
                <Pressable style={styles.modalBg} onPress={()=>setCanlendarVisible_checkout(false)}>
                    <Calendar handleDateChange={handleCheckOutDateChange}/>
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
        fontSize: 14,
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

export default EditRantalHome;