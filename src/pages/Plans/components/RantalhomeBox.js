import React, { useState, useRef } from "react";
import {View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Pressable, Modal} from 'react-native';

import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import {useNavigation} from '@react-navigation/native';
import firestore, { deleteDoc } from "@react-native-firebase/firestore";

// import { onRemove } from '../util/OnRemove';

import Delete_Edit_Modal from "./Delete_Edit_modal";

const WINDOW_WIDTH = Dimensions.get('screen').width;
const BOX_WIDTH = WINDOW_WIDTH * 2/3;
const EMPTYPLACE = WINDOW_WIDTH - BOX_WIDTH;

const RantalBox = ({ docId, item, planId }) => {
    const navigation = useNavigation();

    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [Yposition, setYposition] = useState(0);

    const time_string = item.d_time;
    const time_split = time_string.split(' ')[1];

    const [scale, setScale] = useState(1);

    const modalRef = useRef();

    const increaseScale = () => {
        setScale(prevScale => prevScale + 0.1);
        console.log('scale: ', scale);
    };
    
    const decreaseScale = () => {
        setScale(prevScale => prevScale - 0.1);
    };

    const openModal = () => {
        modalRef.current?.measureInWindow((x, y, width, height, pageX, pageY) => {
            increaseScale();
            console.log('y: ', y);
            setYposition(y);
            setEditModalVisible(true);
        });
    }

    const closeModal = () => {
        decreaseScale();
        setEditModalVisible(false);
    }

    const onPress = () => {
        navigation.navigate('PlaceSearchScreen', {docId: docId, edit: true, type: item.type, data: item.data, dataId: item.DataId, date: item.d_date, time: item.d_time})
        decreaseScale();
        setEditModalVisible(false);
    }

    const onRemove = async() => {
        try {
            if (planId && item.DataId) {
                const doc = await firestore()
                    .collection('plans')
                    .doc(planId)
                    .collection('planDetails')
                    .doc(item.DataId);
                    deleteDoc(doc);
                console.log('Document deleted!');
            }
            else {
                console.log('No planId or dataId');
            }
        }catch(err) {
            console.log(err);
        }
    
    }

    return (
        <View style={styles.container}>
            <View style={styles.line_section}>
                <View style={styles.line}></View>
                <View>
                <View style={styles.time}>
                    <Text style={styles.time_string_text}>{time_split}</Text>
                </View>
            <Image
            style={styles.dot_image}
            source={require('../assets/rantal_dot.png')}
            />
            </View>
        </View>


        <Pressable ref={modalRef} style={[styles.Box, { transform: [{ scale }] }]} onPress={openModal}>
            <View style={styles.text}>
                <View style={styles.textline_1}>
                    <View style={styles.place_name_text_box}>
                        <Text numberOfLines={1} ellipsizeMode='middle' style={styles.place_name_text}>{item.placeName}</Text>
                    </View>
                    <View style={styles.date_box}>
                        {/* <Text>{item.d_date}</Text> */}
                    </View>
                </View>
                <View style={styles.textline_2}>
                    <Text>{item.address}</Text>
                </View>
                <View style={styles.textline_2}>
                    <Text>check-in: {item.d_date}</Text>
                </View>
                <View style={styles.textline_2}>
                    <Text>~check-out: {item.d_date}</Text>
                </View>
            </View>
            <View style={styles.image}>
            <MapView
                style={styles.image_map}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                //   latitude: 37.78825,
                //   longitude: -122.4324,
                latitude: item.lat,
                longitude: item.lng,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
                }}
            />
            </View>
        </Pressable>
        <Modal transparent={true} visible={isEditModalVisible}>
                <Pressable style={styles.modal_bg} onPress={closeModal}>
                    <Delete_Edit_Modal Yposition={Yposition} onPress={onPress} remove={onRemove}/>
                </Pressable>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        // backgroundColor: 'green',
        flexDirection: 'row',
        paddingBottom: 16,
        paddingTop: 16,
    },
    line_section: {
        width: EMPTYPLACE,
        alignItems: 'center',
    },
    time: {
        position: 'absolute',
        top: 12,
        left: -34,
    },
    line: {
        width: 10,
        height: 250 + 40,
        backgroundColor: '#60A3D3',
        position: 'absolute',
        top: 20,
        zIndex: 0,
    },
    dot_image: {
        width: 40,
        height: 40,
        zIndex: 1000,
    },
    Box: {
        backgroundColor: '#d9d9d9',
        width: BOX_WIDTH,
        height: 250,
        borderRadius: 15,
        padding: 10,
        right: 24,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    text: {
        // backgroundColor: 'yellow',
        margin: 8,
    },
    time_string_text: {
        color: 'white',
    },
    textline_1: {
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'space-between',
    },
    place_name_text_box: {
        width: 142,
        // backgroundColor: 'magenta',
        marginRight: 10,
    },
    place_name_text: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    date_box: {
        // backgroundColor: 'blue',
        left: 10,
    },
    date_text: {
        fontWeight: '100',
    },
    textline_2: {
        // backgroundColor: 'green',
        marginBottom: 4,
    },
    image: {
        alignItems: 'center',
        marginTop: 0,
        margin: 8,
        // backgroundColor: 'red',
        // position: 'absolute',
        // bottom: -50,
        // backgroundColor: 'blue',
        // position: 'absolute',
        // top: -50,
    },
    image_map: {
        width: BOX_WIDTH - 26,
        height: 112,
        borderRadius: 15,
        borderWidth: 0.2,
        borderColor: 'gray',
        // marginBottom: 10,
    }, 
    modal_bg: {
        width: '100%',
        height: '100%',
        zIndex: -1,
        // backgroundColor: 'red',
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
})

export default RantalBox;