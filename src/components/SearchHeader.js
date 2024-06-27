import React, {useContext} from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  View,
  Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SearchContext from '../context/SearchContext';

function SearchHeader() {
  const {keyword, onChangeText} = useContext(SearchContext);

  return (
    <View style={styles.block}>
      <TextInput
        style={styles.input}
        placeholder="유저 아이디를 입력하세요"
        value={keyword}
        onChangeText={onChangeText}
        autoFocus
      />
      <Pressable
        style={({pressed}) => [styles.button, pressed && {opacity: 0.5}]}
        onPress={() => onChangeText('')}>
        <Icon name="cancel" size={18} color="#9e9e9e" />
      </Pressable>
      <Pressable
        style={({pressed}) => [styles.button, pressed && {opacity: 0.5}]}>
        <Icon name="search" size={26} color="black" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    shadowColor: '#4d4d4d',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.05,
    shadowRadius: 4,
    zIndex: 999,
    // top: 30,
  },
  input: {
    flex: 1,
    // backgroundColor: 'blue',
  },
  button: {
    marginLeft: 8,
  },
});

export default SearchHeader;
