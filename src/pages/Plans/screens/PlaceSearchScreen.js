import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import EditPlace from '../components/EditPlace';
import EditTrans from '../components/EditTrans';
import EditRantalHome from '../components/EditRantalHome';
import EditRastaurant from '../components/EditRastaurant';

import Icon from 'react-native-vector-icons/MaterialIcons';

const GOOGLE_PLACES_API_KEY = 'AIzaSyDRdIybBpN0aO6gJal9skDd0VG6KMrgqJk';

const PlaceSearchScreen = ({route}) => {
    console.log('search:', route.params.docId);
    const [selectedComponent, setSelectedComponent] = useState(); 


    const [placeData, setPlaceData] = useState(null);

    const [box_type, setBoxes] = useState([
        '관광지', '이동수단', '숙소', '식당/카페', '기타'
    ])

    const [box_type_en, setBoxes_en] = useState([
        'place', 'transportation', 'rantalHome', 'restaurant'
    ])

    const idxFromType = (type) => {
        switch (type) {
            case 'place':
                return 0;
            case 'transportation':
                return 1;
            case 'rantalHome':
                return 2;
            case 'restaurant':
                return 3;
            default:
                return 0;
        }
    }


    // const editComponent = () => {
    //         console.log('Edit: ', route.params.type);
    //         console.log('Edit data: ', route.params.data);
    //         console.log('Edit data id: ', route.params.dataId);
    //         switch (route.params.type) {
    //             case 'place':
    //                 return <EditPlace 
    //                 docId={route.params.docId} 
    //                 placeData={placeData || route.params.data}  // placeData가 있으면 그걸 사용, 없으면 기본 데이터를 사용
    //                 changePlaceSelector={changePlaceSelector}
    //                 box_type={box_type}
    //                 edit={true}
    //                 dd_datedate={route.params.date}
    //                 dd_time={route.params.time}
    //                 dataId={route.params.dataId}
    //                 />;
    //             case 'transportation':
    //                 return <EditTrans 
    //                 docId={route.params.docId} 
    //                 // placeData={placeData || route.params.data}
    //                 changePlaceSelector={changePlaceSelector}
    //                 box_type={box_type}
    //                 edit={true}
    //                 dd_date={route.params.date}
    //                 dd_time={route.params.time}
    //                 dataId={route.params.dataId}
    //                 />;
    //             case 'rantalHome':
    //                 return <EditRantalHome 
    //                 docId={route.params.docId} 
    //                 placeData={placeData || route.params.data}
    //                 changePlaceSelector={changePlaceSelector}
    //                 box_type={box_type}
    //                 edit={true}
    //                 dd_date={route.params.date}
    //                 dd_time={route.params.time}
    //                 dataId={route.params.dataId}
    //                 />;
    //             case 'restaurant':
    //                 return <EditRastaurant 
    //                 docId={route.params.docId} 
    //                 placeData={placeData || route.params.data}
    //                 changePlaceSelector={changePlaceSelector}
    //                 box_type={box_type}
    //                 edit={true}
    //                 dd_date={route.params.date}
    //                 dd_time={route.params.time}
    //                 dataId={route.params.dataId}
    //                 />;
    //             default: 
    //                 return setSelectedComponent(0);
    //         }
    // }
    useEffect(() => {
        if (route.params.edit) {
            setSelectedComponent(idxFromType(route.params.type));
        }
    }, [route.params.edit, route.params.type]);

    const renderComponent = (edit) => {
        console.log('renderComponent / ', edit);
        const commonProps = {
            docId: route.params.docId,
            placeData: placeData || route.params.data,  // 검색된 데이터 또는 기본 데이터를 전달
            changePlaceSelector: changePlaceSelector,
            box_type: box_type,
            box_type_en: box_type_en,
            edit: edit,
            dd_date: '' || route.params.date,
            dd_time: '' | route.params.time,
            dataId: '' || route.params.dataId,
        }

        switch (selectedComponent) {
        case 0:
            return <EditPlace 
            {...commonProps}
            />;
        case 1:
            return <EditTrans 
            {...commonProps}
            />;
        case 2:
            return <EditRantalHome 
            {...commonProps}
            />;
        case 3:
            return <EditRastaurant 
            {...commonProps}
            />;
        default:
            return <View style={styles.empty}></View>;
        }
    };

    const changePlaceSelector = (type) => {
        console.log('changePlaceSelector');
        setSelectedComponent(type);
    };

    const handlePlaceSelect = (data, details) => {
    // data와 details를 합쳐서 placeData에 저장
    const combinedPlaceData = { data, details };
    setPlaceData(combinedPlaceData);
    console.log('Selected Place:', placeData);
    // const type = 
    setSelectedComponent(0);
};

    return (
        <View style={styles.background}>
            {route.params.edit ? (
                // editComponent()
                renderComponent(true)
            ):
            (
                renderComponent(false)
            )
        }

            <GooglePlacesAutocomplete
            placeholder="장소를 검색하세요."
            // placeholderTextColor='white'
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