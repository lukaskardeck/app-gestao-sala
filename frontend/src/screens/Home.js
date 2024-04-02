import React, {useContext} from 'react';
import {View, Text, Button} from 'react-native';
import {AuthContext} from '../contexts/Auth';
import { useNavigation } from '@react-navigation/native';

export function HomeScreen() {
  let {user, SignOut} = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Text>User: {user.name}</Text>
      <Text>Email: {user.email}</Text>
      <Button title="Settings" onPress={() => {
        navigation.navigate('Settings');
      }}/>
      <Button
        title="Sign Out"
        onPress={() => {
          SignOut();
        }}
      />
    </View>
  );
}
