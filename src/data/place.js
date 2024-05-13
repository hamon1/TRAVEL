import firestore from '@react-native-firebase/firestore';

export const placeCollection = firestore().collection('place');

export function createPlace({id, name, text, photoURL}) {
  return placeCollection.doc(id).set({
    id,
    name,
    text,
    photoURL,
  });
}

export async function getPlace(id) {
  const doc = await placeCollection.doc(id).get();
  return doc.data();
}
