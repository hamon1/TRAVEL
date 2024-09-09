/** 계획 스크린.
 * 
 * 장소, 숙박, 이동 수단 등 선택 -> 계획 리스트에 추가
 * 각 스크린(장소, 숙박, 이동 수단, 식단, 기타) 검색, 추가 기능
 */

import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import Addbutton from '../../components/AddNewPlanDetail';

//임시
import PlanDetail from './PlanDetailList';
import Emptyplan from './components/Emptyplan';
// import PlanBoxList from './components/PlanBoxList';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
// import { getBoxes, getNewerBoxes } from './lib/boxes';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
// import PlanBox from './components/PlanBox';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import {useNavigation} from '@react-navigation/native';

import firestore, {query, orderBy, doc, deleteDoc} from '@react-native-firebase/firestore';

import PlaceBox from './components/PlaceBox';
import TransBox from './components/TransBox';
import RantalBox from './components/RantalhomeBox';
import RastaurantBox from './components/RastaurantBox';

const PlanScreen = ({route}) => {
  // const [refreshing, setRefreshing] = useState(false);
  // const [boxes, setBoxes] = useState(null);
  const [plans, setPlan] = useState([]);
  const [docId, setDocId] = useState(null);
console.log('plan pid', route.params.docId);

const navigation = useNavigation();

navigation.setOptions({
  title: route.params.title,
});

useEffect(() => {
  const fetchPlanDetails = async () => {
    try {
      console.log('fetching plan details:', route.params.docId);
      
      // if (!route.params || !route.params.id) {
      //   throw new Error("Invalid or missing route parameter: id");
      // }
      // if (!route.params.id)
      const querySnapshot = await firestore()
        .collection('plans')
        .where('pid', '==', route.params.id)
        .get();

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0]; // 겹치는 문서는 없을 예정이기 때문에 첫 문서를 가져옴
        const docId = doc.id;
        setDocId(docId);
        console.log('docId', docId);

        // 하위 컬렉션(planDetails)에서 데이터 가져오기
        const unsubscribe = firestore()
          .collection('plans')
          .doc(docId)
          .collection('planDetails')
          .onSnapshot(snapshot => {
            const fetchedPlans = snapshot.docs.map(detailDoc => ({
              id: detailDoc.id,
              ...detailDoc.data(),
            }));
            setPlan(fetchedPlans); // 상태 업데이트
            console.log('Fetched planDetails:', fetchedPlans);
          }, error => {
            console.error("Error fetching planDetails: ", error);
          });

        // Clean up the subscription
        return () => unsubscribe();
      } else {
        console.log("No document matches the query.");
      }
    } catch (error) {
      console.error("Error fetching plans: ", error);
    }
  };

  fetchPlanDetails();
}, []);

// 더미 데이터
  // const items = [
  //   {id: '1', type: 'place'},
  //   {id: '2', type: 'trans'},
  //   {id: '3', type: 'place'},
  // ];

  function renderItem({item}) {
    switch (item.type) {
      case 'place':
        return (
          <PlaceBox
            docId={docId}
            item={item}
            // id={item.id}
            // description={item.description}
          />
        );
      case 'transportation':
        return (
          <TransBox
          docId={docId}
          item={item}
            // description={item.description}
            // id={item.id}
          />
        );
        case 'rantalHome':
        return (
          <RantalBox
          docId={docId}
          item={item}
            // description={item.description}
            // id={item.id}
          />
        );
        case 'restaurant':
        return (
          <RastaurantBox
          docId={docId}
          item={item}
            // description={item.description}
            // id={item.id}
          />
        );
      default:
        return null;
    }
  }

  return (
    <View style={styles.bg}>
      <GestureHandlerRootView>
      {
        plans.length === 0? (
          <View><Text>empty</Text></View>
        ) : 
        <FlatList
          data={plans}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          />
      }
        {/* <PlaceBox/> */}
      {/* <Addbutton docId={docId}/> */}
      {/* <TouchableOpacity style={styles.add} onPress={()=>{console.log('planScreen -> ', route.params.docId)}}/> */}
      {route.params.docId ? (
        <Addbutton style={styles.add} onPress={()=> {navigation.navigate('PlaceSearchScreen', {docId: route.params.docId})}}/>
      ) : 
      <Addbutton style={styles.add} onPress={()=> {navigation.navigate('PlaceSearchScreen', {docId: docId, edit: false})}}/>
        }
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#616161',
  },
  block: {
    flex: 1,
    // backgroundColor: 'red',
  },
  add: {
    width: 100,
    height: 100,
    backgroundColor: 'green',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export default PlanScreen;