import firestore, { getFirestore, collection, query, where, getDocs } from '@react-native-firebase/firestore';

const db = getFirestore();

export async function searchUser(username, id, userId_now) {
    const userRef = collection(db, "users");
    const q = query(userRef, where("displayName", "==", username));

    const users = [];

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        users.push({ id: doc.id,...doc.data() });
    });


    return users;
}