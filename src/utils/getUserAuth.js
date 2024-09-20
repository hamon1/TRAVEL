/** 
 * 유저 정보 가져오는 함수. 
 * 유저의 id 정보를 가져와 리턴함.
 */


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