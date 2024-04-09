import {Button, FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import { useEffect, useState } from 'react';

export default function Consultar() {
  const [totalUsuarios, setTotalUsuarios] = useState('Total de usuarios: ');
  const [nome, setNome] = useState('Nome: ');
  const [email, setEmail] = useState('Email: ');
  const [usuarios, setUsuarios] = useState([]);

  /*useEffect(() => {
    const funcTeste = async () => {
      try {
        const querySnapshot = await firestore().collection('Usuario').get();
        setUsuarios(querySnapshot.docs.map(user => ({...user.data(), id: user.id})));
      } catch (error) {
        console.log('Erro ao buscar usuários: ', error);
      }
    };
  
    funcTeste();
  }, []);

  const data = [
    { key: '1', title: 'Item 1' },
    { key: '2', title: 'Item 2' },
    { key: '3', title: 'Item 3' },
    // Adicione mais itens aqui
  ];

  const DataUsers = ({nome}) => (
    <View>
      <Text>{nome}</Text>
    </View>
  );*/

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Consultar</Text>
      <Button title='Teste' onPress={() => {}}></Button>
    </SafeAreaView>
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
    fontSize: 22,
    fontWeight: 'bold',
  },
});
