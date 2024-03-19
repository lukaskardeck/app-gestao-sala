import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import TelaLogin from "../screens/TelaLogin";

const Stack = createNativeStackNavigator();

export function AuthStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Signin" component={TelaLogin} options={{
                headerShown: false,
            }}/>
        </Stack.Navigator>
      );
}