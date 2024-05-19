import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CadastrarEspaco from "../screens/CadastrarEspaco";
import CadastrarEsAcessibilidade from "../screens/CadastrarEsAcessibilidade";
import CadastrarEsEquipamento from "../screens/CadastrarEsEquipamento";
import CadastrarEsEspecificacao from "../screens/CadastrarEsEspecificacao";
//import CadastrarEsDescricao from "../screens/CadastrarEsDescricao";

const Stack = createNativeStackNavigator();

export default function StacksEspaco() {
    return (
        <Stack.Navigator screenOptions={{
            title: "",
            headerLeft: null,
            headerShown: false
        }}>
            <Stack.Screen
                name="CadastrarEspaco"
                component={CadastrarEspaco}>
            </Stack.Screen>

            <Stack.Screen
                name="Acessibilidade"
                component={CadastrarEsAcessibilidade}>
            </Stack.Screen>

            <Stack.Screen
                name="Equipamento"
                component={CadastrarEsEquipamento}>
            </Stack.Screen>

            <Stack.Screen
                name="Especificacao"
                component={CadastrarEsEspecificacao}>
            </Stack.Screen>

        </Stack.Navigator>
    )
}
