import React,{useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {AppLoading} from 'expo';
import {firebaseConfig} from './app/api/fbConfig';
import firebase from 'firebase/app';
import 'firebase/auth';


import navigationTheme from './app/navigation/navigationTheme';
import AppNavigator from './app/navigation/AppNavigator';
import OfflineNotice from './app/components/OfflineNotice';
import AuthNavigator from './app/navigation/AuthNavigator';
import AuthContext from './app/auth/context';
import { navigationRef } from './app/navigation/rootNavigation';


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}


export default function App() {
  console.log('start');
  const [user,setUser] = useState();
  const [isReady,setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    // const user = firebase.auth().currentUser;
    if(user) setUser(user);
  };

  if(isReady){
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={()=> setIsReady(true)}
      />
    );
  }


  return(
    <AuthContext.Provider value={{user,setUser}}>
      <OfflineNotice/>
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        {user ? <AppNavigator/> : <AuthNavigator/> }
      </NavigationContainer>
    </AuthContext.Provider>
  );

}