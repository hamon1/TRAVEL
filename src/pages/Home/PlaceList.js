import React from 'react';
import {FlatList, View, Text, StyleSheet} from 'react-native';

import PlaceSection from './PlaceSection';

function PlaceList({place}) {
  return (
    <FlatList
      style={style.list}
      data={place}
      renderItem={({item}) => (
        <PlaceSection id={item.id} text={item.text} text2={item.text2} />
      )}
      keyExtractor={item => item.id.toString()}
    />
  );
}

const style = StyleSheet.create({
  list: {
    flex: 1,
  },
});

export default PlaceList;
