import firestore, { deleteDoc } from "@react-native-firebase/firestore";

export const onRemove = async({planId, dataId}) => {
    try {
        if (planId && item.DataId) {
            const doc = await firestore()
                .collection('plans')
                .doc(planId)
                .collection('planDetails')
                .doc(dataId);
            deleteDoc(doc);
            console.log('Document deleted!');
        }
        else {
            console.log('No planId or dataId');
        }
    }catch(err) {
        console.log(err);
    }

}