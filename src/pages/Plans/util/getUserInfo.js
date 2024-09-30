import firestore, {query, orderBy, doc, deleteDoc, getDocs, collection} from '@react-native-firebase/firestore';

export const getUserInfo = async({id}) => {
    const userRef = await firestore()
        .collection('users')
        .doc(id);

    let userInfo = [];

    const docSnapshot = await userRef.get();
    console.log('user info:', docSnapshot._data);
    userInfo = docSnapshot._data;

    return userInfo;
}