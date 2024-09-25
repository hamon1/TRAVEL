// import React, { useEffect } from 'react';
// import PushNotification from 'react-native-push-notification';
// import firestore from '@react-native-firebase/firestore';

// import PushNotificationIOS from '@react-native-community/push-notification-ios';

// const PlanNotification = async(userId, planId) => {
//     console.log('PlanNotification / ', userId, planId);

//     if (planId === null) {
//         console.log('No user or planId signed in');
//         return;
//     }

//     // useEffect(() => {
//         try {
//             const fetchPlans = async () => {
//                 const plansSnapshot = await firestore()
//                     .collection('users')
//                     .doc(userId)
//                     .collection('plans')
//                     .doc(planId)
//                     .collection('planDetails')
//                     .get();
    
//                 // const plansData = plansSnapshot.data();
//                 const plansData = plansSnapshot.docs.map(doc => doc.data());
//                 scheduleNotifications(plansData);
//             };
//             fetchPlans();
//             console.log('Notification fetch plans');
            
//         }catch {(error) => 
//         console.error('Error fetching plans:', error);}
//     // }, [userId, planId]);

//     const scheduleNotifications = (plansData) => {
//         plansData.forEach(plan => {
//             const dataStr = plan.date_sorting;
//             const [year, month, day, hour, minute] = dataStr.split('-');
//             const planDate = new Date(`${year}-${month}-${day}T${hour}:${minute}:00`);

//             PushNotification.localNotificationSchedule({
//                 title: plan.title,
//                 message: `"${plan.title}"을(를) 시작할 시간입니다!`,
//                 date: planDate,
//                 allowWhileIdle: true,
//             });
//         });
//     };
//         return null;
// };

// export default PlanNotification;