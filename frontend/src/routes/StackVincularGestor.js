/* eslint-disable react/react-in-jsx-scope */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import VincularGestor from '../screens/VincularGestor';
import VincularGestorServico from '../screens/VincularGestorServico';
import VincularGestorReserva from '../screens/VincularGestorReserva';

const Stack = createNativeStackNavigator();

export default function StacksVincularGestor() {
  return (
    <Stack.Navigator
      screenOptions={{
        title: '',
        headerLeft: null,
        headerShown: false,
      }}>

      <Stack.Screen name="VincularGestor" component={VincularGestor} />
      <Stack.Screen name="VincularGestorServico" component={VincularGestorServico} />
      <Stack.Screen name="VincularGestorReserva" component={VincularGestorReserva} />

    </Stack.Navigator>
  );
}
