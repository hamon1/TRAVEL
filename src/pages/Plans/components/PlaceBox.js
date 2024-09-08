import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Pressable, Dimensions, ActivityIndicator } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
// import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';


const WINDOW_WIDTH = Dimensions.get('screen').width;
const BOX_WIDTH = WINDOW_WIDTH * 2 / 3;
const EMPTYPLACE = WINDOW_WIDTH - BOX_WIDTH;

const PlaceBox = ({ docId, item }) => {
    console.log('placebox: ', item.data);
    console.log('placebox id: ', item.DataId);
    const navigation = useNavigation();

    const time_string = item.d_time;
    const time_split = time_string.split(' ')[1];

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
                        source={require('../assets/place_dot.png')}
                    />
                </View>
            </View>

            <Pressable style={styles.Box} onPress={()=>navigation.navigate('PlaceSearchScreen', {docId: docId, edit: true, type: item.type, data: item.data, dataId: item.DataId, date: item.d_date, time: item.d_time})}>
                <View style={styles.text}>
                    <View style={styles.textline_1}>
                        <View style={styles.place_name_text_box}>
                            {/* <Text style={styles.place_name_text}>{plan[0].placeName}</Text> */}
                            <Text numberOfLines={1} ellipsizeMode='middle' style={styles.place_name_text}>{item.placeName}</Text>
                        </View>
                        <View style={styles.date_box}>
                            <Text>{item.d_date}</Text>
                        </View>
                    </View>
                    <View style={styles.textline_2}>
                        <Text>{item.address}</Text>
                    </View>
                </View>
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
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        paddingBottom: 16,
        paddingTop: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        height: 240,
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
        height: 200 + 16,
        borderRadius: 15,
        padding: 10,
        right: 24,
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

        marginRight: 10,
    },
    place_name_text_box: {
        width: 142,
        // marginRight: 10,
    },
    place_name_text: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    date_box: {
        left: 10,
    },
    date_text: {
        fontWeight: '100',
    },
    textline_2: {},
    image: {
        alignItems: 'center',
        margin: 8,
    },
    image_map: {
        
        width: BOX_WIDTH - 26,
        height: 112,
        borderRadius: 15,
        borderWidth: 0.2,
        borderColor: 'gray',
    }
});

export default PlaceBox;
