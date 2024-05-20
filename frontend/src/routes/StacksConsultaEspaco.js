/* eslint-disable react/react-in-jsx-scope */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ConsultarEspaco from '../screens/ConsultarEspaco';
import DetalhesEspaco from '../screens/DetalhesEspaco';
import DetalhesAcessibilidades from '../screens/DetalhesAcessibilidades';

const Stack = createNativeStackNavigator();

export default function StacksConsultarEspaco() {
  return (
    <Stack.Navigator
      screenOptions={{
        title: '',
        headerLeft: null,
        headerShown: false,
      }}>

      <Stack.Screen name="ConsultarEspaco" component={ConsultarEspaco} />
      <Stack.Screen name="DetalhesEspaco" component={DetalhesEspaco} />
      <Stack.Screen name="DetalhesAcessibilidades" component={DetalhesAcessibilidades} />

    </Stack.Navigator>
  );
}
