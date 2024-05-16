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
import StacksEspaco from './stacksEspaco';

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
      <Stack.Screen name="stacksEspaco" component={StacksEspaco}/>
    </Stack.Navigator>
  );
}
