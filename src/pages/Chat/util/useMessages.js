import { useEffect, useState } from "react";
import firestore from '@react-native-firebase/firestore';

export const useMessages = (chatRoomId) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('chatRooms')
            .doc(chatRoomId)
            .collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot((snapshot) => {
                // setMessages(snapshot.docs.map((doc) => doc.data()));
                const messagesArray = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                })
            );
            setMessages(messagesArray);
        });
        return () => unsubscribe();
    }, [chatRoomId]);

    return messages;
};