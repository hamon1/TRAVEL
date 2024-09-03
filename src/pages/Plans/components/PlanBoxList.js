// import React from 'react';
// import {FlatList, View, Text, StyleSheet, EmptyView} from 'react-native';

// import PlanBox from './PlanBox';
// import BoxesItem from './BoxesItem';

// function PlanBoxList({boxes}) {
//   return (
//       <FlatList
//         ItemSeparatorComponent={() => <View style={style.separator}/>}
//         style={style.list}
//         data={boxes}
//         renderItem={({item}) => (
//           <BoxesItem id={item.id} text={item.text}/>
//         )}
//         keyExtractor={item => item.id.toString()}
//       />
//   );
// }

// const style = StyleSheet.create({
//   list: {
//     backgroundColor: 'white',
//     flex: 1,
//   },
//   separator: {
//     backgroundColor: '#e0e0e0',
//     height: 1,
//   },
// });

// export default PlanBoxList;