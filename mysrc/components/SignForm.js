import React, {useRef} from "react";
import BorderedInput from "./BorderedInput";

function SignForm({isSignUp, onSubmit, form, createChangeTextHandler}) {
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    return (
        <>
         <BorderedInput 
            hasMarginBottom 
            placeholder="Email"
            value={form.email}
            onChangeText={createChangeTextHandler('email')}
            autoCapitalize="none"
            autoCorrect={false}
            autoCompleteType="email"
            KeyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
          />
            <BorderedInput 
                placeholder="Password" 
                hasMarginBottom={isSignUp}
                value={form.password}
                onChangeText={createChangeTextHandler('password')}
                ref={passwordRef}
                returnKeyType={isSignUp ? 'next' : 'done'}
                onSubmitEditing={() => {
                    if (isSignUp) {
                        confirmPasswordRef.current.focus();
                    } else {
                        onSubmit();
                    }
                }}
            />
            {isSignUp &&  (
                <BorderedInput 
                 placeholder="Verify Password"
                 value={form.confirmPassword}
                 onChangeText={createChangeTextHandler('confirmPassword')}
                />
            )}
        </>
    );
}

export default SignForm;