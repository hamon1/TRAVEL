// import firestore, {query, orderBy, doc, deleteDoc, getDocs, collection} from '@react-native-firebase/firestore';

// export const getChatRoomList = async(userId) => {
//     try {
//         const chatRoomSnapshot = await firestore()
//             .collection('chatRooms')
//             .where('participants', 'array-contains', userId)
//             .get();

//         const chatrooms = chatRoomSnapshot.docs.map(doc => ({
//             id: doc.id,
//             ...doc.data(),
//         }));

//         console.log('chatrooms: ', chatrooms);

//         return chatrooms;
//     } catch (error) {
//         console.error('Error getting chatrooms: ', error);
//     }
//     return [];
// }

import firestore from '@react-native-firebase/firestore';

export const getChatRoomList = (userId, onChatRoomsUpdate) => {
    try {
        const unsubscribe = firestore()
            .collection('chatRooms')
            .where('participants', 'array-contains', userId)
            // .orderBy('timestamp', 'asc')
            .onSnapshot(async(snapshot) => {
                const chatrooms = await Promise.all(snapshot.docs.map(async(doc) => {
                    const data = doc.data();  
                    const otherUserId = data.participants.find(id => id !== userId);

                    const otherUser = await firestore()
                        .collection('users')
                        .doc(otherUserId)
                        .get();

                    console.log('chat other user: ', otherUser._data.displayName);
                    // const otherUserData = otherUser.data();

                    return {
                        id: doc.id,
                        ...doc.data(),
                        otherUserId,
                        otherUserName: otherUser._data.displayName,
                    }
                }));

                console.log('chatrooms updated: ', chatrooms);
                onChatRoomsUpdate(chatrooms); // 업데이트된 데이터를 콜백으로 전달
            }, error => {
                console.error('Error getting chatrooms: ', error);
            });

        return unsubscribe; // 컴포넌트에서 정리할 때 호출할 수 있도록 반환
    } catch (error) {
        console.error('Error setting up chatroom listener: ', error);
    }
}
