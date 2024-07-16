// /**
//  * 매인 화면 (로그인 시, 가장 먼저 보이는 화면)
//  * 여행지 추천 목록  - 무한 스크롤. - flatlist 통해 구현.
//  * 상단 리롤, 데이터 get -> 임시 data API를 통해 구현함. (이후 데이터 구축)
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

import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import Map from './components/ViewMap';

function HomeScreen() {
  // const [page, setPage] = useState(1);
  // const [place, setPlace] = useState([]);
  // const [isFetchingMore, setIsFetchingMore] = useState(true);
  // const [loading, setLoading] = useState(true);

  //   const getData = async() => {
  //     console.log('f loading?: ' + loading);
  //     console.log('f isFetchingMore?: ' + isFetchingMore);
  //     if(isFetchingMore) {
  //       try {
  //         const pageSize = 10;
  //         const startIndex = (page - 1) * pageSize;
  //         const endIndex = startIndex + pageSize;
  //        const placeData = placeJSON.records.slice(startIndex, endIndex);
  
  //         console.log('i' + placeData);
  
  //        setPlace((prevPlace) => [...prevPlace,...placeData]);
  //        console.log('item: ' + place[0].관광지명);
  //     }
  //     catch (error) {
  //       console.error('Error fetching data:', error);
  //     }finally{
  //       setLoading(false);
  //       setIsFetchingMore(false);
  //     }
  //     }
  // };
  
  
//   const handleLoadMore = () => {
//     console.log('load more');
//     setIsFetchingMore(true);
//     if (!isFetchingMore) {
//       setLoading(true);
//       setPage((prevPage) => prevPage + 1);
//     }
//     setIsFetchingMore(false);
//   };

// useEffect(() => {
//     getData();
//   })
//   console.log('loading?: ' + loading);
//   console.log('isFetchingMore?: ' + isFetchingMore);

//----------------------------------------------------------------
//임시 데이터 로딩 코드

const BUS_LINK = 'https://txbus.t-money.co.kr/main.do';
const TMONEYGO_LINK = 'https://apps.apple.com/kr/app/%ED%8B%B0%EB%A8%B8%EB%8B%88go-%EC%98%A8%EB%8B%A4%ED%83%9D%EC%8B%9C-%EA%B3%A0%EC%86%8D%EC%8B%9C%EC%99%B8-%EB%94%B0%EB%A6%89%EC%9D%B4-%ED%83%80%EC%8A%88-%ED%82%A5%EB%B3%B4%EB%93%9C/id1483433931';
const KORAIL_LINK = 'https://www.letskorail.com';

const [isModalVisible, setIsModalVisible] = useState(false);
useEffect(() => {}, []);

const onPressModalOpen = () => {
  console.log('enlarge a map_search');
  setIsModalVisible(true);
};

const onPressModalClose = () => {
  console.log('closed');
  setIsModalVisible(false);
};

  return (
  
    <SafeAreaProvider>
      <SafeAreaView style={style.block}>
        <KeyboardAvoidingView style={style.avoid}>
      <ScrollView style={style.topBlock} horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={style.topMenuColumn}>
      <Pressable onPress={onPressModalOpen} style={style.menuButton}>
          <Icon name='search' size={48} color='black'/>
        <Text>Search</Text>
      </Pressable>
        </View>
        <View style={style.topMenuColumn}>
        <Pressable style={style.menuButton} onPress={()=>Linking.openURL(BUS_LINK)} >
          <Icon2 name='directions-bus' size={48} color='black'/>
        <Text>Bus</Text>
      </Pressable>
        </View>
        <View style={style.topMenuColumn}>
        <Pressable style={style.menuButton} onPress={()=>Linking.openURL(KORAIL_LINK)}>
          <Icon2 name='train' size={48} color='black'/>
        <Text>Korail</Text>
      </Pressable>
        </View>
        <View style={style.topMenuColumn}>
        <Pressable style={style.menuButton} >
        <Text>?</Text>
      </Pressable>
        </View>
      </ScrollView>
       {/* <View style={style.box}> */}
       <Modal visible={isModalVisible} animationType='slide'>
       <Map/>
       <OffModal onPress={onPressModalClose}/>
       </Modal>
    {/* </View> */}

          {placeData.length === 0 ? (<Text>빈 화면</Text>) : <PlaceList place={placeData} />}
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
