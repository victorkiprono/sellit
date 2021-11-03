import React, { useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import * as Yup from 'yup';
import firebase from 'firebase/app';
import 'firebase/auth';


import Screen from '../components/Screen';
import {
    AppForm,
    AppFormField,
    ErrorMessage,
    SubmitButton
} from '../components/forms';
import useAuth from '../auth/useAuth';

const validationSchema = Yup.object().shape({
    email:Yup.string().required().email().label('Email'),
    password: Yup.string().required().min(6).label('Password')
});

function LoginScreen(props) {
    const auth = useAuth();
    const [error,setError] = useState();
    const [loginFailed, setLoginFailed] = useState(false);
    
    const handleSubmit = async ({email, password}) => {
        // const result = await authApi.loginUser(email, password);
        let authUser;
        try {
            authUser = await firebase.auth().signInWithEmailAndPassword(email, password);
            
        } catch (error) {
            setLoginFailed(true);
            setError(JSON.stringify(error.message));
            console.log(`Authentication failed `+ error.code + ` `+ error.message);
            return;
        }
        
        authUser.user.reload();

        setLoginFailed(false);
        auth.loginFb();
       
    };

    return (
        <Screen style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../assets/logo-red.png')}
            />
            <AppForm
                initialValues={{email:'', password:'' }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <ErrorMessage
                    // error='Invalid email and/or password.'
                    error={error}
                    visible={loginFailed}
                />
                <AppFormField
                    autoCapitalize='none'
                    autoCorrect={false}
                    icon='email'
                    name='email'
                    keyboardType='email-address'
                    placeholder='Email'
                    textContentType='emailAddress'
                />
                        
                <AppFormField
                    autoCapitalize='none'
                    autoCorrect={false}
                    icon='lock'
                    name='password'
                    placeholder='Password'
                    secureTextEntry
                    textContentType='password'
                />
                
                <SubmitButton title='Login'/>

            </AppForm>

        </Screen>
    );
}

const styles = StyleSheet.create({
    container:{
        padding:10,
    },
    logo:{
        width:80,
        height:80,
        alignSelf:'center',
        marginTop:50,
        marginBottom:20
    }
})

export default LoginScreen;