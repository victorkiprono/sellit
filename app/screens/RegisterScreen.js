import React,{useState} from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import firebase from 'firebase/app';
import 'firebase/auth';


import Screen from "../components/Screen";
import { 
  AppForm,
  ErrorMessage, 
  AppFormField, 
  SubmitButton 
} from "../components/forms";
import useAuth from "../auth/useAuth";
import ActivityIndicator from "../components/ActivityIndicator";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

function RegisterScreen() {
  // const registerApi = useApi(usersApi.createUser);
  // const loginApi = useApi(authApi.loginUser);
  const auth = useAuth();
  const [error,setError] = useState();

  const handleSubmit = async ({name,email,password}) => {
    // const result = await registerApi.request(userInfo);
    let createUser;
    try {
      createUser = await firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      setError('Failed to authenticate');
      console.log(error);
      return;
    }
    createUser.user.updateProfile({displayName:name});
    createUser.user.reload();
    
    auth.loginFb();

  };

  return (
    <>
      <ActivityIndicator visible={auth.user} />
      <Screen style={styles.container}>
        <AppForm
          initialValues={{ name: "", email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage error={error} visible={error} />
          <AppFormField
            autoCorrect={false}
            icon="account"
            name="name"
            placeholder="Name"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
          />
          <SubmitButton title="Register" />
        </AppForm>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default RegisterScreen;
