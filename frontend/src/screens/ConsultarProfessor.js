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

export default function ConsultarProfessor() {
  const navigation = useNavigation();

  const navigateToDetails = item => {
    navigation.navigate('DetalhesProfessor', {item});
  };

  const [professores, setProfessores] = useState([]);

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => navigateToDetails(item)}>
      <View style={styles.item}>
        <Text style={styles.text}>{item.value.nome}</Text>
      </View>
    </TouchableOpacity>
  );

  useEffect(() => {
    const getProfessores = async () => {
      const snapshot = await firestore()
        .collection('Usuario_Papel')
        .where('id_papel', '==', 1)
        .get();

      const idUsers = snapshot.docs.map(doc => doc.data().id_usuario);

      const professoresQuery = [];

      for (const idUser of idUsers) {
        const userSnapshot = await firestore()
          .collection('Usuario')
          .doc(idUser)
          .get();

        const userData = userSnapshot.data();

        // Se userData contém o campo setor
        if (userData.setor) {
          const setorSnapshot = await firestore()
            .collection('Usuario')
            .doc(userData.setor)
            .get();

          const setorData = setorSnapshot.data();

          // Se o setor existe, adiciona o nome e sigla do setor aos dados do usuário
          if (setorData) {
            userData.nomeSetor = setorData.nome;
            userData.siglaSetor = setorData.sigla;
            userData.keySetor = userData.setor;
          }
        }

        // Remove o campo de ID do setor dos dados do usuário
        delete userData.setor;

        professoresQuery.push({
          key: userSnapshot.id,
          value: userData,
        });
      }

      setProfessores(professoresQuery);
      //console.log(professoresQuery);
    };

    getProfessores();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/Fundo1.png')}
        style={styles.imageBackground}>
        <Text style={styles.title}>Professores</Text>
        <View style={styles.formContext}>
          <View style={styles.listProf}>
            <FlatList
              data={professores}
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
