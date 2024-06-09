/* eslint-disable react/react-in-jsx-scope */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SolicitarReserva from '../screens/SolicitarReserva';
import TipoSolicitReserva from '../screens/TipoSolicitReserva';

const Stack = createNativeStackNavigator();

export default function StacksSolicitarReserva() {
  return (
    <Stack.Navigator
      screenOptions={{
        title: '',
        headerLeft: null,
        headerShown: false,
      }}>

      <Stack.Screen name="SolicitarReserva" component={SolicitarReserva} />
      <Stack.Screen name="TipoSolicitReserva" component={TipoSolicitReserva} />

    </Stack.Navigator>
  );
}
