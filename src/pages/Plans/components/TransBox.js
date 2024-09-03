import React from "react";
import {View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Pressable} from 'react-native';

import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const WINDOW_WIDTH = Dimensions.get('screen').width;
const BOX_WIDTH = WINDOW_WIDTH * 2/3;
const EMPTYPLACE = WINDOW_WIDTH - BOX_WIDTH;

const TransBox = () => {
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
          source={require('../assets/trans_dot.png')}
          />
          </View>    
            </View>


        <Pressable style={styles.Box}>
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
                    <View>
                    <Text>00-00-00</Text>
                    </View>
                    <View>
                        <Text>00:00</Text>
                    </View>
                </View>
                <View style={styles.textline_3}>
                    <Text>memo</Text>
                </View>
            </View>
            <View style={styles.image}>
            </View>
        </Pressable>
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
        height: 100 + 40,
        backgroundColor: '#FFE99C',
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
        height: 100,
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
        flexDirection: 'row',
        // backgroundColor: 'green',
    },
    textline_3: {

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

export default TransBox;