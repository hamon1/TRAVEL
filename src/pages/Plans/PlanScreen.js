/*
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Addbutton from '../../components/AddNewPlanDetail';

//임시
import PlanDetail from './PlanDetailList';



const PlanScreen = ({route}) => {
  const [show, setShow] = useState(false);

  return (
    <View style={styles.block}>
      <Text>plan screen</Text>
      <PlanDetail />
      <Addbutton />
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    // backgroundColor: 'red',
  },
});

export default PlanScreen;
*/

/** 계획 스크린.
 * 
 * 장소, 숙박, 이동 수단 등 선택 -> 계획 리스트에 추가
 * 각 스크린(장소, 숙박, 이동 수단, 식단, 기타) 검색, 추가 기능
 */
/*
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Addbutton from '../../components/AddNewPlanDetail';

//임시
import PlanDetail from './PlanDetailList';



const PlanScreen = ({route}) => {
  const [show, setShow] = useState(false);

  return (
    <View style={styles.block}>
      <Text>plan screen</Text>
*/
      {/* <Text>id: {route.params.id}</Text> */}
/*
      <PlanDetail />
      <Addbutton />
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    // backgroundColor: 'red',
  },
});
export default PlanScreen;
*/
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Addbutton from '../../components/AddNewPlanDetail';

//임시
import PlanDetail from './PlanDetailList';
import Emptyplan from './components/Emptyplan';
import PlanBoxList from './components/PlanBoxList';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { getBoxes, getNewerBoxes } from './lib/boxes';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import PlanBox from './components/PlanBox';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const PlanScreen = ({route}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [boxes, setBoxes] = useState(null);

  useEffect(() => {

    getBoxes().then(setBoxes);
  }, []);

  const onRefresh = async () => {
    if (!boxes || boxes.length === 0 || refreshing) {
      return;
    }
    const firstBox = boxes[0];
    setRefreshing(true);
    const newerBoxes = await getNewerBoxes(firstBox.id);
    setRefreshing(false);
    if (newerBoxes.length === 0) {
      return;
    }
    setBoxes(newerBoxes.concat(boxes));
  };
  return (
    <GestureHandlerRootView>
    <FlatList
      data={boxes}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }
    />
    <Addbutton />
    </GestureHandlerRootView>
  );
}

const renderItem = ({item}) => (
  <PlanBox
    description={item.description}
    id={item.id}
  />
);

const styles = StyleSheet.create({
  block: {
    flex: 1,
    // backgroundColor: 'red',
  },
});

export default PlanScreen;