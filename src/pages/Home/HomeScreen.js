// /**
//  * 매인 화면 (로그인 시, 가장 먼저 보이는 화면)
//  * 여행지 추천 목록  - 무한 스크롤. - flatlist 통해 구현.
//  * 
//  *
//  * @format
//  */

import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
  Button,
  ActivityIndicator,
  KeyboardAvoidingView,
  Pressable,
  Modal,
  ScrollView,
  Linking,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

import PlaceList from './components/PlaceList';
import Empty from '../../assets/Empty';
import Icon from 'react-native-vector-icons/Octicons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import OffModal from './components/BackButton';

import placeData from '../../data/placeData';
import placeJSON from '../../data/place.json';

// import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geolocation from 'react-native-geolocation-service';

import Map from './components/ViewMap';
import fetchPlace from './api/FetchPlaces';
import fetchPlaceDetails from './api/FetchPlaceDetails';

// 위치 권한 요청 함수
async function requestPermission() {
  try {
    if (Platform.OS === "ios") {
      return await Geolocation.requestAuthorization("always");
    }
  } catch (e) {
    console.log(e);
  }
}
function HomeScreen() {
// linking 링크 (임시 웹 주소)
const BUS_LINK = 'https://txbus.t-money.co.kr/main.do';
const TMONEYGO_LINK = 'https://apps.apple.com/kr/app/%ED%8B%B0%EB%A8%B8%EB%8B%88go-%EC%98%A8%EB%8B%A4%ED%83%9D%EC%8B%9C-%EA%B3%A0%EC%86%8D%EC%8B%9C%EC%99%B8-%EB%94%B0%EB%A6%89%EC%9D%B4-%ED%83%80%EC%8A%88-%ED%82%A5%EB%B3%B4%EB%93%9C/id1483433931';
const KORAIL_LINK = 'https://www.letskorail.com';

// 지도 검색 창 모달
const [isModalVisible, setIsModalVisible] = useState(false);
// 현재 위치 정보
const [location, setLocation] = useState(null);

const [places, setPlaces] = useState([]);
const [nextPageToken, setNextPageToken] = useState(null);
const [loading, setLoading] = useState(false);



useEffect(() => {
  requestPermission().then(result => {
    console.log({ result });
    if (result === "granted") {
      Geolocation.getCurrentPosition(
        pos => {
          console.log(pos);
          setLocation(pos.coords);
        },
        error => {
          console.log(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 3600,
          maximumAge: 3600,
        },
      );
    }
  });
}, []);

useEffect(() => {
  if (location) {
    loadPlaces(location, nextPageToken);
  }
}, [location]);

const loadPlaces = async (coords, pageToken = null) => {
  setLoading(true);
  const data = await fetchPlace(coords, pageToken);
  if (data) {
    const detailedPlaces = await Promise.all(data.results.map(async (place) => {
      const details = await fetchPlaceDetails(place.place_id);
      return { ...place, details };
    }));
    console.log('loadPlace: ', data);
    setPlaces(prevPlaces => [...prevPlaces, ...detailedPlaces]);
    setNextPageToken(data.next_page_token || null);
  }
  setLoading(false);
};

const onEndReached = () => {
  if (nextPageToken && !loading) {
    loadPlaces(location, nextPageToken);
  }
};


const onPressModalOpen = () => {
  console.log('enlarge a map_search');
  setIsModalVisible(true);
};

const onPressModalClose = () => {
  console.log('closed');
  setIsModalVisible(false);
};

  const navigation = useNavigation();

  // placeDetails로 데이터와 함께 화면 이동
  const passDataToDetails = (data, details) => {
    console.log('search screen -> details screen');
    console.log('data: ', data);
    console.log('data details: ', details);
    navigation.navigate('PlaceDetails',{
      name: data.structured_formatting.main_text, 
      address: data.structured_formatting.secondary_text,
      lat: details.geometry.location.lat, 
      lng: details.geometry.location.lng
    });
  };

  // useEffect(() => {
  //   if (places.length == 0) {
  //     loadPlaces(location, nextPageToken);
  //   }

  // },[places])


  return (
  
    <SafeAreaProvider>
      <SafeAreaView style={style.block}>
        <KeyboardAvoidingView style={style.avoid}>
          {/* 가로 스크롤 - 지도 검색, 버스 예메 등 화면 상단의 버튼 탭 */}
      <ScrollView style={style.topBlock} horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={style.topMenuColumn}>
      <Pressable onPress={onPressModalOpen} style={style.menuButton}>
          <Icon name='search' size={48} color='#b0d800'/>
        <Text style={{color:'#b0d800'}}>Search</Text>
      </Pressable>
        </View>
        <View style={style.topMenuColumn}>
        <Pressable style={style.menuButton} onPress={()=>Linking.openURL(BUS_LINK)} >
          <Icon2 name='directions-bus' size={48} color='#ff704c'/>
        <Text style={{color:'#ff704c'}}>Bus</Text>
      </Pressable>
        </View>
        <View style={style.topMenuColumn}>
        <Pressable style={style.menuButton} onPress={()=>Linking.openURL(KORAIL_LINK)}>
          <Icon2 name='train' size={48} color='#5da3f8'/>
        <Text style={{color:'#5da3f8'}}>Korail</Text>
      </Pressable>
        </View>
        <View style={style.topMenuColumn}>
        <Pressable style={style.menuButton} >
        <Text>?</Text>
      </Pressable>
        </View>
      </ScrollView>
      {/* ----------------------------------------------------------------가로 스크롤  */}
       {/* 지도에서 장소 검색하기 (모달 창으로 구현) -./components/ViewMap.js */}
       <Modal visible={isModalVisible} animationType='slide'>
       <Map modalOff={onPressModalClose} passDataToDetails={passDataToDetails} locationInput={location}/>
       <OffModal onPress={onPressModalClose}/>
       </Modal>
        {/* ----------------------------------------------------------------지도에서 장소 검색하기 모달 화면 */}
        
        {/* 장소 정보 리스트 */}
          {places.length === 0 ? (<View><Text>빈 화면</Text></View>) : <PlaceList place={places} onEndReached={onEndReached}/>}
          {/* ---------------------------------------------------------------- */}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const style = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
  },
  avoid: {
    flex: 1,
  },
  // box: {
  //   flex: 1,
  //   position: 'relative',
  //   // top: 100,
  //   // width: '100%',
  //   // height: 200,
  //   // flex: 1,
  //   // backgroundColor: 'rgba(0,0,0,0.5)',
  //   backgroundColor: 'blue',
  // },
  topBlock: {
    // flex: 1/6,
    height: 112,
    // height: 'auto',
    // backgroundColor: 'blue',
    flexDirection: 'row',
  },
  topMenuColumn: {
    width: 100,
    height: 100,
    // backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButton: {
      width: 80,
      height: 80,
      borderRadius: 20,
      // backgroundColor: 'green',
      justifyContent: 'center',
      alignItems: 'center',
  }
});

export default HomeScreen;
