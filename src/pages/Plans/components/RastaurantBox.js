import React from "react";
import {View, Text, Image, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';

import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const WINDOW_WIDTH = Dimensions.get('screen').width;
const BOX_WIDTH = WINDOW_WIDTH * 2/3;
const EMPTYPLACE = WINDOW_WIDTH - BOX_WIDTH;

const RastaurantBox = () => {
    return (
        <View style={styles.container}>
            <View style={styles.line_section}>
                <View style={styles.line}></View>
                <View>
                <View style={styles.time}>
                    <Text>00:00</Text>
                </View>
            <Image
          style={styles.dot_image}
          source={require('../assets/rastaurant_dot.png')}
          />
          </View>
            </View>


        <TouchableOpacity style={styles.Box}>
            <View style={styles.text}>
                <View style={styles.textline_1}>
                    <View style={styles.place_name_text_box}>
                        <Text style={styles.place_name_text}>강원대학교</Text>
                    </View>
                    <View style={styles.date_box}>
                        <Text>24-00-00</Text>
                    </View>
                </View>
                <View style={styles.textline_2}>
                    <Text>주소</Text>
                </View>
            </View>
            <View style={styles.image}>
            <MapView
              style={styles.image_map}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                  latitude: 37.78825,
                  longitude: -122.4324,
                  // latitude: route.params.lat,
                  // longitude: route.params.lng,
                  latitudeDelta: 0.9,
                  longitudeDelta: 0.9,
                }}
                />
            </View>
        </TouchableOpacity>
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
        height: 200,
        backgroundColor: '#FC7C35',
        position: 'absolute',
        top: -200 + 20,
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
        height: 200,
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
    textline_1: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    place_name_text_box: {
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
    },
    image: {
        alignItems: 'center',
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
        // marginBottom: 10,
    }

})

export default RastaurantBox;