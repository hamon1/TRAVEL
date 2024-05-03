import React from 'react';
import {FlatList, View, Text, StyleSheet} from 'react-native';

import PlanSection from './PlanSection';

function PlanList({plan}) {
  return (
    <>
      <FlatList
        style={style.list}
        data={plan}
        renderItem={({item}) => (
          <PlanSection id={item.id} text={item.text} text2={item.text2} />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </>
  );
}

const style = StyleSheet.create({
  list: {
    
  },
});

export default PlanList;
