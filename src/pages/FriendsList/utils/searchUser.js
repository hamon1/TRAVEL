import { getFirestore, collection, query, where, getDocs } from '@react-native-firebase/firestore';

const db = getFirestore();

export async function searchUser(username) {
    const userRef = collection(db, "users");
    const q = query(userRef, where("displayName", "==", username));

    const querySnapshot = await getDocs(q);
    const users = [];

    querySnapshot.forEach((doc) => {
        users.push({ id: doc.id,...doc.data() });
    });

    return users;
}