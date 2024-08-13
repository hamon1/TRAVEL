import React from 'react';

import {View, Button, StyleSheet, Text, TouchableOpacity} from 'react-native';

import Section from './SelectSection';

// "tourist_attraction": "관광 명소", "cafe": "카페", "lodging": "숙박", "restaurant": "식당", "campground": "캠핑장",

const SelectTypeButton = ({TypeNow, sections, changeType}) => {
    const sectionValues = Object.keys(sections);
    return (
        <View style={styles.container}>
            <Text>{TypeNow}</Text>
            {/* <TouchableOpacity style={styles.select_tourist_attraction}>
                <Text>관광 명소</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.select_cafe}>
                <Text>카페</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.select_lodging}>
                <Text>숙박</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.select_restaurant}>
                <Text>식당</Text>   
            </TouchableOpacity>
            <TouchableOpacity style={styles.select_campground}>
                <Text>캠핑장</Text>
            </TouchableOpacity> */}
            {sectionValues.map((key, index) => {
                console.log(key, '/ ', sections[key]);
                return(
                <Section key={index} section={sections[key]} changeType={changeType} value={key}/>
            )
            })}
        </View>
    )   
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
    },
    select_button: {

    },
    // select_tourist_attraction: {

    // },
    // select_cafe: {

    // },
    // select_lodging: {

    // },
    // select_restaurant: {

    // },
    // select_campground: {

    // },
});

export default SelectTypeButton;