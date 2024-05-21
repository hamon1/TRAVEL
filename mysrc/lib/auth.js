import auth from '@react-native-firebase/auth';

export function signIn({email, password}) {
    return auth().signInWithEmailAndPassword(email, password);
}

export function signUp({emil, password}) {
    return auth().createUserWithEmailAndPassword(emil, password);
}

export function subscribeAuth(callback) {
    return auth().onAuthStateChanged(callback);
}

export function signOut() {
    return auth().signOut();
}