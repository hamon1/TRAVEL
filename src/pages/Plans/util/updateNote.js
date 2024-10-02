import firestore, {query, orderBy, doc, deleteDoc} from '@react-native-firebase/firestore';

export const updateNote = async(userId, docId, detailPlanId, text) => {
    console.log('updateNote / ', userId, docId, detailPlanId);
    const planRef = firestore()
        .collection('users')
        .doc(userId)
        .collection('plans')
        .doc(docId)
        .collection('planDetails')
        .doc(detailPlanId);

    try {
        await planRef.update({ memo: text });
        console.log("Updated note-> " + detailPlanId);
    } catch (error) {
        console.error("Error updating note: " + error);
    }
}