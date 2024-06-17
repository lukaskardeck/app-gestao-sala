import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';

import Perfil from '../screens/Perfil';
import Configuracoes from '../screens/Configuracoes';
import AppStack from './AppStack';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator
      screenOptions={{
        title: '',
        headerTransparent: true,
      }}>
      <Drawer.Screen
        name="Home"
        component={AppStack}
        options={{
          drawerIcon: ({color, size}) => (
            <Icon name="home-outline" size={size} color={color} />
          ),
          drawerLabel: 'Início',
        }}
      />

      <Drawer.Screen
        name="Perfil"
        component={Perfil}
        options={{
          drawerIcon: ({color, size}) => (
            <Icon name="person-outline" size={size} color={color} />
          ),
          drawerLabel: 'Meu Perfil',
        }}
      />
      <Drawer.Screen
        name="Configuracoes"
        component={Configuracoes}
        options={{
          drawerIcon: ({color, size}) => (
            <Icon name="settings-outline" size={size} color={color} />
          ),
          drawerLabel: 'Configurações',
        }}
      />
    </Drawer.Navigator>
  );
}
