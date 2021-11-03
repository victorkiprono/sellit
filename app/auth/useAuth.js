import { useContext } from "react";
import jwtDecode from 'jwt-decode';
import firebase from 'firebase/app';
import 'firebase/auth';

import {firebaseConfig} from '../api/fbConfig';


import authStorage from "../auth/storage";
import AuthContext from "./context";
// import auth from '../api/auth';


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}

export default useAuth = () => {
    const {user, setUser} = useContext(AuthContext);

    const logIn = (authToken) => {
        const user = jwtDecode(authToken);
        setUser(user);
        authStorage.storeToken(authToken);
    };

    const loginFb = () => {
        // const user = auth.loginUser(email,password);
        // setUser(user);
        const user = firebase.auth().currentUser;

        if (user) {
          setUser(user);
          console.log(user.displayName);
          console.log(user.email);
        } else {
          setUser(null)
        }
    }



    const logOut = async () => {
      await firebase.auth().signOut();
      setUser(null);
      // authStorage.removeToken();
    };

    return {user,logIn,logOut,loginFb};
};
