/**
 * 사용자 프로필 + 생성한 여행 보드 리스트
 * + 친구 목록, 프로필 수정
 *
 *
 */
import People from '../../components/FriendsButton';

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
import firestore, {doc, deleteDoc} from '@react-native-firebase/firestore';

import PlanList from '../../components/PlanList';
import Empty from '../../assets/Empty';
import NewPlanbutton from '../../components/NewPlanButton';
import ListButton from '../../components/ListButton';

import plansData from '../../data/planData.json';


const PlansScreen = () => {
  const [plan, setPlan] = useState([]);
  const navigation = useNavigation();
  
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('plans')
      .onSnapshot(snapshot => {
        const fetchedPlans = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPlan(fetchedPlans);
      }, error => {
        console.error("Error fetching plans: " + error);
      });
      // .doc('plans').set({id: 0, text: 1});

    // Clean up the subscription
    return () => unsubscribe();
  }, []);

  {/** id = 램덤 생성 
pid: 생성된 순 번호 부여 (1~) */}
  const onInsert = async () => {
    try {
      const nextId = plan.length > 0 ? Math.max(...plan.map(p => p.pid)) + 1 : 1;
      const newPlan = {
        pid: nextId.toString(),
        userId: 0,
        text: `place${nextId}`,
        text2: 'Excepteur anim culpa Lorem reprehenderit adipisicing excepteur consectetur et et eiusmod ex veniam consectetur velit.',
        timestamp: new Date(),
      };
      await firestore().collection('plans').add(newPlan);
      console.log("Inserted plan: " + newPlan.id);
    } catch (error) {
      console.error("Error adding plan: " + error);
    }
  };

  const onRemove = async (planId) => {
    try {
      console.log(`Removing plan with id: ${planId}`); // Debug log
      await deleteDoc(doc(firestore(), 'plans', planId));
      const docToDelete = plan.find(p => p.id === planId);
    } catch (error) {
      console.error("Error removing plan: ", error);
    }
  };

  // const onPress = () => {
  //   navigation.navigate('planScreen');
  // };

  const handlePress = () => {
    onInsert();
    navigation.navigate('planScreen');
  }

  return (
    <>
      <SafeAreaProvider>
        <View style={styles.block}>
          <SafeAreaView style={styles.PlaceList}>
            {/** 임시 계획 추가 버튼 -> 이후 + 버튼에 insert 삽입 예정 */}
            <Pressable onPress = {onInsert} >
              <Text> add </Text>
            </Pressable>
            <KeyboardAvoidingView>
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
