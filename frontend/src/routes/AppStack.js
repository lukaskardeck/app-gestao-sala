import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {HomeScreen} from '../screens/Home';
import {SettingsScreen} from '../screens/Settings';
import Espaco from '../screens/Espaco';
import Adicionar from '../screens/Adicionar';
import CadastrarProfessor from '../screens/CadastrarProfessor';

const Stack = createNativeStackNavigator();

export function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Espaco"
        component={Espaco}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}
