import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal, Pressable, TextInput} from 'react-native';
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
import { formatDateForSorting } from '../util/formatDateForSorting';

import { updateNote } from '../util/updateNote';

import { getUserAuth } from '../../../utils/getUserAuth';
import { update } from 'lodash';

const EditTrans = ({docId, placeData, changePlaceSelector, box_type, box_type_en, edit, dd_date, dd_time, dataId}) => {
    const [plan, setPlan] = useState([]);

    moment.locale('ko');
    const day = moment().format('L');
    const [date, setDate] = useState(formatDate(day));

    const t = moment().format('LT');
    const [time, setTime] = useState(t);

    const [note, setNote] = useState(null);

    const [isModalVisible, setModalVisible] = useState(false);
    const [isTransPickerVisible, setTransPickerVisible] = useState(false);
    const [isCanlendarVisible, setCanlendarVisible] = useState(false);
    const [isTimePickerVisible, setTimePickerVisible] = useState(false);

    const [Type, setType] = useState(1);
    const handleTypeChange = (type) => {
        setType(type);
    }

    const navigation = useNavigation();
    const userId = getUserAuth();

    console.log('edit:', docId);

    // console.log(moment.locale());

    const onInsert = async () => {
        const date_sorting = formatDateForSorting(date, time);
        try {
            console.log('inserting -> ', docId);
            const nextId = plan.length > 0 ? Math.max(...plan.map(p => p.pid)) + 1 : 1;
            const newPlan = {
            pid: nextId.toString(),
            userId: 0,
            type: 'transportation',
            trans: transportation_type[trans_idx],
            placeName: transportation_type[trans_idx],
            // address: placeData.data.description,
            // lat: placeData.details.geometry.location.lat,
            // lng: placeData.details.geometry.location.lng,
            // d_month: 1,
            // d_day: 22,
            boarding_date: '00-00-00',
            boarding_time: '00:00',
            memo: '.',
            d_date: date,
            d_time: time,
            date_sorting: date_sorting,
            date: moment().format('l'),
            time: moment().format('LT'),
            timestamp: new Date(),
            };

            const docRef =  await firestore()
            .collection('users')
            .doc(userId)
            .collection('plans')
            .doc(docId)
            .collection('planDetails')
            .add(newPlan);
            
            console.log("Inserted plan: " + docRef.id + "date: " + newPlan.timestamp + newPlan.date);

            // 문서 추가 후, 문서 ID를 해당 데이터에 추가
            await firestore()
            .collection('users')
            .doc(userId)
            .collection('plans')
            .doc(docId)
            .collection('planDetails')
            .doc(docRef.id) // 문서 ID 참조
            .update({ DataId: docRef.id }); // ID를 문서 데이터에 업데이트

            updateNote(userId, docId, docRef.id, note); // update note
            console.log("Document ID added to the data: ", docRef.id);
        } catch (error) {
        console.error("Error adding plan: " + error);
        }
    };

    const onUpdate = async () => {
        const date_sorting = formatDateForSorting(date, time);

        try {
            console.log('updating ', dataId)
            if (dataId) {
                console.log('updating -> ', docId);
                const updatedPlan = {
                    // placeName: placeData.data.structured_formatting.main_text,
                    // data: placeData,
                    trans: transportation_type[trans_idx],
                    placeName: transportation_type[trans_idx],
                    type: box_type_en[Type],
                    // address: placeData.data.description,
                    // lat: placeData.details.geometry.location.lat,
                    // lng: placeData.details.geometry.location.lng,
                    d_date: date,
                    d_time: time,
                    timestamp: new Date(),
                };

                await firestore()
                    .collection('users')
                    .doc(userId)
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

    const CalenderOpen = () => {
        setCanlendarVisible(true);
    }
    const CalenderClose = () => {
        setCanlendarVisible(false);
    }

    const handleDateChange = (date) => {
        console.log('handleDateChange: ', date);
        const [year, month, day] = date.split('-');

        setDate(`${year.slice(-2)}-${month}-${day}`);
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

    const [transportation_type, setTransType] = useState([
        '버스', '지하철', '기차', '비행기', '도보', '자전거', '자가용'
    ]);

    const [trans_idx, setTransIndx] = useState(0);

    const changeTransIdx = (idx) => {
        if (idx >= transportation_type.length) return;
        setTransIndx(idx);
    }

    useEffect(() => {
        console.log('transportation note: ', note);

        // console.log('dataId: ', dataId);
        // updateNote(userId, docId, dataId, note);

    }, [note])

    return (
        <View style={styles.background}>
            <View style={styles.block}>
                {/* <View style={styles.typeTextSection}>
                    <TouchableOpacity style={styles.typeBtn} onPress={setModalOpen}>
                        <Text style={styles.typeText}>이동수단</Text>
                        <IconOcticons name="triangle-down" color="#616161" size={20}/>
                    </TouchableOpacity>
                    <TypePicker visible={isModalVisible} setModalClose={setModalClose} changePlaceSelector={changePlaceSelector} values={box_type} width={88} positon={0}/>
                </View> */}
                <TypePickView picker_name={'이동수단'} modal_open={setModalOpen} modal_close={setModalClose} modal_visible={isModalVisible} changePlaceSelector={changePlaceSelector} width={88} values={box_type} position={0}/>
                <TypePickView picker_name={transportation_type[trans_idx]} modal_open={()=>setTransPickerVisible(true)} modal_close={()=>setTransPickerVisible(false)} modal_visible={isTransPickerVisible} changePlaceSelector={changeTransIdx} width={80} values={transportation_type} position={20} setType={handleTypeChange}/>
                {/* <MapView
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
                /> */} 
                {/* <View style={styles.typeTextSection}>
                    <TouchableOpacity style={styles.typeBtn} onPress={()=>setTransPickerVisible(true)}>
                        <Text style={styles.typeText}>이동수단</Text>
                        <IconOcticons name="triangle-down" color="#616161" size={20}/>
                    </TouchableOpacity>
                    <TypePicker visible={isTransPickerVisible} setModalClose={()=>setTransPickerVisible(false)} changePlaceSelector={changePlaceSelector}/>
                </View> */}
                <View style={styles.textBlock}>
                    {/* <View style={styles.placeName}> */}
                        {/* <Text style={styles.PlaceNameText}>{placeData.data.structured_formatting.main_text}</Text> */}
                        {/* <Text style={styles.PlaceNameText}>글자</Text>
                    </View> */}
                {/* <View style={styles.address}> */}
                    {/* <Text style={styles.addressText}>{placeData.data.description}</Text> */}
                    {/* <Text style={styles.PlaceNameText}>글자</Text>
                </View> */}
                <View  style={styles.textInputBox}>
                    <View style={styles.memoBox}>
                        <Text style={{color: 'gray', marginRight: 4, }}>메모</Text>
                        <IconMaterialCommunityIcons name='pencil-outline' color='gray' size={14}/>
                    </View>
                    <TextInput
                        placeholder='메모를 입력하세요.'
                        multiline={true}
                        value={note}
                        onChangeText={(text)=>setNote(text)}
                    >

                    </TextInput>
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

// 중복 코드 제거를 위한 코드
const TypePickView = ({picker_name, modal_open, modal_close, modal_visible, changePlaceSelector, width, values, position}) => {
    console.log(values);
    return (
        <View style={styles.typeTextSection}>
            <TouchableOpacity style={[styles.typeBtn, {width: width}]} onPress={modal_open}>
                <Text style={styles.typeText}>{picker_name}</Text>
                <IconOcticons name="triangle-down" color="#616161" size={20}/>
            </TouchableOpacity>
            <TypePicker visible={modal_visible} setModalClose={modal_close} changePlaceSelector={changePlaceSelector} values={values} width={width} positon={position}/>
        </View>
    );
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
        // width: 60,
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
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
        top: 12,
        // backgroundColor: 'green',
        height: 320,
    },
    textInputBox: {

    },
    memoBox: {
        flexDirection: 'row',
        // backgroundColor: 'yellow',
        alignItems: 'center',
        marginBottom: 4,
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

export default EditTrans;