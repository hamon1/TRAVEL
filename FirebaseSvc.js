import firebase from 'firebase';

class FirebaseSvc {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: 'AIzaSyA6KYx2C79pilr3oKCclescFuwN15HLJdg',
        authDomain: 'trip-buddy-104fa.firebaseapp.com',
        databaseURL: 'https://trip-buddy-104fa-default-rtdb.firebaseio.com',
        projectId: 'trip-buddy-104fa',
        storageBucket: 'trip-buddy-104fa.appspot.com',
        messagingSenderId: '586483047814',
        appId: '1:586483047814:web:a7c646712884569b1fe007',
        measurementId: 'G-8DCJ5R954T',
      });
    }
  }
  login = async (user, success_callback, failed_callback) => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(success_callback, failed_callback);
  };
}
const firebaseSvc = new FirebaseSvc();
export default firebaseSvc;
