import {View, Button, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function MoveHome() {
    const navigation = UseNavigation();
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('HomeScreen')}>
        <Text>home</Text>
      </TouchableOpacity>
    );
  }
export default MoveHome;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'black',
    width: 42,
    height: 42,
  },
});
