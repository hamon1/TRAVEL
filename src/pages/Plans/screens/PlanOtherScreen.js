// import React, { useContext } from "react";
// import { 
//     StyleSheet, 
//     View , 
//     Pressable,
//     Text,
//     } from "react-native";
// import PlanOtions from "../components/PlanOptions";
// import BoxCtxProvider from "../components/BoxCtx";

// import firestore, {query, orderBy, doc, deleteDoc} from '@react-native-firebase/firestore';

// import moment from 'moment';

// const onInsert = async () => {
//     try {
//       const nextId = plan.length > 0 ? Math.max(...plan.map(p => p.pid)) + 1 : 1;
//       const newPlan = {
//         pid: nextId.toString(),
//         userId: 0,
//         type: 'trans',
//         trans: 'train',
//         d_month: 1,
//         d_day: 22,
//         date: moment().format('l'),
//         time: moment().format('LT'),
//         timestamp: new Date(),
//       };
//       await firestore()
//       .collection('plans')
//       .doc(route.params.docId)
//       .collection('planDetails')
//       .add(newPlan);
//       console.log("Inserted plan: " + newPlan.id + "date: " + newPlan.timestamp + newPlan.date);
//     } catch (error) {
//       console.error("Error adding plan: " + error);
//     }
//   };

// function  PlanOherScreen() {
//     return (
//         <View>
//             <PlanOtions />
//         </View>
//     )
// };

// const styles = StyleSheet.create({

// });

// export default PlanOherScreen;