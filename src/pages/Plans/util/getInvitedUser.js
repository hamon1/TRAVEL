import firestore, {query, orderBy, doc, deleteDoc, getDocs, collection} from '@react-native-firebase/firestore';

export const getInvitedUser = async({topUserId, docId}) => {
    const planDocRef = await firestore()
        .collection('users')
        .doc(topUserId)
        .collection('plans')
        .doc(docId);
    
    let userList = [];

    const docSnapshot = await planDocRef.get();
    console.log('invited', docSnapshot._data.participants);

    userList = docSnapshot._data.participants;

    return userList;
}