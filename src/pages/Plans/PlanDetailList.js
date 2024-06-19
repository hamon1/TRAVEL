import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

import SearchPlace from './SearchPlace';

const PlanDetail = () => {
  return <View style={styles.block}></View>;
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  blackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: 0.5,
    position: 'absolute',
    zIndex: -1,
  },
  container: {
    backgroundColor: 'white',
    width: 300,
    borderRadius: 15,
    shadowColor: '#4d4d4d',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
  },
  section: {
    // backgroundColor: 'yellow',
    width: 300,
    height: 40,
    // alignItems: 'center',
    // alignContent: 'center',
    justifyContent: 'center',
  },
  sectionText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
    // height: 40,
    // backgroundColor: 'green',
  },
});

export default PlanDetail;
