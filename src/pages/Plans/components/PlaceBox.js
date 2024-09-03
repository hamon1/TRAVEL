// import React, {useState, useEffect} from "react";
// import {View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Pressable} from 'react-native';

// import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

// import firestore, {query, orderBy, doc, deleteDoc} from '@react-native-firebase/firestore';

// const WINDOW_WIDTH = Dimensions.get('screen').width;
// const BOX_WIDTH = WINDOW_WIDTH * 2/3;
// const EMPTYPLACE = WINDOW_WIDTH - BOX_WIDTH;

// const PlaceBox = ({docId}) => {
//     const [plan, setPlan] = useState(null);

//     useEffect(() => {
//         const fetchPlanDetails = async () => {
//           try {
//             // const querySnapshot = await firestore()
//             //   .collection('plans')
//             //   .where('pid', '==', route.params.id)
//             //   .get();
      
//             // if (true) {
//             //   const doc = querySnapshot.docs[0]; // 겹치는 문서는 없을 예정이기 때문에 첫 문서를 가져옴
//             //   const docId = doc.id;
//             //   setDocId(docId);
//             //   console.log('docId', docId);
      
//               // 하위 컬렉션(planDetails)에서 데이터 가져오기
//               const unsubscribe = firestore()
//                 .collection('plans')
//                 .doc(docId)
//                 .collection('planDetails')
//                 .onSnapshot(snapshot => {
//                   const fetchedPlans = snapshot.docs.map(detailDoc => ({
//                     id: detailDoc.id,
//                     ...detailDoc.data(),
//                   }));
//                   setPlan(fetchedPlans); // 상태 업데이트
//                   console.log('Fetched planDetails', fetchedPlans);
//                 }, error => {
//                   console.error("Error fetching planDetails: ", error);
//                 });
      
//               // Clean up the subscription
//               return () => unsubscribe();
//             // } else {
//             //   console.log("No document matches the query.");
//             // }
//           } catch (error) {
//             console.error("Error fetching plans: ", error);
//           }
//         };
      
//         fetchPlanDetails();
//         console.log('?', plan);
//       }, []);
      
//     // console.log(docId);
//     return (
//         <View style={styles.container}>
//             <View style={styles.line_section}>
//                 <View style={styles.line}></View>
//                 <View>
//                 <View style={styles.time}>
//                     <Text>00:00</Text>
//                 </View>
//             <Image
//           style={styles.dot_image}
//           source={require('../assets/place_dot.png')}
//           />
//           </View>
//             </View>


//         <Pressable style={styles.Box}>
//             <View style={styles.text}>
//                 <View style={styles.textline_1}>
//                     <View style={styles.place_name_text_box}>
//                         <Text style={styles.place_name_text}>{plan[0].placeName}</Text>
//                     </View>
//                     <View style={styles.date_box}>
//                         <Text>24-00-00</Text>
//                     </View>
//                 </View>
//                 <View style={styles.textline_2}>
//                     <Text >{plan[0].address}</Text>
//                 </View>
//             </View>
//             <View style={styles.image}>
//             <MapView
//               style={styles.image_map}
//               provider={PROVIDER_GOOGLE}
//               initialRegion={{
//                 //   latitude: 37.78825,
//                 //   longitude: -122.4324,
//                   latitude: plan[0].lat,
//                   longitude: plan[0].lng,
//                   latitudeDelta: 0.9,
//                   longitudeDelta: 0.9,
//                 }}
//                 />
//             </View>
//         </Pressable>
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         width: '100%',
//         // backgroundColor: 'green',
//         flexDirection: 'row',
//         paddingBottom: 16,
//         paddingTop: 16,
//     },
//     line_section: {
//         width: EMPTYPLACE,
//         alignItems: 'center',
//     },
//     time: {
//         position: 'absolute',
//         top: 12,
//         left: -34,
//     },
//     line: {
//         width: 10,
//         height: 200 + 40,
//         backgroundColor: '#FCD035',
//         position: 'absolute',
//         top: 20,
//         zIndex: 0,
//     },
//     dot_image: {
//         width: 40,
//         height: 40,
//         zIndex: 1000,
//     },
//     Box: {
//         backgroundColor: '#d9d9d9',
//         width: BOX_WIDTH,
//         height: 200,
//         borderRadius: 15,
//         padding: 10,
//         right: 24,
//         // justifyContent: 'center',
//         // alignItems: 'center',
//     },
//     text: {
//         // backgroundColor: 'yellow',
//         margin: 8,
//     },
//     textline_1: {
//         flexDirection: 'row',
//         marginBottom: 10,
//     },
//     place_name_text_box: {
//         // backgroundColor: 'magenta',
//         marginRight: 10,
//     },
//     place_name_text: {
//         fontWeight: 'bold',
//         fontSize: 15,
//     },
//     date_box: {
//         // backgroundColor: 'blue',
//         left: 10,
//     },
//     date_text: {
//         fontWeight: '100',
//     },
//     textline_2: {
//         // backgroundColor: 'green',
//     },
//     image: {
//         alignItems: 'center',
//         margin: 8,
//         // backgroundColor: 'red',
//         // position: 'absolute',
//         // bottom: -50,
//         // backgroundColor: 'blue',
//         // position: 'absolute',
//         // top: -50,
//     },
//     image_map: {
//         width: BOX_WIDTH - 26,
//         height: 112,
//         borderRadius: 15,
//         // marginBottom: 10,
//     }

