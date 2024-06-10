import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Pressable,
  Keyboard,
  Alert,
} from 'react-native';

import BouncyCheckbox from 'react-native-bouncy-checkbox';

export default function TipoSolicitReserva({navigation, route}) {
  const {id_espaco, email} = route.params;

  const tipoSolicitReserva = {
    DiaUnico: 'Único Dia',
    Semanal: 'Semanal',
  };

  const [selectedCheckbox, setSelectedCheckbox] = useState(null);

  const handleCheckboxPress = checkbox => {
    setSelectedCheckbox(checkbox === selectedCheckbox ? null : checkbox);
  };

  return (
    <Pressable onPress={Keyboard.dismiss} style={styles.container}>
      <ImageBackground
        source={require('../assets/Fundo.png')}
        style={styles.imageBackground}>
        <View>
          <Text style={styles.textTitle1}>Solicitar Reserva</Text>
        </View>

        <View style={styles.formContext}>
          <View
            style={{
              gap: 30,
            }}>
            <View style={styles.checkboxList}>
              <View>
                <Text style={styles.textForm}>
                  Selecione o tipo da reserva:
                </Text>

                <View style={styles.checkboxList}>
                  {Object.entries(tipoSolicitReserva).map(([key, tipo]) => (
                    <View key={key} style={styles.tipoContainer}>
                      <BouncyCheckbox
                        fillColor="blue"
                        isChecked={selectedCheckbox === tipo}
                        text={tipo}
                        innerIconStyle={{borderWidth: 2}}
                        textStyle={{
                          textDecorationLine: 'none',
                          fontSize: 20,
                          color: 'blue',
                        }}
                        style={{marginBottom: 5}}
                        onPress={() => handleCheckboxPress(tipo)}
                      />
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.buttonCadastrar}>
            <Text
              style={styles.buttonText}
              onPress={() => {
                if (selectedCheckbox === tipoSolicitReserva.DiaUnico) {
                  navigation.navigate('ReservaDiaUnico', {
                    id_espaco,
                    email,
                    tipoSolicitacao: tipoSolicitReserva.DiaUnico,
                  });
                } else if (selectedCheckbox === tipoSolicitReserva.Semanal) {
                  navigation.navigate('ReservaSemanal', {
                    id_espaco,
                    email,
                    tipoSolicitacao: tipoSolicitReserva.Semanal,
                  });
                } else {
                  Alert.alert('Selecione um tipo para continuar.');
                }
              }}>
              Continuar
            </Text>
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

  textTitle1: {
    color: '#FFFFFF',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 50,
  },

  textTitle2: {
    color: '#FFFFFF',
    fontSize: 50,
    textAlign: 'center',
    marginBottom: 30,
  },

  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },

  formContext: {
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    width: '85%',
    borderRadius: 30,
    marginBottom: 80,
  },

  checkboxList: {
    paddingHorizontal: 20,
  },

  textForm: {
    color: 'blue',
    fontSize: 22,
    //backgroundColor: 'red',
    marginBottom: 20,
  },

  textForm2: {
    color: '#0805A3',
    fontSize: 22,
    paddingLeft: 20,
    marginTop: 15,
  },

  input: {
    width: '90%',
    borderRadius: 15,
    backgroundColor: '#ECEBFD',
    height: 50,
    //margin: 12,
    paddingLeft: 15,
    //marginLeft: 16,
  },

  buttonCadastrar: {
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    backgroundColor: '#211DFF',
    paddingTop: 14,
    paddingBottom: 14,
    marginLeft: 80,
    margin: 25,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 22,
  },

  button: {
    paddingBottom: 20,
  },

  buttonCancelar: {
    color: '#0805A3',
    fontSize: 15,
    paddingLeft: 138,
    textDecorationLine: 'underline',
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

  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },

  checkbox: {
    margin: 8,
    borderRadius: 15,
  },

  textCheckBox: {
    color: '#211DFF',
  },

  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 300,
  },

  tipoContainer: {
    marginBottom: 5,
  },
});
