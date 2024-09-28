// import React, {useState, useCallback, useEffect} from 'react';
// import {SafeAreaProvider, StyleSheet, View} from 'react-native';
// import {GiftedChat} from 'react-native-gifted-chat';

// export default function Example() {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     setMessages([
//       {
//         _id: 1,
//         text: 'Hello world!',
//         createdAt: new Date(),
//         user: {
//           _id: 2,
//           name: 'React Native',
//           avatar: 'https://placeimg.com/140/140/any',
//         },
//       },
//     ]);
//   }, []);

//   const onSend = useCallback((messages = []) => {
//     setMessages(previousMessages =>
//       GiftedChat.append(previousMessages, messages),
//     );
//   }, []);

//   return (
//     <GiftedChat
//       placeholder="메시지를 입력하세요."
//       showUserAvatar={false}
//       messages={messages}
//       onSend={messages => onSend(messages)}
//       user={{
//         _id: 1,
//       }}
//       scrollToBottom={true}
//       renderUsername={() => {
//         true;
//       }}
//       multiline={false}
//       alwaysShowSend={true}
//     />
//   );
// }

// const styles = StyleSheet.create({
//   block: {
//     backgroundColor: 'blue',
//   },
// });


//----------------------------------------------------------------

import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';

// import sendMessage from './util/sendMessage';
import { useMessages } from './util/useMessages';
import { useNavigation } from '@react-navigation/native';

import { getUserAuth } from '../../utils/getUserAuth';
import { sendMessage, leftChatRoom } from './util/createChatRoom';

import { useUserContext } from '../../components/UserContext';

import TextBox from './components/TextBox';

const ChatScreen = ({route}) => {
  const { user } = useUserContext();

  const navigation = useNavigation();
  
  const { chatRoomId, userId } = route.params;

  const [messageText, setMessageText] = useState('');
  const messages = useMessages(chatRoomId);

  const handleSend = () => {
    console.log('Send message: ', chatRoomId, userId, messageText);
    sendMessage(chatRoomId, userId, messageText, user.displayName);
    setMessageText('');
  }

  const flatListRef = useRef(null);

  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  // const handleSend = () => {
  //   sendMessage(userId, 'receiverId', messageText); // 수신자 ID를 실제 수신자로 변경
  //   setMessageText('');
  // };

  return (
    <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              item.senderId === user.id ? styles.myMessage : styles.otherMessage,
            ]}
          >
            <Text style={styles.userName}>
              {item.senderId === user.id ? '' : item.userName}
            </Text>
            <TextBox messageText={item.text} />
            {/* <Text>{item.timestamp}</Text> */}
          </View>
          )}
        />
        <View style={styles.textInput_container}>
          <TextInput
            value={messageText}
            onChangeText={setMessageText}
            placeholder="메시지를 입력하세요"
          />
          <Button title="전송" onPress={handleSend}/>
        </View>
        {/* <Button title="채팅방 나가기" onPress={() => {
          leftChatRoom(chatRoomId, userId);
          navigation.pop();
        }}
        /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput_container: {
    flexDirection: 'row',
    justifyContent:'space-between',
    padding: 8,

    bottom: 0,
    height: 64,
    // backgroundColor: 'green',
  },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 8,
    maxWidth: '90%',
    marginHorizontal: 8,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: 'orange',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    // backgroundColor: '#f1f1f1',
    backgroundColor: 'white',
  },
  userName: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
})

export default ChatScreen;