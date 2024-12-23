/** 계획 스크린.
 * 
 * 장소, 숙박, 이동 수단 등 선택 -> 계획 리스트에 추가
 * 각 스크린(장소, 숙박, 이동 수단, 식단, 기타) 검색, 추가 기능
 */

import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';

import Addbutton from '../../components/AddNewPlanDetail';

//임시
// import PlanDetail from './PlanDetailList';
import Emptyplan from './components/Emptyplan';
// import PlanBoxList from './components/PlanBoxList';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
// import { getBoxes, getNewerBoxes } from './lib/boxes';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
// import PlanBox from './components/PlanBox';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import {useNavigation} from '@react-navigation/native';

import firestore, {query, orderBy, doc, deleteDoc} from '@react-native-firebase/firestore';
import auth, { getAuth } from '@react-native-firebase/auth';

import { useUserContext } from '../../components/UserContext';

import moment from 'moment';

import PlaceBox from './components/PlaceBox';
import TransBox from './components/TransBox';
import RantalBox from './components/RantalhomeBox';
import RastaurantBox from './components/RastaurantBox';

import FriendsButton from '../Profile/components/FriendsButton';
import ItemBox from './components/ItemBox';
import { AddFriendButton } from './components/AddFriendButton';
import { ChatRoomButton } from './components/ChatRoomButton';

import IconFeather from 'react-native-vector-icons/Feather';

import { getUserAuth } from '../../utils/getUserAuth';

import { addFriendToPlan } from './util/addFriendToPlan';
// import  planNotification  from './util/PlanNotification';

// import PushNotification from 'react-native-push-notification';


