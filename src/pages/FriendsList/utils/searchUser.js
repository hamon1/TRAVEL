

import firestore, { getFirestore, collection, query, where, getDocs } from '@react-native-firebase/firestore';

const db = getFirestore();

/**
 * 유저 검색 함수
 * @param {string} username - 검색할 유저의 이름(부분 문자열 검색 가능)
 * @param {string} id - 추가적인 아이디(사용되지 않음)
 * @param {string} userId_now - 현재 로그인한 유저의 아이디
 * @returns {Array} - 검색된 유저 리스트
 */

export async function searchUser(username, id, userId_now) {
    const userRef = collection(db, "users");
    // const q = query(userRef, where("displayName", "==", username));

    if (username.length > 0) {
        console.log("Search keyword: " + username.length);
        // 검색어로 시작하는 사용자를 찾기 위한 쿼리
        const q = query(
            userRef, 
            where("displayName", ">=", username),  // displayName이 검색어보다 크거나 같은 값 (검색어로 시작하는 문자열 포함)
            where("displayName", "<", username + '\uf8ff') // displayName이 검색어로 시작하는 범위의 문자열 설정 ('\uf8ff'는 유니코드의 가장 큰 값)
        );
    
        const users = [];
    
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            users.push({ id: doc.id,...doc.data() });
        });
    
    
        return users;
        
    } else {
        console.log("Search keyword is empty");
        return [];
    }
}