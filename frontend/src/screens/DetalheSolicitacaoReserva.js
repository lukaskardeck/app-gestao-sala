import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Pressable,
  Keyboard,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';

export default function DetalheSolicitacaoReserva({navigation, route}) {
  const solicitacaoKey = route.params.item.key;
  const solicitacao = route.params.item.value;

  const [carregando, setCarregando] = useState(false);

  const renderData = () => {
    if (solicitacao.tipoSolicitacao === 'Único Dia') {
      return (
        <View style={styles.dataContainer}>
          <Text style={styles.data}>
            - {new Date(solicitacao.data).toLocaleDateString()}
          </Text>
        </View>
      );
    } else if (solicitacao.tipoSolicitacao === 'Semanal') {
      return (
        <View style={styles.dataContainer}>
          {solicitacao.data.map((dateString, index) => (
            <Text key={index} style={styles.data}>
              - {new Date(dateString).toLocaleDateString()}
            </Text>
          ))}
        </View>
      );
    }
  };

  const rejeitar = async () => {
    try {
      await firestore()
        .collection('Solicitacao_Reserva')
        .doc(solicitacaoKey)
        .delete();
    } catch (error) {
      console.error('Erro ao rejeitar solicitação: ', error);
      Alert.alert('Erro', 'Ocorreu um erro ao rejeitar a solicitação.');
    }
  };

  const confirmaRejeitar = () => {
    Alert.alert(
      'Rejeitar Solicitação',
      'Deseja rejeitar essa solicitação de reserva?',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
        },
        {
          text: 'Ok',
          onPress: () => {
            rejeitar();
            Alert.alert('Solicitação rejeitada!');
            navigation.goBack();
          },
        },
      ],
    );
  };

  const verificarConflito = async (
    espacoID,
    tipoSolicitacao,
    data,
    horarios,
  ) => {
    try {
      const espacoRef = firestore().collection('Espaco').doc(espacoID);
      const reservasSnapshot = await espacoRef.collection('Reserva').get();

      if (reservasSnapshot.empty) {
        return false;
      }

      const reservasExistentes = reservasSnapshot.docs.map(doc => doc.data());

      const dataSolicitacao = tipoSolicitacao === 'Único Dia' ? [data] : data;

      for (const reserva of reservasExistentes) {
        const dataReserva =
          reserva.tipoReserva === 'Único Dia' ? [reserva.data] : reserva.data;

        // Verifica se há datas em comum
        const datasEmComum = dataSolicitacao.some(dataSolic =>
          dataReserva.some(
            dataRes =>
              new Date(dataSolic).toDateString() ===
              new Date(dataRes).toDateString(),
          ),
        );

        if (datasEmComum) {
          // Verifica se há horários em comum
          const horariosEmComum = reserva.horarios.some(horarioRes =>
            horarios.includes(horarioRes),
          );

          if (horariosEmComum) {
            // Há conflito
            return true;
          }
        }
      }

      // Não há conflito
      return false;
    } catch (error) {
      console.error('Erro ao verificar conflito: ', error);
      Alert.alert('Erro', 'Ocorreu um erro ao verificar conflito.');
      return true;
    }
  };

  const homologar = async () => {
    setCarregando(true);
    try {
      const conflito = await verificarConflito(
        solicitacao.espacoID,
        solicitacao.tipoSolicitacao,
        solicitacao.data,
        solicitacao.horarios,
      );

      if (conflito) {
        return false;
      }

      const reservaData = {
        tipoReserva: solicitacao.tipoSolicitacao,
        justificativa: solicitacao.justificativa,
        responsavel: solicitacao.solicitanteEmail,
        horarios: solicitacao.horarios,
        data: solicitacao.data,
      };

      await firestore()
        .collection('Espaco')
        .doc(solicitacao.espacoID)
        .collection('Reserva')
        .add(reservaData);

      await firestore()
        .collection('Solicitacao_Reserva')
        .doc(solicitacaoKey)
        .delete();

      return true;
    } catch (error) {
      console.error('Erro ao homologar solicitação: ', error);
      Alert.alert('Erro', 'Ocorreu um erro ao homologar a solicitação.');
      return false;
    } finally {
      setCarregando(false);
    }
  };

  const confirmaHomologar = () => {
    Alert.alert(
      'Homologar Solicitação',
      'Deseja homologar essa solicitação de reserva?',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
        },
        {
          text: 'Ok',
          onPress: async () => {
            const confirm = await homologar();
            if (confirm) {
              Alert.alert('Solicitação homologada!');
              navigation.goBack();
            } else {
              Alert.alert('Existe um conflito para essa reserva!');
            }
          },
        },
      ],
    );
  };

  return (
    <Pressable onPress={Keyboard.dismiss} style={styles.container}>
      <ImageBackground
        source={require('../assets/Fundo.png')}
        style={styles.imageBackground}>
        <Text style={styles.title}>Detalhes</Text>

        <View style={styles.formContext}>
        {carregando && <ActivityIndicator size="large" color="#0000ff" style={{
            width: '100%',
            height: '100%'
          }}/>}
          <ScrollView>
            <View style={styles.box}>
              <Text style={styles.textForm}>Modulo e Espaco:</Text>
            </View>
            <Text style={styles.input}>
              {solicitacao.nomeModulo} - {solicitacao.nomeEspaco}
            </Text>

            <View style={styles.box}>
              <Text style={styles.textForm}>Solicitante:</Text>
            </View>

            <Text style={styles.input}>{solicitacao.solicitanteEmail}</Text>

            <View style={styles.box}>
              <Text style={styles.textForm}>Data(s):</Text>
            </View>
            <View style={styles.inputData}>{renderData()}</View>

            <View style={styles.box}>
              <Text style={styles.textForm}>Horário(s):</Text>
            </View>
            <View style={styles.inputData}>
              {solicitacao.horarios.map((horario, index) => (
                <Text key={index} style={styles.horario}>
                  {horario}
                </Text>
              ))}
            </View>

            <View style={styles.box}>
              <Text style={styles.textForm}>Justificativa:</Text>
            </View>

            <Text style={styles.inputLarge}>{solicitacao.justificativa}</Text>
          </ScrollView>
        </View>
        <View style={styles.navbar2}>
          <TouchableOpacity style={styles.b} onPress={() => confirmaRejeitar()}>
            <Text style={{color: 'white', fontSize: 18}}>Rejeitar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.b2}
            onPress={() => confirmaHomologar()}>
            <Text style={{color: 'white', fontSize: 18}}>Homologar</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },

  title: {
    color: '#FFFFFF',
    fontSize: 30,
    textAlign: 'center',
  },

  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },

  formContext: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    width: '85%',
    height: 450,
    borderRadius: 30,
    marginTop: 20,
  },

  dataContainer: {
    marginVertical: 10,
  },

  data: {
    fontSize: 18,
    marginBottom: 5,
  },

  horario: {
    fontSize: 18,
    marginVertical: 5,
  },

  value: {
    fontSize: 18,
    marginBottom: 10,
  },

  textForm: {
    color: '#0805A3',
    fontSize: 20,
    paddingLeft: 20,
    fontWeight: 'bold',
  },

  input: {
    width: '90%',
    borderRadius: 15,
    backgroundColor: '#ECEBFD',
    height: 45,
    paddingLeft: 15,
    marginLeft: 16,
    marginBottom: 10,
    marginTop: 5,
    textAlignVertical: 'center',
    fontSize: 16,
  },

  inputLarge: {
    width: '90%',
    borderRadius: 15,
    backgroundColor: '#ECEBFD',
    paddingLeft: 15,
    paddingVertical: 15,
    marginLeft: 16,
    marginBottom: 10,
    marginTop: 5,
    fontSize: 16,
  },

  inputData: {
    width: '90%',
    borderRadius: 15,
    backgroundColor: '#ECEBFD',
    paddingLeft: 15,
    marginLeft: 16,
    marginBottom: 10,
    marginTop: 5,
    textAlignVertical: 'center',
    fontSize: 16,
  },

  errorMessage: {
    fontSize: 10,
    color: 'red',
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingTop: 10,
  },

  box: {
    flexDirection: 'row',
  },

  goBack: {
    marginRight: 300,
  },

  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  b: {
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    paddingHorizontal: 10,
  },

  b2: {
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    paddingHorizontal: 10,
  },

  navbar2: {
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 15,
  },
});
