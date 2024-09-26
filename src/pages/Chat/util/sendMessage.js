// export const sendMessage = async (chatRoomId, senderId, messageText) => {
//     const messageRef = firestore()
//         .colloection('chatRooms')
//         .doc(chatRoomId)
//         .colloection('messages')
//         .doc();

//     await messageRef.set({
//         senderId,
//         text: messageText,
//         timestamp: firestore.FieldValue.serverTimestamp(),
//     });
// };