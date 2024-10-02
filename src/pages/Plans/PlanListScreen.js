/**
 * 사용자 프로필 + 생성한 여행 보드 리스트
 * + 친구 목록, 프로필 수정
 *
 *
 */
import People from '../Profile/components/FriendsButton';

import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
  Button,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import firestore, {query, orderBy, doc, deleteDoc, getDocs, collection} from '@react-native-firebase/firestore';
import moment from 'moment';

import PlanList from './components/PlanList';
import Empty from '../../assets/Empty';
import NewPlanbutton from '../../components/NewPlanButton';
import ListButton from '../../components/ListButton';

// import auth, { getAuth } from '@react-native-firebase/auth';

import { useUserContext } from '../../components/UserContext';

import { getUserAuth } from '../../utils/getUserAuth';

// import plansData from '../../data/planData.json';


const PlansScreen = () => {
  // const { user } = useUserContext();

  // const auth = getAuth();
  // const user = auth.currentUser;
  // console.log(auth);
  // console.log('plan screen user: ' + user.id);

  const userId = getUserAuth();

  const [plan, setPlan] = useState([]);
  const [docId, setDocId] = useState();
  const [title, setTitle] = useState('');
  const [guestPlan, setGuestPlan] = useState([]);

  const navigation = useNavigation();
  
  useEffect(() => {
    // let isMounted = true;

    const unsubscribe = firestore()
      .collection('users')
      .doc(userId)
      .collection('plans')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        const fetchedPlans = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          userId: userId,
          guest: false,
        }));
        if (fetchedPlans[0] === undefined) {
          console.log('no fetched plans');
          return;
        }
        else {
          setPlan(fetchedPlans);
          console.log('Fetched Plan Success!// docId:', fetchedPlans[0]);
          setDocId(fetchedPlans[0].docId);
        }
        // console.log('Fetched Plan Success!// docId:', fetchedPlans[0].docId);
      }, error => {
        console.error("Error fetching plans: " + error);
      });

    // Clean up the subscription
    return () => {
      // isMounted = false;
      unsubscribe();
    }
  }, []);

  useEffect(() => {
    const fetchGuestPlans = async () => {
      try {
        // 현재 사용자의 guestPlan 문서들 가져오기
        const guestPlansSnapshot = await firestore()
          .collection('users')
          .doc(userId)
          .collection('guestPlan')
          .get();

        const fetchedGuestPlans = [];

        // 각 guestPlan 문서에서 planId 및 topUserId를 이용해 계획 데이터 가져오기
        for (const doc of guestPlansSnapshot.docs) {
          const { planId, TopUserId } = doc.data();

          // 해당 슈퍼 유저의 plan 컬렉션에서 해당 planId의 계획을 가져오기
          const planSnapshot = await firestore()
            .collection('users')
            .doc(TopUserId)
            .collection('plans')
            .doc(planId)
            .get();

          if (planSnapshot.exists) {
            const planData = planSnapshot.data();
            const participants = planData.participants || [];

            fetchedGuestPlans.push({
              id: planSnapshot.id,
              ...planSnapshot.data(),
              userId: TopUserId,
              guest: true,
              userCount: participants.length,
            });
          }
        }
        console.log('fetched data (guest plan): ', fetchedGuestPlans[0]);

        setGuestPlan(fetchedGuestPlans); // 가져온 guestPlan 데이터를 상태에 저장
      } catch (error) {
        console.error('Error fetching guest plans: ', error);
      }
    };

    fetchGuestPlans();
  }, [userId]);

  const onInsert = async () => {
    try {
      const nextId = plan.length > 0 ? Math.max(...plan.map(p => p.pid)) + 1 : 1;
      const plan_title = `새로운 계획 ${nextId}`;
      setTitle(plan_title);
      const newPlan = {
        pid: nextId.toString(),
        userId: userId,
        title: plan_title,
        text: `place${nextId}`,
        // text2: 'Excepteur anim culpa Lorem reprehenderit adipisicing excepteur consectetur et et eiusmod ex veniam consectetur velit.',
        participants: [userId],
        chatRoomId: null,
        date: moment().format('l'),
        time: moment().format('LT'),
        timestamp: new Date(),
      };
      const docRef = await 
      firestore()
        .collection('users')
        .doc(userId)
        .collection('plans')
        .add(newPlan);
      const id = docRef.id;

      console.log('planListSection -> ', id);

      await firestore()
        .collection('users')
        .doc(userId)
        .collection('plans')
        .doc(id)
        .update({ docId: id });

      setDocId(docRef.id); // Update the plan id for the newly inserted plan
      console.log("Inserted plan: " + docId + "date: " + newPlan.timestamp + newPlan.date);
      
      return id;
    } catch (error) {
      console.error("Error adding plan: " + error);
    }
  };

  //하위 컬렉션과 함께 문서 삭제
  const onRemove = async (planId) => {
    try {
      console.log(`Removing plan with id: ${planId}`); // Debug log

      const planDocRef = await firestore()
        .collection('users')
        .doc(userId)
        .collection('plans')
        .doc(planId)

      const planData = await planDocRef.get();

      console.log('Removing plan, planData: ', planData)

      const chatRoomId = planData._data.chatRoomId;

      const chatRoomRef = await firestore()
        .collection('groupChatRooms')
        .doc(chatRoomId);

      if (chatRoomRef) {
        await deleteDoc(chatRoomRef);
        console.log('Removed chat room: ', chatRoomId);
      }
      
      // console.log('user doc? ', userDocRef);

      // const planDocRef = doc(userDocRef, 'plans', planId);

      console.log('doc? ', planDocRef);
    // 하위 컬렉션 참조 (예시로 'planDetails'라는 이름을 사용합니다)
    const planDetailsCollectionRef = collection(planDocRef, 'planDetails');

    const pdRef = await getDocs(planDetailsCollectionRef)
    // pdRef.forEach((docs) => {
    //   console.log(`${docs.id} => ${docs.data()}`);
    //   await deleteDoc(docs); // 하위 문서 삭제
    // });
    const deletePromises = pdRef.docs.map((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      return deleteDoc(doc.ref);
    });

    await Promise.all(deletePromises); // Promise.all로 동시에 Promises를 resolve합니다.
    console.log('deletePromises');

    await deleteDoc(planDocRef);
    console.log('removed successfully');
      // await deleteDoc(doc(firestore(), 'plans', planId));
      // const docToDelete = plan.find(p => p.id === planId);

    setPlan(prevPlans => prevPlans.filter(p => p.id !== planId));
    console.log('Plan remoevd from local state.');
    } catch (error) {
      console.error("Error removing plan: ", error);
    }
  };

  // 플러스 버튼 클릭시 새로운 플랜 생성 + 바로 그 플랜으로 이동.
  const handlePress = async () => {
    try {
      // onInsert 함수의 실행이 완료될 때까지 대기하고, 완료되면 id를 받습니다.
      const id = await onInsert(); 
      console.log('handlePress: ', id);
  
      // id 값을 이용하여 다음 화면으로 이동합니다.
      // navigation.navigate('planScreen', {id: plan.id, docId: id}); 
    } catch (error) {
      console.error("Error in handlePress: ", error);
    }
  }

  return (
    <>
      <SafeAreaProvider>
        <View style={styles.block}>
          <SafeAreaView style={styles.PlaceList}>
            <KeyboardAvoidingView>
              {guestPlan.length === 0 ? (
                <></>
              ): (
                <>
                <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{color: 'gray',}}>(초대받은 여행)</Text>
                </View>
                <PlanList
                  plan={guestPlan}
                  docId={docId}
                  // userId={}
                  />
                <View style={{borderColor: 'gray', borderBottomWidth: 0.5, marginVertical: 4, height: 4,}}></View>
                </>
              )}
              {plan.length === 0 ? (
                <View style={styles.emptyView}>
                  <Text style={styles.emptyViewText}>
                    생성된 계획이 없습니다.
                  </Text>
                </View>
              ) : (
                <>
                  <PlanList
                    plan={plan}
                    onInsert={onInsert}
                    onRemove={onRemove}
                    docId={docId}
                  />
                </>
              )}
            </KeyboardAvoidingView>
          </SafeAreaView>
          {/** 새로운 계획 생성 */}
          <NewPlanbutton style={styles.button} onPress={handlePress} />
          <ListButton />
        </View>
      </SafeAreaProvider>
    </>
  );
};

const styles = StyleSheet.create({
  PlaceList: {
    backgroundColor: 'white',
    // backgroundColor: 'green',
    flex: 1,
  },
  block: {
    flex: 1,
    backgroundColor: 'blue,',
  },
  container: {
    top: 128,
    backgroundColor: 'blue',
  },
  button: {
    backgroundColor: 'green',
  },
  emptyView: {
    // backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
    top: 8,
  },
  emptyViewText: {
    color: 'gray',
  },
  e: {
    backgroundColor: 'red',
  }
});

export default PlansScreen;
