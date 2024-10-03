
import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from 'react-native';

// import sendMessage from './util/sendMessage';
import { useMessages } from './util/useMessages';
import { useNavigation } from '@react-navigation/native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { getUserAuth } from '../../utils/getUserAuth';
import { sendMessage, leftChatRoom } from './util/createChatRoom';

import { useUserContext } from '../../components/UserContext';

import TextBox from './components/TextBox';

const ChatScreen = ({route}) => {
  const { user } = useUserContext();

  const navigation = useNavigation();
  
  const { chatRoomId, userId, group } = route.params;

  const [messageText, setMessageText] = useState('');
  const messages = useMessages(chatRoomId, group);

  const handleSend = () => {
    console.log('Send message: ', chatRoomId, userId, messageText);
    sendMessage(chatRoomId, userId, messageText, user.displayName, group);
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
    <KeyboardAvoidingView 
      style={{flex: 1,}}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // iOS에서는 오프셋을 조정
    >
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
              style={styles.textInput}
              value={messageText}
              onChangeText={setMessageText}
              placeholder="메시지를 입력하세요"
              />
              <TouchableOpacity onPress={handleSend}>
                <MaterialCommunityIcons name="send" size={24} color="orange" />
                </TouchableOpacity>
            {/* <Button  onPress={handleSend}>
              </Button> */}
          </View>
          {/* <Button title="채팅방 나가기" onPress={() => {
            leftChatRoom(chatRoomId, userId);
            navigation.pop();
          }}
        /> */}
      </View>
    </KeyboardAvoidingView>
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
    height: 52,
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  messageContainer: {
    paddingHorizontal: 20,
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
  textInput: {
    // backgroundColor: 'magenta',
    maxWidth: '85%',
  },
})

export default ChatScreen;