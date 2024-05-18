// import React from 'react';
// import {View, Text} from 'react-native';
// import {GiftedChat, SystemMessage} from 'react-native-gifted-chat';

// const ChatScreen = () => {
//   return (
//     <View>
//       <Text>ChatScreen</Text>
//       <GiftedChat
//         messages={messages}
//         onSend={messages => onSend(messages)}
//         isTyping={true}
//         renderSystemMessage={this.onRenderSystemMessage}
//         renderUsernameOnMessage={true}
//         renderSend={RenderSend}
//         // textInputProps= {{  autoFocus : true  }}
//         textInputStyle={{alignSelf: 'center'}}
//         onPressActionButton={() => {}}
//         alwaysShowSend={true}
//         showUserAvatar={true}
//         placeholder="메시지를 입력하세요."
//         user={{
//           _id: 2,
//           name: 'beanzinu',
//         }}
//       />
//     </View>
//   );
// };

// const onSend = React.useCallback((msg = []) => {
//   setMessages(previousMessages => GiftedChat.append(previousMessages, msg));
// }, []);

// export default ChatScreen;
