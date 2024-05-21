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
import SignButtons from "../components/SIgnButtons";
import SignInForm from "../components/SignForm";
import {signIn, signUp} from '../lib/auth';

function SignInScreen({navigation, route}) {
    const {isSignUp} = route.params || {};
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState();
    
    const createChangeTextHandler = (name) => (value) => {
        setForm({...form, [name]: value});
    };
    const onSubmit = async () => {
        Keyboard.dismiss();
        const {email, password} = form;
        const info = {email, password};
        setLoading(true);
        try {
            const {user} = isSignUp ? await signUp(info) : await signIn(info)
            console.log(user);
        } catch (e) {
            Alert.alert('Fail');
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

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