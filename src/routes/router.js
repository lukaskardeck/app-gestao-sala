import {NavigationContainer} from '@react-navigation/native';
import React, {useContext} from 'react';
//import {AppStack} from './AppStack';
import {AuthStack} from './AuthStack';
import {AuthContext} from '../contexts/Auth';
import DrawerRoutes from './drawer.routes';

//{user ? <AppStack /> : <AuthStack />}
//{user ? <DrawerRoutes /> : <AuthStack />}

export function Router() {
  const {user} = useContext(AuthContext);
  return (
    <NavigationContainer>
      {user ? <DrawerRoutes /> : <AuthStack />}
    </NavigationContainer>
  );
}
