import {createNativeStackNavigator} from '@react-navigation/native-stack';

//import Adicionar from '../screens/Adicionar';
import CadastrarProfessor from '../screens/CadastrarProfessor';
import CadastrarSetor from '../screens/CadastrarSetor';
import HomeTab from './HomeTab';
//import Espaco from '../screens/Espaco';
import ConsultarProfessor from '../screens/ConsultarProfessor';
import ConsultarSetor from '../screens/ConsultarSetor';
import DetalhesSetor from '../screens/DetalhesSetor';
import DetalhesProfessor from '../screens/DetalhesProfessor';
import EditarProfessor from '../screens/EditarProfessor';
import EditarSetor from '../screens/EditarSetor';
import StacksEspaco from './stacksEspaco';
import StacksConsultarEspaco from './StacksConsultaEspaco';
import StacksVincularGestor from './StackVincularGestor';
import StacksSolicitarReserva from './StackSolicitarReserva';
import StackGerirReserva from './StackGerirReserva';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{title: '', headerShown: false}}>
      <Stack.Screen name="homeTab" component={HomeTab} />
      <Stack.Screen name="CadastrarProfessor" component={CadastrarProfessor} />
      <Stack.Screen name="CadastrarSetor" component={CadastrarSetor} />
      <Stack.Screen name="ConsultarProfessor" component={ConsultarProfessor} />
      <Stack.Screen name="ConsultarSetor" component={ConsultarSetor} />
      <Stack.Screen name="DetalhesSetor" component={DetalhesSetor} />
      <Stack.Screen name="DetalhesProfessor" component={DetalhesProfessor} />
      <Stack.Screen name="EditarProfessor" component={EditarProfessor} />
      <Stack.Screen name="EditarSetor" component={EditarSetor} />
      <Stack.Screen name="stacksEspaco" component={StacksEspaco} />
      <Stack.Screen name='StackConsultarEspaco' component={StacksConsultarEspaco}/>
      <Stack.Screen name='StackVincularGestor' component={StacksVincularGestor} />
      <Stack.Screen name='StackSolicitarReserva' component={StacksSolicitarReserva} />
      <Stack.Screen name='StackGerirReserva' component={StackGerirReserva} />
    </Stack.Navigator>
  );
}
