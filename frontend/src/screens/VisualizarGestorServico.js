import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

export default function VisualizarGestorServico({ route }) {
  const navigation = useNavigation();

  const navigateToDetails = item => {
    navigation.navigate('DetalhesSetor', { item });
  };

  const espacoKey = route.params.espacoKey;

  const [gestores, setGestores] = useState([]);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToDetails(item)}>
      <View style={styles.item}>
        <Text style={styles.text}>Nome: {item.nome}</Text>
        <Text style={styles.text}>Email: {item.email}</Text>
      </View>
    </TouchableOpacity>
  );

  useEffect(() => {
    const getGestorServico = async () => {
      const espacoDoc = await firestore()
        .collection('Espaco')
        .doc(espacoKey)
        .get();

      // Recuperar o campo gestor_servico que contém os emails dos usuários
      const gestoresServico = espacoDoc.data().gestor_servico || [];

      // Lista para armazenar os usuários encontrados
      let usuariosEncontrados = [];

      // Buscar cada usuário correspondente aos emails em gestor_servico
      await Promise.all(
        gestoresServico.map(async email => {
          // Buscar usuário na coleção Usuario pelo email
          const usuariosRef = await firestore()
            .collection('Usuario')
            .where('email', '==', email)
            .get();

          // Para cada documento encontrado, adicionar na lista de usuários
          usuariosRef.forEach(doc => {
            const usuario = {
              nome: doc.data().nome,
              email: doc.data().email,
            };
            usuariosEncontrados.push(usuario);
          });
        }),
      );

      setGestores(usuariosEncontrados);
    };

    getGestorServico();
  }, [espacoKey]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/Fundo1.png')}
        style={styles.imageBackground}>
        <Text style={styles.title}>Gestores de Serviço</Text>
        <View style={styles.formContext}>
          {gestores.length === 0 ? (
            <Text style={styles.emptyText}>
              Não há gestor de serviço cadastrado para esse espaço.
            </Text>
          ) : (
            <FlatList
              data={gestores}
              renderItem={renderItem}
              keyExtractor={item => item.email}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          )}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    height: 'auto',
  },

  title: {
    color: '#FFFFFF',
    fontSize: 30,
    textAlign: 'center',
    paddingBottom: 30,
  },

  formContext: {
    backgroundColor: '#FFFFFF',
    width: '85%',
    height: '70%',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },

  listProf: {
    flex: 1,
  },

  item: {
    backgroundColor: '#ECEBFD',
    padding: 10,
    marginVertical: 8,
    borderRadius: 20,
  },

  text: {
    fontSize: 16,
    color: '#0805A3',
  },

  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#0805A3',
    marginTop: 20,
  },

  separator: {
    height: 1,
    backgroundColor: '#CED0CE',
    marginVertical: 10,
  },
});
