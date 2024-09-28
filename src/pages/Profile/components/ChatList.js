/**
 * 만들어진 여행 계획 보드 리스트 (무한 스크롤로 구현)
 * 추가(-), 삭제(o) 기능 추가.
 */
import React from 'react';
import {FlatList, View, Text, StyleSheet} from 'react-native';

import ChatSection from './ChatSection';

function ChatList({chatList, userId}) {
  return (
    <>
      <FlatList
        style={style.list}
        data={chatList}
        renderItem={({item}) => (
          <ChatSection 
          id={item.id} 
          lastMessage={item.lastMessage}
          otherUserName={item.otherUserName}
          userCount={item.userCount}
          // text={item.text} 
          // text2={item.text2} 
          userId={userId}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </>
  );
}

const style = StyleSheet.create({
  list: {
    // backgroundColor: 'green',
  },
});

export default ChatList;
