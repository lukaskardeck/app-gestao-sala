/* eslint-disable react/react-in-jsx-scope */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Espaco from '../screens/Espaco';
import Manutencao from '../screens/Manutencao';
import Gestor from '../screens/Gestor';
import Adicionar from '../screens/Adicionar';
import Consultar from '../screens/Consultar';
import Reserva from '../screens/Reserva';

const Tab = createBottomTabNavigator();

export default function HomeTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          position: 'absolute',
          bottom: 16,
          right: 16,
          left: 16,
          borderRadius: 16,
        },
      }}>
      <Tab.Screen
        name="consultar"
        component={Consultar}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="search-outline" size={size} color={color} />
          ),
          tabBarLabel: 'Consultar',
        }}
      />

      <Tab.Screen
        name="reserva"
        component={Reserva}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="today-outline" size={size} color={color} />
          ),
          tabBarLabel: 'Reserva',
        }}
      />

      <Tab.Screen
        name="manutencao"
        component={Manutencao}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="construct-outline" size={size} color={color} />
          ),
          tabBarLabel: 'Manutenção',
        }}
      />

      <Tab.Screen
        name="adicionar"
        component={Adicionar}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="add-circle-outline" size={size} color={color} />
          ),
          tabBarLabel: 'Adicionar',
        }}
      />

      <Tab.Screen
        name="gestor"
        component={Gestor}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="people-outline" size={size} color={color} />
          ),
          tabBarLabel: 'Gestor',
        }}
      />
    </Tab.Navigator>
  );
}
