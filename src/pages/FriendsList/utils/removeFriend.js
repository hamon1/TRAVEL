/**
 * users/userId/friends/userIdToRemove 에 해당하는 문서를 삭제하는 코드
 * 즉, 해당 친구를 친구 목록에서 삭제한다.
 */

import firestore, {query, orderBy, doc, deleteDoc} from '@react-native-firebase/firestore';

export const removeFriend = (userId, userIdToRemove) => {
    try {
        if (userId && userIdToRemove) {
        const friendDoc = firestore()
            .collection('users')
            .doc(userId)
            .collection('friends')
            .doc(userIdToRemove);

        deleteDoc(friendDoc);
        console.log('Friend Document deleted!');
    }else {
        console.log('No user or friend id');
        // return;
    }
            
    } catch (err) {
        console.error(err);
    }
    
}