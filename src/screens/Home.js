import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
//import { firebase } from '@react-native-firebase/auth'; 
import { AuthContext } from "../contexts/Auth";

export function HomeScreen() {
    let { user, SignOut } = useContext(AuthContext);

    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Home Screen</Text>
        <Text>User: {user.name}</Text>
        <Text>Email: {user.email}</Text>
        <Button title="Sign Out" onPress={() => {
          SignOut();
        }}/>
      </View>
    );
  }