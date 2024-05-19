import React, {useState, useMemo} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Pressable,
  Keyboard,
  ScrollView,
} from 'react-native';

//import { AntDesign } from '@expo/vector-icons';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

export default function CadastrarEsAcessibilidade({navigation, route}) {
  const [checkRampa, setCheckRampa] = useState(false);
  const [checkElevador, setCheckElevador] = useState(false);
  const [checkCartCanhoto, setCheckCartCanhoto] = useState(false);
  const [checkPisoTatil, setCheckPisoTatil] = useState(false);

  const localizacao = route.params.localizacao;

  /*function verification() {
    if (!nome.trim() || !email.trim() || !telefone.trim()) {
      Vibration.vibrate();
      setErrorMessage("campo obrigatório*")
    }
    else {
      setErrorMessage(null)
    }
  }

  function validation() {
    verification()
  }*/

  return (
    <Pressable onPress={Keyboard.dismiss} style={styles.container}>
      <ImageBackground
        source={require('../assets/Fundo.png')}
        style={styles.imageBackground}>
        <View>
          <Text style={styles.textTitle1}>Cadastrar Espaço</Text>
          <Text style={styles.textTitle2}>Acessibilidade</Text>
        </View>

        <View style={styles.formContext}>
          <View style={styles.checkboxList}>
            <BouncyCheckbox
              fillColor="blue"
              text="Acesso via rampa"
              innerIconStyle={{borderWidth: 2}}
              textStyle={{
                textDecorationLine: 'none',
                fontSize: 20,
                color: 'blue',
              }}
              onPress={isChecked => setCheckRampa(isChecked)}
            />

            <BouncyCheckbox
              fillColor="blue"
              text="Acesso via elevador"
              innerIconStyle={{borderWidth: 2}}
              textStyle={{
                textDecorationLine: 'none',
                fontSize: 20,
                color: 'blue',
              }}
              onPress={isChecked => setCheckElevador(isChecked)}
            />

            <BouncyCheckbox
              fillColor="blue"
              text="Carteira para canhoto"
              innerIconStyle={{borderWidth: 2}}
              textStyle={{
                textDecorationLine: 'none',
                fontSize: 20,
                color: 'blue',
              }}
              onPress={isChecked => setCheckCartCanhoto(isChecked)}
            />

            <BouncyCheckbox
              fillColor="blue"
              text="Piso tátil"
              innerIconStyle={{borderWidth: 2}}
              textStyle={{
                textDecorationLine: 'none',
                fontSize: 20,
                color: 'blue',
              }}
              onPress={isChecked => setCheckPisoTatil(isChecked)}
            />
          </View>

          <TouchableOpacity style={styles.buttonCadastrar}>
            <Text
              style={styles.buttonText}
              onPress={() => {
                const acessibilidades = {
                  checkRampa,
                  checkElevador,
                  checkCartCanhoto,
                  checkPisoTatil,
                };
                const infoWithAcess = {
                  ...localizacao,
                  acessibilidades,
                };

                console.log(infoWithAcess);
                navigation.navigate('Equipamento', {infoWithAcess});
                //console.log(localizacao);
                //console.log(checkRampa);
              }}>
              Continuar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Text
              style={styles.buttonCancelar}
              onPress={() => navigation.goBack()}>
              Voltar
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
    height: 'auto',
  },

  textTitle1: {
    color: '#FFFFFF',
    fontSize: 30,
    textAlign: 'center',
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
    gap: 15,
  },

  textForm: {
    color: '#0805A3',
    fontSize: 22,
    paddingLeft: 20,
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
    margin: 12,
    paddingLeft: 15,
    marginLeft: 16,
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
