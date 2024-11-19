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
// import Empty from '../../assets/Empty';
import Icon from 'react-native-vector-icons/Octicons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import OffModal from './components/BackButton';
import EmptyView from './components/EmptyView';

import placeData from '../../data/placeData';
import placeJSON from '../../data/place.json';

// import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geolocation from 'react-native-geolocation-service';

import Map from './components/ViewMap';
import fetchPlace from './api/FetchPlaces';
import fetchPlaceDetails from './api/FetchPlaceDetails';

import SelectTypeButton from './components/select_type/SelectTypeButton';
import TypeSelectList from './components/select_type/Type.json';
import { serializer } from '../../../metro.config';


import { GOOGLE_PLACES_API_KEY } from "@env";

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

// fetch data 타입 (기본 = '관광 명소')
const [searchType, setSearchType] = useState("tourist_attraction");

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
  setPlaces([]);
  if (location) {
    loadPlaces(location, null, searchType);
  }
}, [location, searchType]);

const loadPlaces = async (coords, pageToken = null) => {
  setLoading(true);
  const data = await fetchPlace(coords, pageToken, searchType);
  if (data) {
    const detailedPlaces = await Promise.all(data.results.map(async (place) => {
      const details = await fetchPlaceDetails(place.place_id);
      return { ...place, details };
    }));
    // console.log('loadPlace: ', data);
    setPlaces(prevPlaces => [...prevPlaces, ...detailedPlaces]);
    setNextPageToken(data.next_page_token || null);
  }
  setLoading(false);
};

// const loadPlaces = useCallback(async (coords, pageToken = null) => {
//   setLoading(true);
//   const data = await fetchPlace(coords, pageToken, searchType);
//   if (data) {
//     const detailedPlaces = await Promise.all(data.results.map(async (place) => {
//       const details = await fetchPlaceDetails(place.place_id);
//       return { ...place, details };
//     }));
//     console.log('loadPlace: ', data);
//     setPlaces(prevPlaces => [...prevPlaces, ...detailedPlaces]);
//     setNextPageToken(data.next_page_token || null);
//   }
//   setLoading(false);
// }, [searchType]); 

const onEndReached = () => {
  if (nextPageToken && !loading) {
    loadPlaces(location, nextPageToken, searchType);
  }
};

const onRefresh = () => {
  console.log('refresh data');
  setPlaces([]);
  if (location) {
    loadPlaces(location, null, searchType);
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
    // console.log('data: ', data);
    // console.log('data details: ', details.photos[0]);
    const photoUrl = details.photos
          ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${details.photos[0].photo_reference}&key=${GOOGLE_PLACES_API_KEY}`
          : null;
    navigation.navigate('PlaceDetails',{
      name: data.structured_formatting.main_text, 
      address: data.structured_formatting.secondary_text,
      lat: details.geometry.location.lat, 
      lng: details.geometry.location.lng,
      photo_url: photoUrl,
      rating: details.rating,
    });
  };

  // useEffect(() => {
  //   if (places.length == 0) {
  //     loadPlaces(location, nextPageToken);
  //   }

  // },[places])

  // fetch data 타입 변경
  const changeType = (newType) => {
    // if (searchType !== newType) { // 이전 타입과 다른 경우에만 상태 변경
      setSearchType(newType); // 검색 타입 변경
    //   setPlaces([]); // 기존 장소 데이터 초기화
    //   setNextPageToken(null); // 페이지 토큰 초기화
    // }
    console.log(searchType);
  };

  const goByTMap = useCallback(async () => {
    console.log('linking');
    const destinationURL = 'tmap://route?goalname=분당서울대병원&goalx=127.122930&goaly=37.351987' 
    if (await Linking.canOpenURL(destinationURL)) await Linking.openURL(destinationURL)
  }, [])

  const openBrowser = async () => {
    const url = 'https://www.google.com';
    const appUrl = Platform.OS === 'ios' ? 'googlechrome://' : 'googlechrome://google.com';
  
    const supported = await Linking.canOpenURL(appUrl);
  
    if (supported) {
      console.log("!!!");
      Linking.openURL(appUrl); // Chrome이 설치된 경우 앱에서 열기
    } else {
      console.log('http')
      Linking.openURL(url); // 앱이 없으면 웹사이트로 이동
    }
  };
  

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
        {/* <View style={style.topMenuColumn}>
        <Pressable style={style.menuButton} onPress={openBrowser}>
        <Text>구글 크롬 앱 스키마</Text>
      </Pressable>
        </View> */}
        <View style={style.topMenuColumn}>
        {/* <Pressable style={style.menuButton} onPress={()=>Linking.openURL('shareddocuments://')}>
        <Text>파일 앱</Text>
      </Pressable> */}
        </View>
      </ScrollView>
      {/* ----------------------------------------------------------------가로 스크롤  */}
       {/* 지도에서 장소 검색하기 (모달 창으로 구현) -./components/ViewMap.js */}
       <Modal visible={isModalVisible} animationType='slide'>
       <Map modalOff={onPressModalClose} passDataToDetails={passDataToDetails} locationInput={location}/>
       <OffModal onPress={onPressModalClose}/>
       </Modal>
        {/* ----------------------------------------------------------------지도에서 장소 검색하기 모달 화면 */}
        <SelectTypeButton TypeNow={searchType} sections={TypeSelectList} changeType={changeType}/>
        {/* 장소 정보 리스트 */}
          {places.length === 0 ? (
          // <View style={style.emptyView}><Text>빈 화면</Text></View>
          <EmptyView/>
          ) : 
          // <EmptyView/>
          <PlaceList place={places} onEndReached={onEndReached} refreshDataFetch={onRefresh} />
          }
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
  },
  emptyView: {

  },
});

export default HomeScreen;
