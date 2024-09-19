// firebase 내의 필드 값을 찾는 함수.
// plans-docId-planDetails-dataId 내의 필드 값을 겁색해 찾는다

// 입력값: docId, dataId, fieldKey(찾고자하는 필드의 키)
// 출력값: 찾고자했던 필드의 value

import firestore from '@react-native-firebase/firestore';

export const getFieldFromDoc = async(docId, dataId, fieldKey) => {
    try {
        const documentSnapshot = await firestore()
            .collection('plans')
            .doc(docId)
            .collection('planDetails')
            .doc(dataId)
            .get();

        if (documentSnapshot.exists) {
            const data = documentSnapshot.data();

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