// import React from 'react';
// import {View, Text, StyleSheet} from 'react-native';

// const ChatScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Text>ChatScreen</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'gray',
//   },
// });

// export default ChatScreen;

import React, {useState, useCallback, useEffect} from 'react';
import {SafeAreaProvider, StyleSheet, View} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';

export default function Example() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello world!',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  return (
    <GiftedChat
      placeholder="메시지를 입력하세요."
      showUserAvatar={false}
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
      scrollToBottom={true}
      renderUsername={() => {
        true;
      }}
      multiline={false}
      alwaysShowSend={true}
    />
  );
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: 'blue',
  },
});
