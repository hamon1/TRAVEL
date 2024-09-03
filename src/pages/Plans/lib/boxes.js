// import firestore from '@react-native-firebase/firestore';

// const boxCollection = firestore().collection('boxes');


// export function createBox({description}) {
//     return boxCollection.add({
//         description,
//         createdAt: firestore.FieldValue.serverTimestamp(),
//     });
// }
// export function createRestBox({checkIn, checkOut}) {
//     return boxCollection.add({
//         checkIn,
//         checkOut,
//         createdAt: firestore.FieldValue.serverTimestamp(),
//     });
// }

// export async function getBoxes() {
//     const snapshot = await boxCollection.orderBy('createdAt', 'asc').get();
//     const boxes = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//     }));
//     return boxes;
// }

// export async function getNewerBoxes(id) {
//     const cursorDoc = await boxCollection.doc(id).get();
//     const snapshot = await boxCollection
//         .orderBy('createdAt', 'asc')
//         .endBefore(cursorDoc)
//         .get();
    
//     const boxes = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//     }));

//     return boxes;
// }

// export function removeBoxes(id) {
//     return boxCollection.doc(id).delete();
// }