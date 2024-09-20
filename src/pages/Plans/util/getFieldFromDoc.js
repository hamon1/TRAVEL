/**
 * firebase의 user/userId/plans/docId/planDetails/dataId 내의 원하는 fieldKey값의 value를 찾아 출력.
 */


import firestore from '@react-native-firebase/firestore';

import auth from '@react-native-firebase/auth';

export const getFieldFromDoc = async(docId, dataId, fieldKey) => {
    const currentUser = auth().currentUser;
    if (!currentUser) {
        console.log('No user signed in');
        return;
    }

    // const userId = getUserAuth();
    const userId = currentUser.uid;
    console.log('getFieldFromDoc: userId: ', userId);

    try {
        const documentSnapshot = await firestore()
            .collection('users')
            .doc(userId)
            .collection('plans')
            .doc(docId)
            .collection('planDetails')
            .doc(dataId)
            .get();

        if (documentSnapshot.exists) {
            const data = documentSnapshot.data();
            console.log('getFieldFromDoc: data: ', data);

            const specificField = data[fieldKey];
            console.log('Field value: ', specificField);
            return specificField;
        } else {
            console.log('No such document!');
            return null;
        } 
    } catch (error) {
        console.error('Error getting document: ', error);
    }
};