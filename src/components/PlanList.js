/**
 * 만들어진 여행 계획 보드 리스트 (무한 스크롤로 구현)
 * 추가(-), 삭제(o) 기능 추가.
 */
import React from 'react';
import {FlatList, View, Text, StyleSheet, EmptyView} from 'react-native';

import PlanSection from './PlanSection';

function PlanList({plan, onRemove}) {
  return (
    <>
      <FlatList
        style={style.list}
        data={plan}
        renderItem={({item}) => (
          <PlanSection
            pid={item.pid}
            title={item.title}
            text={item.text}
            text2={item.text2}
            id={item.id}
            date={item.timestamp}
            onRemove={onRemove}
          />
        )}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={() => (
          <EmptyView>
            <Text>계획이 없습니다.</Text>
            <Text>계획을 추가해주세요.</Text>
          </EmptyView>
        )}
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
