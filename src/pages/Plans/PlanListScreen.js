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
  KeyboardAvoidingView,
} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

import PlanList from '../../components/PlanList';
import Empty from '../../assets/Empty';
import NewPlanbutton from '../../components/NewPlanButton';
import ListButton from '../../components/ListButton';

const PlansScreen = () => {
  const [plan, setPlan] = useState([
    {
      id: 1,
      text: 'place1',
      text2:
        'Excepteur anim culpa Lorem reprehenderit adipisicing excepteur consectetur et et eiusmod ex veniam consectetur velit.',
    },
    {
      id: 2,
      text: 'place2',
      text2:
        'Excepteur anim culpa Lorem reprehenderit adipisicing excepteur consectetur et et eiusmod ex veniam consectetur velit.',
    },
    {
      id: 3,
      text: 'place3',
      text2:
        'Excepteur anim culpa Lorem reprehenderit adipisicing excepteur consectetur et et eiusmod ex veniam consectetur velit.',
    },
    {
      id: 4,
      text: 'place4',
      text2:
        'Excepteur anim culpa Lorem reprehenderit adipisicing excepteur consectetur et et eiusmod ex veniam consectetur velit.',
    },
    {
      id: 5,
      text: 'place5',
      text2:
        'Excepteur anim culpa Lorem reprehenderit adipisicing excepteur consectetur et et eiusmod ex veniam consectetur velit.',
    },
    {
      id: 6,
      text: 'place6',
      text2:
        'Excepteur anim culpa Lorem reprehenderit adipisicing excepteur consectetur et et eiusmod ex veniam consectetur velit.',
    },
    {
      id: 7,
      text: 'place7',
      text2:
        'Excepteur anim culpa Lorem reprehenderit adipisicing excepteur consectetur et et eiusmod ex veniam consectetur velit.',
    },
  ]);

  const onInsert = text => {
    const nextId =
      plan.length > 0 ? Math.max(...plan.map(plan => plan.id)) + 1 : 1;
    const plan = {
      id: nextId,
      text: 'plance',
      text2:
        'Excepteur anim culpa Lorem reprehenderit adipisicing excepteur consectetur et et eiusmod ex veniam consectetur velit.',
    };
    setPlan(plan.concat(plan));
  };

  const onRemove = id => {
    const nextPlan = plan.filter(plan => plan.id !== id);
    setPlan(nextPlan);
  };

  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('planScreen');
  };

  return (
    <>
      <SafeAreaProvider>
        <View style={styles.block}>
          <SafeAreaView style={styles.PlaceList}>
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
          <NewPlanbutton style={styles.button} onPress={onPress} />
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
});

export default PlansScreen;
