import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';



export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 추가

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleLogin = () => {
    if (email === 'user@example.com' && password === 'password') {
      setIsLoggedIn(true); // 로그인 상태로 변경
      Alert.alert('로그인 성공!');
    } else {
      Alert.alert('이메일 또는 비밀번호가 잘못되었습니다.');
    }
  };

  const handleSignUp = () => {
    setIsSignUp(true);
    Alert.alert('회원가입 완료!');
  };

  // 메인 화면
  if (isLoggedIn) {
    return (
      <View>
       <View style={styles.inputContainer}>
         <TextInput
            style={styles.input}
            placeholder="검색하기"
            // 검색 기능 추가
         />
          <Button title='검색'/>
        </View>
        <View style={styles.container}>
          <Text>메인화면</Text>
        </View>
      </View>
    );
  }

  // 로그인 화면
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="이메일"
        onChangeText={handleEmailChange}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        onChangeText={handlePasswordChange}
        value={password}
        secureTextEntry={true}
      />
      {isSignUp ? (
        <Button title="로그인" onPress={handleLogin} />
      ) : (
        <Button title="회원가입" onPress={handleSignUp} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
  inputContainer: {
    padding: 50,
    flexDirection: 'row'
  },
});
