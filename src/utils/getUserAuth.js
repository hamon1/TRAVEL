import auth, { getAuth } from '@react-native-firebase/auth';
import { useUserContext } from '../components/UserContext';

export const getUserAuth = () => {
    const { user } = useUserContext();
    const auth = getAuth();
//   const user = auth.currentUser;
    console.log(auth);
    console.log('user(./uils/getUserAuth.js): ' + user.id);

    return user.id;
}