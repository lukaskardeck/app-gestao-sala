import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Pressable,
  Keyboard,
  TextInput,
  Alert,
} from 'react-native';

//import { AntDesign } from '@expo/vector-icons';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

export default function VisualizarGestores({navigation, route}) {
  const espacoKey = route.params.item;

  const tiposGestor = {
    servico: 'Gestor de Serviço',
    reserva: 'Gestor de Reserva',
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
          <Text style={styles.textTitle1}>Visualizar Gestor</Text>
        </View>

        <View style={styles.formContext}>
          <View
            style={{
              gap: 30,
            }}>
            <View style={styles.checkboxList}>
              <View>
                <Text style={styles.textForm}>Tipo de Gestor: </Text>
                <BouncyCheckbox
                  fillColor="blue"
                  isChecked={selectedCheckbox === 'servico'}
                  text={tiposGestor.servico}
                  innerIconStyle={{borderWidth: 2}}
                  textStyle={{
                    textDecorationLine: 'none',
                    fontSize: 20,
                    color: 'blue',
                  }}
                  style={{
                    marginBottom: 5,
                  }}
                  onPress={() => handleCheckboxPress('servico')}
                />

                <BouncyCheckbox
                  fillColor="blue"
                  isChecked={selectedCheckbox === 'reserva'}
                  text={tiposGestor.reserva}
                  innerIconStyle={{borderWidth: 2}}
                  textStyle={{
                    textDecorationLine: 'none',
                    fontSize: 20,
                    color: 'blue',
                  }}
                  onPress={() => handleCheckboxPress('reserva')}
                />
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.buttonCadastrar}>
            <Text
              style={styles.buttonText}
              onPress={() => {
                if (selectedCheckbox === 'servico') {
                  navigation.navigate('VisualizarGestorServico', {espacoKey});
                } else if (selectedCheckbox === 'reserva') {
                  navigation.navigate('VisualizarGestorReserva', {espacoKey});
                } else {
                  Alert.alert('Selecione o Tipo de Gestor');
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
    marginBottom: 10,
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
});
