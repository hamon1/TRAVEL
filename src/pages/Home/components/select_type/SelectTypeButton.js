import React, {useState} from 'react';

import {View, Button, StyleSheet, Text, TouchableOpacity, Modal, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

import Section from './SelectSection';

import TypeTranslations from '../tag/tag_trans_data/translations.json';

const WINDOW_WIDTH = Dimensions.get('screen').width;
// "tourist_attraction": "관광 명소", "cafe": "카페", "lodging": "숙박", "restaurant": "식당", "campground": "캠핑장",

const SelectTypeButton = ({TypeNow, sections, changeType}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [iconState, setIconState] = useState(false);

    const onPressModalOpen = () => {
        console.log('type list open');
        setIsModalVisible(true);
        setIconState(true);
      };
      
      const onPressModalClose = () => {
        console.log('type list closed');
        setIsModalVisible(false);
        setIconState(false);
      };

      const type = TypeTranslations[TypeNow];
      

    const sectionValues = Object.keys(sections);
    return (
        <View style={styles.container}>
            <View style={styles.type_view_box}>
                <View style={styles.type_text_box}>
                    <Text style={styles.type_text}>{type}</Text>
                </View>
            <TouchableOpacity style={styles.select_button} onPress={onPressModalOpen}>
                {iconState ? (
                    // <Icon name="keyboard-arrow-down" size={36} color="orange" />
                    <Icon2 name="arrow-down" size={20} color="orange" />

                ) : 
                <Icon name="filter-list" size={20} color="orange" />
                }
                </TouchableOpacity>
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
            <Modal visible={isModalVisible} transparent={true} animationType='fade'>
                <TouchableOpacity  onPress={onPressModalClose} style={styles.modal_background}>
                    <View style={styles.type_select_modal} > 

            {sectionValues.map((key, index) => {
                // console.log(key, '/ ', sections[key]);
                return(
                <Section key={index} section={sections[key]} changeType={changeType} value={key} closeModal={onPressModalClose}/>
            )
            })}
                    </View>
                </TouchableOpacity>


            </Modal>

            </View>
        </View>
    )   
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'yellow',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    type_view_box: {
        backgroundColor: 'white',
        flexDirection: 'row',
        width: 100,
        height: 30,
        padding: 4,
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
        left: WINDOW_WIDTH - 118,
        margin: 4,
    },
    type_text_box: {
        width: 70,
        height: 30,
        // backgroundColor: 'magenta',
        justifyContent: 'center',
        alignItems: 'center',
    },
    type_text: {
        fontWeight: '400',
        fontSize: 14,
        color: 'orange',
        
    },
    select_button: {
        width: 28,
        height: 30,
        // backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal_background: {
        flex: 1,
        // backgroundColor: 'white',
        // backgroundColor: "rgb(0, 0, 0, 0.5)",
    },
    type_select_modal: {
        position: 'absolute',
        // flex: 1,
        // height: 150,
        // backgroundColor: 'red',
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.2,
        shadowRadius: 4,
        borderBottomEndRadius: 6,
        borderBottomStartRadius: 6,
        top: 223,
        left: WINDOW_WIDTH-100,
        zIndex: 10,
    },
});

export default SelectTypeButton;