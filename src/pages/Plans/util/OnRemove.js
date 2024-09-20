/**
 * 플랜 내부의 detail plan box를 삭제하는 코드.
 * 
 * type을 검색해 type == 'rantalHome' 인 경우에는 checkin, checkout을 모두 찾아 제거함.
 */

import firestore, { deleteDoc } from "@react-native-firebase/firestore";

import { getFieldFromDoc } from "./getFieldFromDoc";
import { getUserAuth } from "../../../utils/getUserAuth";

import auth from '@react-native-firebase/auth';

const onRemove = async({planId, dataId}) => {
    const currentUser = auth().currentUser;
    if (!currentUser) {
        console.log('No user signed in');
        return;
    }

    // const userId = getUserAuth();
    const userId = currentUser.uid;

    console.log ('onRemove', planId, dataId, userId);
    try {
        if (planId && dataId) {
            const plan = await firestore()
                .collection('users')
                .doc(userId)
                .collection('plans')
                .doc(planId)

            console.log('onremove');

            const type = await getFieldFromDoc(planId, dataId, 'type');

            if (type === 'rantalHome') {
                const checkId = await getFieldFromDoc(planId, dataId, 'checkId');

                console.log('onRemove, type == rantalHome: ', checkId);

                const doc = 
                // await firestore()
                //     .collection('plans')
                //     .doc(planId)
                plan
                    .collection('planDetails')
                    .doc(dataId);
                deleteDoc(doc);
                console.log('Document deleted!');

                const doc_check = 
                // await firestore()
                //     .collection('plans')
                //     .doc(planId)
                plan
                    .collection('planDetails')
                    .doc(checkId);
                deleteDoc(doc_check);
                console.log('Document deleted!');

            } else {
                const doc = 
                // await firestore()
                //     .collection('plans')
                //     .doc(planId)
                plan
                    .collection('planDetails')
                    .doc(dataId);
                deleteDoc(doc);
                console.log('Document deleted!');
            }

        }
        else {
            console.log('No planId or dataId');
        }
    }catch(err) {
        console.log(err);
    }

}

export { onRemove };