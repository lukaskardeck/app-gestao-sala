/* eslint-disable react/react-in-jsx-scope */
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

export default function ConsultarSetor() {
  const navigation = useNavigation();

  const navigateToDetails = item => {
    navigation.navigate('DetalhesSetor', {item});
  };

  /*const [professores, setProfessores] = useState([
    {
      id: 1,
      nome: 'Departamento de Ciencias e Tecnologia',
      email: 'dct@uesb.edu.br',
      telefone: '123456789',
      sigla: 'DCT',
    },
    {
      id: 2,
      nome: 'Departamento de Ciencias Humanas e Linguagens',
      email: 'dchl@uesb.edu.br',
      telefone: '80818283',
      sigla: 'DCHL',
    },
    {
      id: 3,
      nome: 'Departamento de Saúde',
      email: 'dcs@uesb.edu.br',
      telefone: '123456789',
      sigla: 'DS',
    },
    {
      id: 4,
      nome: 'Departamento de Ciências Biológicas',
      email: 'dcb@uesb.edu.br',
      telefone: '123456789',
      sigla: 'DCB',
    },
  ]);*/
  const [setores, setSetores] = useState([]);

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => navigateToDetails(item)}>
      <View style={styles.item}>
        <Text style={styles.text}>{item.value.sigla}</Text>
      </View>
    </TouchableOpacity>
  );

  /**
   * return (
    <View>
      <FlatList
        data={professores}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
   */

  useEffect(() => {
    const getSetores = async () => {
      const snapshot = await firestore()
        .collection('Usuario_Papel')
        .where('id_papel', '==', 2)
        .get();

      const idUsers = snapshot.docs.map(doc => doc.data().id_usuario);

      //console.log('IDs: ', idUsers);

      const snapshot2 = await firestore()
        .collection('Usuario')
        .where(firestore.FieldPath.documentId(), 'in', idUsers)
        .get();

      const setoresQuery = snapshot2.docs.map(doc => ({
        key: doc.id,
        value: doc.data(),
      }));

      setSetores(setoresQuery);
      //console.log(setoresQuery);
    };

    getSetores();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/Fundo1.png')}
        style={styles.imageBackground}>
        <Text style={styles.title}>Setores</Text>
        <View style={styles.formContext}>
          <View style={styles.listProf}>
            <FlatList
              data={setores}
              renderItem={renderItem}
              keyExtractor={item => item.key}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
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
});
