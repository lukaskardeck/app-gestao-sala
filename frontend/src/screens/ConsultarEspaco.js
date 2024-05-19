/* eslint-disable react/react-in-jsx-scope */
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

export default function ConsultarProfessor({navigation}) {
  const navigateToDetails = item => {
    navigation.navigate('DetalhesProfessor', {item});
  };

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => navigateToDetails(item)}>
      <View style={styles.item}>
        <Text style={styles.text}>{item.value.nome}</Text>
      </View>
    </TouchableOpacity>
  );

  const [modulos, setModulos] = useState([]);
  const [espacos, setEspacos] = useState([]);
  const [moduloSelecionado, setModuloSelecionado] = useState('');
  const [list, setList] = useState(espacos);

  useEffect(() => {
    // Buscar todos os módulos
    const fetchModulos = async () => {
      const modulosSnapshot = await firestore().collection('Modulo').get();
      const modulosList = modulosSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setModulos(modulosList);
    };

    // Buscar todos os espaços
    const fetchEspacos = async () => {
      const espacosSnapshot = await firestore().collection('Espaco').get();
      const espacosList = espacosSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEspacos(espacosList);
    };

    fetchModulos();
    fetchEspacos();
  }, []);

  const filtrarEspacosPorModulo = async moduloId => {
    if (moduloId) {
      // Buscar o documento do módulo selecionado
      const moduloDoc = await firestore()
        .collection('Modulo')
        .doc(moduloId)
        .get();
      const espacoIds = moduloDoc.data().espacos;

      // Buscar os espaços filtrados pelo módulo selecionado
      const espacosList = [];
      for (const espacoId of espacoIds) {
        const espacoDoc = await firestore()
          .collection('Espaco')
          .doc(espacoId)
          .get();
        if (espacoDoc.exists) {
          espacosList.push({
            id: espacoDoc.id,
            ...espacoDoc.data(),
          });
        }
      }
      setEspacos(espacosList);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/Fundo1.png')}
        style={styles.imageBackground}>
        <Text style={styles.title}>Professores</Text>
        <View style={styles.formContext}>
          <View style={styles.listProf}>
            <FlatList
              data={list}
              renderItem={renderItem}
              keyExtractor={item => item.key}
              //ItemSeparatorComponent={() => <View style={styles.separator} />}
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
