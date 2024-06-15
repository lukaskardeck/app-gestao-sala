/* eslint-disable react/react-in-jsx-scope */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GerirListaSolicitReserva from '../screens/GerirListaSolicitReserva';
import DetalheSolicitacaoReserva from '../screens/DetalheSolicitacaoReserva';

const Stack = createNativeStackNavigator();

export default function StackGerirReserva() {
  return (
    <Stack.Navigator
      screenOptions={{
        title: '',
        headerLeft: null,
        headerShown: false,
      }}>

      <Stack.Screen name="GerirListaSolicitReserva" component={GerirListaSolicitReserva} />
      <Stack.Screen name="DetalheSolicitacaoReserva" component={DetalheSolicitacaoReserva} />

    </Stack.Navigator>
  );
}
