import React from 'react';
import firestore, {query, orderBy, doc, deleteDoc} from '@react-native-firebase/firestore';


export const fetchPlanDetails = async ({userId, pid}) => {
    try {
      console.log('fetching plan details:', pid);
      
      // if (!route.params || !route.params.id) {
      //   throw new Error("Invalid or missing route parameter: id");
      // }
      // if (!route.params.id)
      const querySnapshot = await firestore()
        .collection('users')
        .doc(userId)
        .collection('plans')
        .where('pid', '==', pid)
        .get();

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0]; // 겹치는 문서는 없을 예정이기 때문에 첫 문서를 가져옴
        const docId = doc.id;
        setDocId(docId);
        console.log('docId', docId);

        const planData = doc.data();
        setChatRoomId(planData.chatRoomId);
        setUserCount(planData.participants.length);

        console.log('chatRoomId', planData.chatRoomId);

        planId = docId;

        // 하위 컬렉션(planDetails)에서 데이터 가져오기
        const unsubscribe = firestore()
          .collection('users')
          .doc(userId)
          .collection('plans')
          .doc(docId)
          .collection('planDetails')
          .orderBy('date_sorting', 'asc')
          .onSnapshot(snapshot => {
            const fetchedPlans = snapshot.docs.map(detailDoc => ({
              id: detailDoc.id,
              ...detailDoc.data(),
            }));
            setPlan(fetchedPlans); // 상태 업데이트
            console.log('Fetched planDetails:', fetchedPlans);
          }, error => {
            console.error("Error fetching planDetails: ", error);
          });

        return () => unsubscribe();
      } else {
        console.log("No document matches the query.");
      }
    } catch (error) {
      console.error("Error fetching plans: ", error);
    }
  };

