/**
 * 친구 목록
 * 추가(-), 삭제(o) 기능 추가.
 */
import React from 'react';
import {FlatList, View, Text, StyleSheet} from 'react-native';

import FriendSection from './FriendSection';

function FriendList({user, onRemove, onPress}) {
  return (
    <>
      <FlatList
        style={style.list}
        data={user}
        renderItem={({item}) => (
          <FriendSection
            docId={item.pid}
            userName={item.userName}
            userId={item.userId}
            photoUrl={item.userId.photoURL}
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
    
  },
});

export default FriendList;
