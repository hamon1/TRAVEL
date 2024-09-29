import firestore, {query, orderBy, doc, deleteDoc, getDocs, collection} from '@react-native-firebase/firestore';

export const addFriendToPlan = async (planId, friendId, userId) => {
    console.log('addFriendToPlan / ', planId, friendId);
    const planRef = firestore()
        .collection('users')
        .doc(userId)
        .collection('plans')
        .doc(planId);

    await planRef.update({
        participants: firestore.FieldValue.arrayUnion(friendId),
    });

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