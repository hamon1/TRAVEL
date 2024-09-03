import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import EditPlace from '../components/EditPlace';
import EditTrans from '../components/EditTrans';

import Icon from 'react-native-vector-icons/MaterialIcons';

const GOOGLE_PLACES_API_KEY = 'AIzaSyDRdIybBpN0aO6gJal9skDd0VG6KMrgqJk';

const PlaceSearchScreen = ({route}) => {
    console.log('search:', route.params.docId);
    const [selectedComponent, setSelectedComponent] = useState(); // 초기 선택된 컴포넌트

    const [placeData, setPlaceData] = useState(null);

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'A':
        return (
        <EditPlace 
        docId={route.params.docId} 
        placeData={placeData}
        changePlaceSelector={changePlaceSelector}
        />);
      case 'B':
        return <EditTrans 
        changePlaceSelector={changePlaceSelector}
        />;
    //   case 'C':
    //     return <ComponentC />;
    //   case 'D':
    //     return <ComponentD />;
      default:
        return <View style={styles.empty}></View>;
    }
  };

    const changePlaceSelector = (type) => {
        setSelectedComponent(type);
    };

    const handlePlaceSelect = (data, details) => {
    // data와 details를 합쳐서 placeData에 저장
    const combinedPlaceData = { data, details };
    setPlaceData(combinedPlaceData);
    console.log('Selected Place:', placeData);
    // const type = 
    setSelectedComponent('A');
};

    return (
        <View style={styles.background}>
            {renderComponent()}
            {/* <EditPlace/> */}
            {/* <EditTrans/> */}
            {/* <View style={[styles.searchBlock, {height: 80}]}> */}

            <GooglePlacesAutocomplete
        placeholder="장소를 검색하세요."
        query={{
            key: GOOGLE_PLACES_API_KEY,
            language: 'ko', // 언어 설정
        }}
        onPress={(data, details = null) => {
            handlePlaceSelect(data, details);
        }}
        fetchDetails={true}
        styles={{
            container: {
                
            },
            textInputContainer: {
                // position: 'absolute',
                top: -604,
                // backgroundColor: 'yellow',
                marginLeft: 32,
                marginRight: 32,
                marginTop: 12,
                marginBottom: 12,
                // width: '100%',
                borderBottomWidth: 1,
                borderColor: 'white',
            },
            textInput: {
                top: 8,
                marginLeft: 24,
                height: 40,
                color: 'white',
                fontSize: 16,
                backgroundColor: 'rgba(0, 0, 0, 0)',
            },
            listView: {
                top: -524,
                position: 'absolute',
            },
            row: {
                // backgroundColor: '#616161',
                height: 100,
                borderBottomWidth: 2,
            },
            separator: {
                height: 0.5,
                // backgroundColor: '#c8c7cc',
                // backgroundColor: 'yellow',
              },
            //   predefinedPlacesDescription: {
                //     color: '#1faadb',
                //   },
            }}
            enablePoweredByContainer={false}
            />
        <Icon name="search" size={26} color="white" style={styles.icon}/>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#616161',
        flex: 1,
    },
    searchBlock: {
        position: 'absolute',
        backgroundColor: 'yellow',
        width: '100%',
        height: 360,
    },
    modalBackground: {
        // flex: 1,
        position: 'absolute',
        width: '100%',
        height: 500,
        // top: -100,
        // backgroundColor: 'yellow',
    },
    icon: {
        position: 'absolute',
        top: 28,
        left: 36,
    },
    empty: {
        width: '100%',
        height: '80%',
    },
})

export default PlaceSearchScreen;