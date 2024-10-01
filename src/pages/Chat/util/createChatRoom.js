import firestore from '@react-native-firebase/firestore';
import { times } from 'lodash';

export const createChatRoom = async (userId1, userId2, group, planId) => {
    try {
        console.log('Creating chat room', group);
        if (group) {
            const groupChatRoomSnapshot = await firestore()
                .collection('groupChatRooms')
                .where('participants', 'array-contains', userId1)
                .get();

                console.log('Chat room snapshot: ', groupChatRoomSnapshot);
        
                let existingChatRoom = null;
        
                groupChatRoomSnapshot.forEach(doc => {
                    console.log('doc.id: ', doc.id);
                    const participants = doc.data().participants;
                    console.log('participants: ', participants);
                    if (participants.includes(userId2)) {
                        existingChatRoom = doc.id;
                    }
                });

                const chatRoomRef = firestore().collection('groupChatRooms').doc();
                    await chatRoomRef.set({
                        participants: [userId1, userId2],
                        group: true,
                        planId: planId,
                    });
                    console.log('Chat room created: ', chatRoomRef.id);
                return chatRoomRef.id;
        } else {


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

    const chatRoomRef = await firestore()
        .collection('chatRooms')
        .doc(chatRoomId)
        .update({
            lastMessage: messageText,
            timestamp: firestore.FieldValue.serverTimestamp(),
        });
};

export const leftChatRoom = async (chatRoomId, userId) => {
    try {
        const chatRoomRef = await firestore()
            .collection('chatRooms')
            .doc(chatRoomId);
        
        await chatRoomRef.update({
            participants: firestore.FieldValue.arrayRemove(userId),
        });

        console.log(`User ${userId} has left the chat room`);
    } catch (error) {
        console.error('Error leaving chat room: ', error);
    }
}