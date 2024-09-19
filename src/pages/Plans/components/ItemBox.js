import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, StyleSheet, Pressable, Dimensions, Modal } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useNavigation } from '@react-navigation/native';
import firestore, { deleteDoc } from "@react-native-firebase/firestore";
import Delete_Edit_Modal from "./Delete_Edit_modal";

const WINDOW_WIDTH = Dimensions.get('screen').width;
const BOX_WIDTH = WINDOW_WIDTH * 2 / 3;
const EMPTYPLACE = WINDOW_WIDTH - BOX_WIDTH;

const PLACEBOX_HEIGHT = 216;
const TRANSBOX_HEIGHT = 100;
const RANTALHOMEBOX_HEIGHT = 216 + 16;
const RASTAURANTBOX_HEIGHT = 216;

const PLACEBOX_COLOR = '#FCD035';
const TRANSBOX_COLOR = '#56bf46';
const RANTALHOMEBOX_COLOR = '#60A3D3';
const RASTAURANTBOX_COLOR = '#FC7C35';

const ItemBox = ({ docId, item, planId }) => {
    console.log('itemBox: ', docId, item, planId);

    const [boxColor, setColor] = useState('#FCD035');
    const [boxHeight, setHeight] = useState(216);

    const navigation = useNavigation();
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [Yposition, setYposition] = useState(0);
    const [scale, setScale] = useState(1);
    const modalRef = useRef();

    const time_string = item.d_time;
    const time_split = time_string.split(' ')[1];

    const increaseScale = () => {
        setScale(prevScale => prevScale + 0.1);
    };
    
    const decreaseScale = () => {
        setScale(prevScale => prevScale - 0.1);
    };

    const openModal = () => {
        modalRef.current?.measureInWindow((x, y, width, height, pageX, pageY) => {
            increaseScale();
            setYposition(y);
            setEditModalVisible(true);
        });
    };

    const closeModal = () => {
        decreaseScale();
        setEditModalVisible(false);
    };

    const onPress = () => {
        navigation.navigate('PlaceSearchScreen', {
            docId: docId,
            edit: true,
            type: item.type,
            data: item.data,
            dataId: item.DataId,
            date: item.d_date,
            time: item.d_time,
        });
        decreaseScale();
        setEditModalVisible(false);
    };

    const onRemove = async () => {
        try {
            if (planId && item.DataId) {
                const doc = await firestore()
                    .collection('plans')
                    .doc(planId)
                    .collection('planDetails')
                    .doc(item.DataId);
                deleteDoc(doc);
                console.log('Document deleted!', doc);
            } else {
                console.log('No planId or dataId');
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        switch (item.type) {
            case 'rantalHome':
                setColor(RANTALHOMEBOX_COLOR);
                setHeight(RANTALHOMEBOX_HEIGHT);
                break;
            case 'place':
                setColor(PLACEBOX_COLOR);
                setHeight(PLACEBOX_HEIGHT);
                break;
            case 'transportation':
                setColor(TRANSBOX_COLOR);
                setHeight(TRANSBOX_HEIGHT);
                break;
            case 'restaurant':
                setColor(RASTAURANTBOX_COLOR);
                setHeight(RASTAURANTBOX_HEIGHT);
                break;
            default:
                setColor('#FCD035');
                setHeight(216);
        }
    }, [item.type]);

    // 아이템 종류에 따른 렌더링 처리
    const renderContentByType = () => {
        switch (item.type) {
            case 'rantalHome':
                if (item.checkInOrOut === "check-in") {
                    return (
                        <>
                            <View style={styles.textline_2}>
                                <Text>Check-in: {item.d_date}</Text>
                            </View>
                            <View style={styles.textline_2}>
                                <Text style={{color: '#616161'}}>Check-out: {item.d_date}</Text>
                            </View>
                        </>
                    );
                } else if (item.checkInOrOut === "check-out") {
                    return (
                        <>
                            <View style={styles.textline_2}>
                                <Text style={{color: '#616161'}}>Check-in: {item.d_date}</Text>
                            </View>
                            <View style={styles.textline_2}>
                                <Text>Check-out: {item.d_date}</Text>
                            </View>
                        </>
                    );
                }
            case 'place':
                return (
                    <View style={styles.textline_2}>
                        <Text>{item.address}</Text>
                    </View>
                );
            case 'transportation':
                return (
                    <View style={styles.textline_2}>
                    {/* <Text>{item.trans}</Text> */}
                </View>
            );
            case 'restaurant':
                return (
                <View style={styles.textline_2}>
                    <Text>{item.address}</Text>
                </View>
            );
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.line_section}>
                <View style={[styles.line, {backgroundColor: boxColor}]}></View>
                <View>
                    <View style={styles.time}>
                        <Text style={styles.time_string_text}>{time_split}</Text>
                    </View>
                    <Image style={styles.dot_image} source={require('../assets/trans_dot.png')} />
                </View>
            </View>

            <Pressable ref={modalRef} style={[styles.Box, { height: boxHeight, transform: [{ scale }] }]} onPress={openModal}>
                <View style={styles.text}>
                    <View style={styles.textline_1}>
                        <View style={styles.place_name_text_box}>
                            <Text numberOfLines={1} ellipsizeMode='middle' style={styles.place_name_text}>
                                {item.placeName}
                            </Text>
                        </View>
                        <View style={styles.date_box}>
                            <Text>{item.d_date}</Text>
                        </View>
                    </View>
                    {renderContentByType()}
                </View>
                {item.type === 'transportation' ? (
                    <></>
                ): (
                    <View style={styles.image}>
                        <MapView
                            style={styles.image_map}
                            provider={PROVIDER_GOOGLE}
                            initialRegion={{
                                latitude: item.lat,
                                longitude: item.lng,
                                latitudeDelta: 0.05,
                                longitudeDelta: 0.05,
                            }}
                        />
                    </View>
                )}
            </Pressable>
            <Modal transparent={true} visible={isEditModalVisible}>
                <Pressable style={styles.modal_bg} onPress={closeModal}>
                    <Delete_Edit_Modal Yposition={Yposition} onPress={onPress} remove={onRemove} />
                </Pressable>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
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
        height: 260,
        backgroundColor: '#FCD035',
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
        zIndex: 100,
    },
    text: {
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
    },
    place_name_text: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    date_box: {
        left: 10,
    },
    textline_2: {
        marginBottom: 4,
    },
    image: {
        alignItems: 'center',
        marginTop: 0,
        margin: 8,
    },
    image_map: {
        width: BOX_WIDTH - 26,
        height: 112,
        borderRadius: 15,
        borderWidth: 0.2,
        borderColor: 'gray',
    },
    modal_bg: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
});

export default ItemBox;
