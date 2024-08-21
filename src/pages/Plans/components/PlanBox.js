import React, {useMemo} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Alert,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { removeBoxes } from '../lib/boxes';
import useBoxesActions from './useBoxesActions';
import ActionSheetModal from './ActionSheetModal';

const PlanBox = ({description, id}) => {
  const navigation = useNavigation();

  const {isSelecting, onPressMore, onClose, actions} = useBoxesActions({
    id,
    description,
  });

  return (
    <>
        <View>
            <TouchableOpacity
                style={styles.section}>
                <Text style={styles.text_Name}>{description}</Text>
                <View style={styles.dateBox}>
                </View>
            </TouchableOpacity>
            <Pressable style={styles.icon} hitSlop={8} onPress={onPressMore}>
                <Icon name='more-vert' size={24} color="black" />
            </Pressable>
        </View>
        <ActionSheetModal
            visible={isSelecting}
            actions={actions}
            onClose={onClose}
        />
    </>
  );
};

const styles = StyleSheet.create({
  section: {
    top: 10,
    bottom: 10,
    backgroundColor: '#FFE99C',
    marginLeft: 140,
    marginBottom: 10,
    borderRadius: 15,
    height: 112,
    width: '60%',
    shadowColor: '#4d4d4d',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  text_Name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    top: 22,
    left: 20,
  },
  // text: {
  //   fontSize: 14,
  //   color: '#616161',
    // top: 30,
    // left: 20,
  // },
  icon: {
    width: 24,
    height: 24,
    position: 'absolute',
    top: 24,
    right: 20,
    // backgroundColor: 'blue',
  },
  dateBox: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red',
    paddingLeft: 14,
    top: 30,
  },
  dateText: {
    fontWeight: '400',
    fontSize: 12,
    marginLeft: 10,
    color: '#616161',
  },
});

export default PlanBox;