// })

// export default PlaceBox;


import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Pressable, Dimensions, ActivityIndicator } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
// import firestore from '@react-native-firebase/firestore';

const WINDOW_WIDTH = Dimensions.get('screen').width;
const BOX_WIDTH = WINDOW_WIDTH * 2 / 3;
const EMPTYPLACE = WINDOW_WIDTH - BOX_WIDTH;

const PlaceBox = ({ item }) => {
    // const [plan, setPlan] = useState([]);
    // const [loading, setLoading] = useState(true); // 로딩 상태 추가

    // useEffect(() => {
    //     const fetchPlanDetails = async () => {
    //         try {
    //             const unsubscribe = firestore()
    //                 .collection('plans')
    //                 .doc(docId)
    //                 .collection('planDetails')
    //                 .onSnapshot(snapshot => {
    //                     const fetchedPlans = snapshot.docs.map(detailDoc => ({
    //                         id: detailDoc.id,
    //                         ...detailDoc.data(),
    //                     }));
    //                     setPlan(fetchedPlans); // 상태 업데이트
    //                     setLoading(false); // 데이터 패칭 완료 후 로딩 상태를 false로 변경
    //                     console.log('Fetched planDetails', fetchedPlans);
    //                 }, error => {
    //                     console.error("Error fetching planDetails: ", error);
    //                     setLoading(false); // 에러 발생 시에도 로딩 상태를 false로 변경
    //                 });

    //             return () => unsubscribe();
    //         } catch (error) {
    //             console.error("Error fetching plans: ", error);
    //             setLoading(false);
    //         }
    //     };

    //     fetchPlanDetails();
    // }, [docId]);

    // if (loading) {
    //     return (
    //         <View style={styles.loadingContainer}>
    //             <ActivityIndicator size="large" color="#0000ff" />
    //         </View>
    //     );
    // }

    // if (plan.length === 0) {
    //     return (
    //         <View style={styles.container}>
    //             <Text>No plan details available.</Text>
    //         </View>
    //     );
    // }

    return (
        <View style={styles.container}>
            <View style={styles.line_section}>
                <View style={styles.line}></View>
                <View>
                    <View style={styles.time}>
                        <Text>00:00</Text>
                    </View>
                    <Image
                        style={styles.dot_image}
                        source={require('../assets/place_dot.png')}
                    />
                </View>
            </View>

            <Pressable style={styles.Box}>
                <View style={styles.text}>
                    <View style={styles.textline_1}>
                        <View style={styles.place_name_text_box}>
                            {/* <Text style={styles.place_name_text}>{plan[0].placeName}</Text> */}
                            <Text style={styles.place_name_text}>{item.placeName}</Text>
                        </View>
                        <View style={styles.date_box}>
                            <Text>{item.d_date}</Text>
                        </View>
                    </View>
                    <View style={styles.textline_2}>
                        <Text>{item.address}</Text>
                    </View>
                </View>
                <View style={styles.image}>
                    <MapView
                        style={styles.image_map}
                        provider={PROVIDER_GOOGLE}
                        initialRegion={{
                            latitude: item.lat,
                            longitude: item.lng,
                            latitudeDelta: 0.05,
                            longitudeDelta: 0.05,
                        }}
                    />
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        paddingBottom: 16,
        paddingTop: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    line_section: {
        width: EMPTYPLACE,
        alignItems: 'center',
    },
    time: {
        position: 'absolute',
        top: 12,
        left: -34,
    },
    line: {
        width: 10,
        height: 240,
        backgroundColor: '#FCD035',
        position: 'absolute',
        top: 20,
        zIndex: 0,
    },
    dot_image: {
        width: 40,
        height: 40,
        zIndex: 1000,
    },
    Box: {
        backgroundColor: '#d9d9d9',
        width: BOX_WIDTH,
        height: 200 + 16,
        borderRadius: 15,
        padding: 10,
        right: 24,
    },
    text: {
        margin: 8,
    },
    textline_1: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    place_name_text_box: {
        marginRight: 10,
    },
    place_name_text: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    date_box: {
        left: 10,
    },
    date_text: {
        fontWeight: '100',
    },
    textline_2: {},
    image: {
        alignItems: 'center',
        margin: 8,
    },
    image_map: {
        width: BOX_WIDTH - 26,
        height: 112,
        borderRadius: 15,
        borderWidth: 0.2,
        borderColor: 'gray',
    }
});

export default PlaceBox;