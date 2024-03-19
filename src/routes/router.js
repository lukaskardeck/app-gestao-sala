import {NavigationContainer} from '@react-navigation/native';
import React, {useContext} from 'react';
import {AppStack} from './AppStack';
import {AuthStack} from './AuthStack';
import {AuthContext} from '../contexts/Auth';

export function Router() {
  const {user} = useContext(AuthContext);
  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
