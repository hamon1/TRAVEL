import React, { useState } from "react";
import { 
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    View,   
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SignButtons from "../../components/SIgnButtons";
import SignInForm from "../../components/SignForm";
import {signIn, signUp} from '../../lib/auth';
import { createUser, getUser } from "../../lib/users";
import { useUserContext } from "../../components/UserContext";

function SignInScreen({navigation, route}) {
    const {isSignUp} = route.params || {};
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState();
    const {setUser} = useUserContext();
    
    const createChangeTextHandler = (name) => (value) => {
        setForm({...form, [name]: value});
    };
    const onSubmit = async () => {
        Keyboard.dismiss();

        const {email, password, confirmPassword} = form;

        if (isSignUp && password !== confirmPassword) {
            Alert.alert('실패', '비밀번호가 일치하지 않습니다');
            return;
        }

        setLoading(true);
        const info = {email, password};

        try {
            const {user} = isSignUp ? await signUp(info) : await signIn(info);
            const profile = await getUser(user.uid);
            if (!profile) {
                navigation.navigate('Welcome', {uid: user.uid});
            } else {
                setUser(profile);
            }
        } catch (e) {
            const messages = {
            'auth/email-already-in-use' : '이미 가입된 이메일입니다.',
            'auth/wrong-password' : '잘못된 비밀번호입니다.',
            'auth/user-not-found' : '존재하지 않는 계정입니다.',
            'auth/invalid-email' : '유효하지 않은 이메일 주소입니다.',
        };
        const msg = messages[e.code];
        Alert.alert('실패', msg);
        //navigation.navigate('MainTab'); // 삭제 예정
        navigation.navigate('Welcome');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.KeyboardAvoidingView}
            behavior={Platform.select({ios: 'padding'})}>
            <SafeAreaView style={styles.fullscreen}>
                <Text style={styles.text}>TRAVEL</Text>
                    <View style={styles.form}>
                        <SignInForm
                            isSignUp={isSignUp}
                            onSubmit={onSubmit}
                             form={form}
                             createChangeTextHandler={createChangeTextHandler}
                            loading={loading}
                         />
                        <SignButtons isSignUp={isSignUp} onSubmit={onSubmit} />   
                    </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    KeyboardAvoidingView: {
        flex: 1,
    },
    fullscreen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    form: {
        marginTop: 64,
        width: '100%',
        paddingHorizontal: 16,
    },
});

export default SignInScreen;