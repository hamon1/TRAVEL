/**
 * users/userId/friends에 친구 데이터 필드를 추가하는 코드
 * 
 * friendSince
2024년 9월 25일 오전 10시 25분 42초 UTC+9
(타임스탬프)


pid
"9G0uuT2KEgbC7J1hYxed"
(문자열)


userId
"AaE7nqUXJYaN41pGldmETw1Ft422"
(문자열)


userName
":)"

형태의 데이터가 저장됨.
 */

import firestore, {query, orderBy, doc, deleteDoc, getDocs, collection} from '@react-native-firebase/firestore';
import auth, { getAuth } from '@react-native-firebase/auth';
import { useUserContext } from '../../../components/UserContext';

import { searchUser } from './searchUser';

// import { getUserAuth } from '../../../utils/getUserAuth';

export async function addFriend(userId, userIdToAdd, userNameToAdd, userPhotoUrlToAdd, onToast) {
    console.log('adding friend');

    console.log('User ID:', userId);
    console.log('User ID to add:', userIdToAdd);

    if (userId) {
        console.log('adding friend / user?:', userId, userNameToAdd, userPhotoUrlToAdd);

        if (userId === userIdToAdd) {
            console.log('Cannot add friend with yourself');
            return;
        }

        const friendDoc = {
            userId: userIdToAdd,
            userName: userNameToAdd,
            // userPhotoUrl: userPhotoUrlToAdd,
            friendSince: new Date(),
        };

        console.log('new doc');

        try {
            const friendCollectionRef = await firestore()
                .collection('users')
                .doc(userId)
                .collection('friends');

            const querySnapshot = await friendCollectionRef
                .where('userId', '==', userIdToAdd).get();

            // console.log('query snapshot / friendCollectionRef: ', friendCollectionRef.empty);
            console.log('querySnapshot: ', querySnapshot);

            if (!querySnapshot.empty) {
                onToast();
                console.log('already added friend');
                return;
            }

            const docRef = await friendCollectionRef
            .add(friendDoc);

            console.log('added friend', docRef.id);

            await firestore()
                .collection('users')
                .doc(userId)
                .collection('friends')
                .doc(docRef.id)
                .update({
                    pid: docRef.id,
                })
        } catch (err) {
            console.error('Error adding friend: ', err);
        }

        // await setDoc(friendDoc, {
        //     friendSince: new Date(),
        // });
    }
    else {
        console.log('No user signed in');
    }

}