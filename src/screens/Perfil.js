import { useContext } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { AuthContext } from '../contexts/Auth';

export default function Perfil() {
  let {user, SignOut} = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>
      <Text>User: {user.name}</Text>
      <Text>Email: {user.email}</Text>
      <Button
        title="Sign Out"
        onPress={() => {
          SignOut();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize:22,
    fontWeight:"bold"
  }
});