const PlanScreen = ({route}) => {
  // const { user } = useUserContext();

  // const auth = getAuth();
  // // const user = auth.currentUser;
  // console.log(auth);
  // console.log('plan screen user: ' + user.id);
  // const [refreshing, setRefreshing] = useState(false);
  // const [boxes, setBoxes] = useState(null);
  const [plans, setPlan] = useState([]);
  const [docId, setDocId] = useState(null);
  const [title, setTitle] = useState(route.params.title || title);

  const [participants, setParticipants] = useState([]);

  const [userCount, setUserCount] = useState(null);

  const [chatRoomId, setChatRoomId] = useState(null);

  let planId = null;
  // const [scale, setScale] = useState(1);

  // const increaseScale = () => {
    //   setScale(prevScale => prevScale + 0.1);
    // };
    
    // const decreaseScale = () => {
      //   setScale(prevScale => prevScale - 0.1);
      // };
      
      console.log('plan pid', route.params.docId);
      
      const navigation = useNavigation();
      
      const userId = getUserAuth();
      
      // useEffect(() => {
      //   // if (docId) {
      //     console.log('planId가 패치되었으므로 알림 설정을 실행합니다: ', docId);
      //     planNotification(userId, docId); // 알림 설정 함수 호출
      //   // }
      // }, [docId]); 
  // navigation.setOptions({
  //   title: route.params.title,
  // });


  // planNotification(userId, docId);
  const handleAddFriend = async (friendId) => {
    console.log('handleAddFriend / ', friendId);
    await addFriendToPlan(docId, friendId, userId);

    setParticipants(prev => [...prev, friendId]);

    await fetchPlanDetails();
  }


  console.log('plan screen / title: ', title);
  console.log('plan screen / topUserId(userId): ', route.params.userId);
  console.log('plan screen / participants: ', participants.length);

  useEffect(() => {
    const fetchPlanDetails = async () => {
      try {
        console.log('fetching plan details:', route.params.docId);
        
        // if (!route.params || !route.params.id) {
        //   throw new Error("Invalid or missing route parameter: id");
        // }
        // if (!route.params.id)
        const querySnapshot = await firestore()
          .collection('users')
          .doc(route.params.userId)
          .collection('plans')
          .where('pid', '==', route.params.id)
          .get();

        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0]; // 겹치는 문서는 없을 예정이기 때문에 첫 문서를 가져옴
          const docId = doc.id;
          setDocId(docId);
          console.log('docId', docId);

          const planData = doc.data();
          setChatRoomId(planData.chatRoomId);
          setUserCount(planData.participants.length);

          console.log('chatRoomId', planData.chatRoomId);

          planId = docId;

          // 하위 컬렉션(planDetails)에서 데이터 가져오기
          const unsubscribe = firestore()
            .collection('users')
            .doc(route.params.userId)
            .collection('plans')
            .doc(docId)
            .collection('planDetails')
            .orderBy('date_sorting', 'asc')
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

  useEffect(() => {
    const subscribeToParticipants = async () => {
      try {
        // 특정 플랜 문서의 변경 사항을 실시간으로 구독
        const unsubscribe = firestore()
          .collection('users')
          .doc(route.params.userId)
          .collection('plans')
          .doc(docId)
          .onSnapshot((doc) => {
            if (doc.exists) {
              const planData = doc.data();
              // participants 상태 업데이트
              setParticipants(planData.participants);
              setUserCount(planData.participants.length);
              console.log('Participants updated:', planData.participants);
            } else {
              console.log("No such document!");
            }
          }, error => {
            console.error("Error subscribing to participants: ", error);
          });
  
        // 컴포넌트 언마운트 시 구독 해제
        return () => unsubscribe();
      } catch (error) {
        console.error("Error setting up participants subscription: ", error);
      }
    };
  
    subscribeToParticipants();
  }, [docId]);
  
  

  function renderItem({item}) {
    return (
      <ItemBox
      docId={docId}
      item={item}
      planId={route.params.docId}
      />
    )
  }

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{flexDirection: 'row', alignItems: 'center'}} >
          <TextInput 
            style={{color: 'black', fontSize: 18}} 
            placeholder={route.params.title} 
            placeholderTextColor='white'
            // value={title}
            // onChangeText={
            //   // text=>updateTitle(text)
            //   text=>setTitle(text)
            //   // text=>console.log(text)
            // }
            maxLength={20}
            selectTextOnFocus={true}
            // onSubmitEditing={
            //   // text=>setTitle(text)
            //   alert('submitEditing')
            // }
            onEndEditing={ 
              (e) => updateTitle(e.nativeEvent.text)
              // (e) => setTitle(e.nativeEvent.text)
              // text=>console.log('onEndEditing:', text.nativeEvent.text)
            }
          >
            {title}
          </TextInput>
          <IconFeather style={{marginLeft: 8}} name="edit-2" size={18} color="#616161"/>
        </View>
      ),
      headerRight: () => (
        <>
        {/* <Text>?</Text> */}
          {chatRoomId && (
            <ChatRoomButton chatRoomId={chatRoomId} userId={userId}/>
          ) 
          // <></>
        }
        </>
    )
  })}, [navigation, title, chatRoomId]);

  console.log('chatRoom Id: ', plans.chatRoomId);
  
  const updateTitle = async (text) => {
    console.log('updateTitle:', planId);
    console.log('updateTitle:', docId);
    try {
      if (planId) {
        await firestore()
          .collection('users')
          .doc(userId)
          .collection('plans')
          .doc(planId)
          .update({ title: text, 
            date: moment().format('l'),
          time: moment().format('LT'),
          timestamp: new Date(), });
        console.log("Plan title updated successfully!");
      }
      else {
        console.error("Error: docId is missing.");
      }
    } catch (error) {
      console.error("Error updating plan title: ", error);
    }
  };

  return (
    <View style={styles.bg}>
      <GestureHandlerRootView>
      {
        plans.length === 0? (
          <View style={{marginTop: 12,}}>
            <Text style={styles.empty_text}>아래 '+' 버튼을 통해</Text>
            <Text style={styles.empty_text}>새로운 계획을 추가해 주세요!</Text>
          </View>
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
        <Addbutton style={styles.add} onPress={()=> {navigation.navigate('PlaceSearchScreen', {docId: docId})}}/>
      ) : 
      <Addbutton style={styles.add} onPress={()=> {navigation.navigate('PlaceSearchScreen', {docId: docId, edit: false})}}/>
        }
        {/* <FriendsButton /> */}
        {/* <View style={styles.friendButton}> */}
          <AddFriendButton handleAddFriend={handleAddFriend} userId={route.params.userId} docId={docId} userCount={userCount}/>
        {/* </View> */}
        {/* <TouchableOpacity
        style = {{width: 100, height: 100, backgroundColor: 'green', position: 'absolute'}}
        onPress = {()=>OnNotification()}
        /> */}
        {/* <View style={{width: 100, height: 100, backgroundColor: 'red', position: 'absolute', top: -10,}}/> */}
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
  friendButton: {
    // position: 'absolute',
    // top: 24,
    // left: 20,
    // width: 52,
    // height: 28,
    // backgroundColor: 'rgba(255, 255, 255, 0.6)',
    // alignItems: 'center',
    // justifyContent: 'center',
    // borderRadius: 14,
  },
  empty_text: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    // marginTop: 10,
  },
});

export default PlanScreen;