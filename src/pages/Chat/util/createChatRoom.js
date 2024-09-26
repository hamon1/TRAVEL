import firestore from '@react-native-firebase/firestore';

export const createChatRoom = async (userId1, userId2) => {
    try {
        const chatRoomSnapshot = await firestore()
            .collection('chatRooms')
            .where('participants', 'array-contains', userId1)
            .get();

        console.log('Chat room snapshot: ', chatRoomSnapshot);

        let existingChatRoom = null;

        chatRoomSnapshot.forEach(doc => {
            console.log('doc.id: ', doc.id);
            const participants = doc.data().participants;
            console.log('participants: ', participants);
            if (participants.includes(userId2)) {
                existingChatRoom = doc.id;
            }
        });

        if (existingChatRoom) {
            console.log('Chat room found: ', existingChatRoom);
            return existingChatRoom;
        }else {
            const chatRoomRef = firestore().collection('chatRooms').doc();
            await chatRoomRef.set({
                participants: [userId1, userId2],
            });
            console.log('Chat room created: ', chatRoomRef.id);
            return chatRoomRef.id;
        }

    }catch (e) {
        console.error('Error creating chat room: ', e);
    }
};

export const sendMessage = async (chatRoomId, senderId, messageText, userName) => {
    const messageRef = await firestore()
        .collection('chatRooms')
        .doc(chatRoomId)
        .collection('messages')
        .doc();

    await messageRef.set({
        userName,
        senderId,
        text: messageText,
        timestamp: firestore.FieldValue.serverTimestamp(),
    });
};