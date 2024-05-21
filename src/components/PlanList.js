/**
 * 만들어진 여행 계획 보드 리스트 (무한 스크롤로 구현)
 * 추가(-), 삭제(o) 기능 추가.
 */
import React from 'react';
import {FlatList, View, Text, StyleSheet} from 'react-native';

import PlanSection from './PlanSection';

function PlanList({plan, onRemove}) {
  return (
    <>
      <FlatList
        style={style.list}
        data={plan}
        renderItem={({item}) => (
          <PlanSection
            id={item.id}
            text={item.text}
            text2={item.text2}
            onRemove={onRemove}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </>
  );
}

const style = StyleSheet.create({
  list: {
    // backgroundColor: 'red',
    // flex: 1,
    height: '100%',
  },
});

export default PlanList;
