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
} from 'react-native';

import firestore from '@react-native-firebase/firestore';

export default function DetalheSolicitacaoReserva({navigation, route}) {
  const solicitacaoKey = route.params.item.key;
  const solicitacao = route.params.item.value;

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
            navigation.goBack();
          },
        },
      ],
    );
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
          onPress: () => {
            Alert.alert('Solicitação homologada!');
            navigation.goBack();
            navigation.goBack();
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

            <Text style={styles.input}>
              {solicitacao.solicitanteEmail}
            </Text>

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

            <Text style={styles.inputLarge}>
              {solicitacao.justificativa}
            </Text>
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
