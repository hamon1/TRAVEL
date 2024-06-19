/** 계획 스크린.
 * 
 * 장소, 숙박, 이동 수단 등 선택 -> 계획 리스트에 추가
 * 각 스크린(장소, 숙박, 이동 수단, 식단, 기타) 검색, 추가 기능
 */

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Addbutton from '../../components/AddNewPlanDetail';

//임시
import PlanDetail from './PlanDetailList';

const PlanScreen = ({route}) => {
  return (
    <View style={styles.block}>
      <Text>plan screen</Text>
      {/* <Text>id: {route.params.id}</Text> */}
      <PlanDetail />
      <Addbutton />
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'red',
  },
});

export default PlanScreen;
