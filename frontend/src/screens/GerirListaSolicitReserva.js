/* eslint-disable react/react-in-jsx-scope */
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  RefreshControl
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useState, useEffect, useContext} from 'react';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../contexts/Auth';

export default function GerirListaSolicitReserva() {
  const {user} = useContext(AuthContext);
  const navigation = useNavigation();

  const navigateToDetails = item => {
    navigation.navigate('DetalheSolicitacaoReserva', {item});
  };

  const [solicitacoes, setSolicitacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => {
      navigateToDetails(item);
      console.log(item);
    }}>
      <View style={styles.item}>
        <Text style={styles.text}>{item.value.nomeEspaco} - {item.value.nomeModulo}</Text>
        <Text style={styles.text}>Solicitante: {item.value.solicitanteEmail}</Text>
      </View>
    </TouchableOpacity>
  );

  const fetchSolicitacoes = async () => {
    try {
      // Buscar todas as solicitações de reserva
      const solicitacoesSnapshot = await firestore().collection('Solicitacao_Reserva').where('gestorEmail', '==', user.email).get();

      // Para cada solicitação, buscar os detalhes do espaço e módulo
      const solicitacoesData = await Promise.all(solicitacoesSnapshot.docs.map(async (doc) => {
        const solicitacao = doc.data();
        const espacoID = solicitacao.espacoID;

        // Buscar o espaço correspondente
        const espacoDoc = await firestore().collection('Espaco').doc(espacoID).get();
        const espacoData = espacoDoc.data();

        // Buscar o módulo correspondente ao espaço
        const moduloSnapshot = await firestore().collection('Modulo').where('espacos', 'array-contains', espacoID).get();
        const moduloData = moduloSnapshot.docs.length > 0 ? moduloSnapshot.docs[0].data() : {};

        return {
          key: doc.id,
          value: {
            ...solicitacao,
            nomeEspaco: espacoData ? espacoData.nome : 'Espaço Desconhecido',
            nomeModulo: moduloData ? moduloData.nome : 'Módulo Desconhecido',
          },
        };
      }));

      setSolicitacoes(solicitacoesData);
    } catch (error) {
      console.error('Erro ao buscar solicitações de reserva: ', error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    fetchSolicitacoes();
  });

  const onRefresh = () => {
    setRefreshing(true);
    fetchSolicitacoes();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000); // Refresh indicator will be visible for at least 1 second
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/Fundo1.png')}
        style={styles.imageBackground}>
        <Text style={styles.title}>Solicitações de Reserva</Text>
        <View style={styles.formContext}>
          {carregando ? (
            <View>
              <Text>Carregando...</Text>
            </View>
          ) : solicitacoes.length > 0 ? (
            <View style={styles.listProf}>
              <FlatList
                data={solicitacoes}
                renderItem={renderItem}
                keyExtractor={item => item.key}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
              />
            </View>
          ) : (
            <View>
              <Text>Não há nenhuma solicitação de reserva.</Text>
            </View>
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
});
