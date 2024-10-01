import firestore, {query, orderBy, doc, deleteDoc, getDocs, collection} from '@react-native-firebase/firestore';

import { createChatRoom } from '../../Chat/util/createChatRoom';

export const addFriendToPlan = async (planId, friendId, userId) => {
    console.log('addFriendToPlan / ', planId, friendId);
    const planRef = firestore()
        .collection('users')
        .doc(userId)
        .collection('plans')
        .doc(planId);

    console.log('addFriendToPlan');

    await planRef.update({
        participants: firestore.FieldValue.arrayUnion(friendId),
    });

    // console.log('userCount', await planRef.get());

    const planData = await planRef.get();

    const userCount = planData._data.participants.length;

    console.log('userCount', userCount);

    if (userCount === 2) {
        console.log('create chat room');
        const chatRoomId = await createChatRoom(userId, friendId, true, planId);
        console.log('chat roomId', chatRoomId);
        await planRef.update({
            chatRoomId: chatRoomId,
        });
        console.log('chat room updated');
    }

    const friendRef = firestore()
        .collection('users')
        .doc(friendId)
        .collection('guestPlan')
        .doc(planId);
    const docSnapshot = await friendRef.get();

    if (!docSnapshot.exists) {
        await friendRef.set({
            planId: planId,
            TopUserId: userId,
        });
        console.log('add friend to plan success');
    } else {
        console.log('already added');
    }
}