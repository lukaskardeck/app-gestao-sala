import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Pressable,
  Keyboard,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {SelectList} from 'react-native-dropdown-select-list';

//import { AntDesign } from '@expo/vector-icons';

export default function CadastrarEspaço({navigation}) {

  const [modulos, setModulos] = useState([]);
  const [selectedModulo, setSelectedModulo] = useState('');
  const [sala, setSala] = useState('');

  useEffect(() => {
    const getModulos = async () => {
      const modulosQuery = await firestore().collection('Modulo').get();

      const allModulos = modulosQuery.docs.map(doc => ({
        key: doc.id,
        value: doc.data().nome,
      }));

      console.log(allModulos);
      setModulos(allModulos);
    };

    getModulos();
  }, []);

  return (
    <View style={styles.container}>
        <ImageBackground
        source={require('../assets/Fundo.png')}
        style={styles.imageBackground}>
        <View style={styles.navbar}>
          <TouchableOpacity
            style={styles.goBack}
            onPress={() => navigation.goBack()}>
            {/*<AntDesign name="arrowleft" size={24} color="white" />*/}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            {/*<AntDesign name="bars" size={24} color="white" />*/}
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.textTitle1}>Cadastrar Espaço</Text>
          <Text style={styles.textTitle2}>Localização</Text>
        </View>

        <View style={styles.formContext}>
          <View style={styles.box}>
            <Text style={styles.textForm}>Módulo:</Text>
          </View>

          <View>
            <View style={styles.inputSelect}>
              <SelectList
                data={modulos}
                setSelected={setSelectedModulo}
                placeholder="Selecione o módulo"
                dropdownStyles={{
                  //zIndex: 2,
                  //position: 'absolute',
                  //top: 50,
                  backgroundColor: 'white',
                  width: '100%',
                }}
                maxHeight={150}
              />
            </View>
          </View>

          <View style={styles.box}>
            <Text style={styles.textForm}>Nome da sala:</Text>
          </View>

          <TextInput
            placeholder="Ex.: Sala 01"
            keyboardType="ascii-capable"
            style={styles.input}
            onChangeText={setSala}
            value={sala}
          />

          <TouchableOpacity style={styles.buttonCadastrar}>
            <Text
              style={styles.buttonText}
              onPress={() => {
                const allModulo = modulos.find(mod => mod.key === selectedModulo);
                const modulo = {
                    keyModulo: allModulo.key,
                    nomeModulo: allModulo.value,
                };
                const localizacao = {
                    modulo: modulo,
                    espaco: sala,
                };
                //console.log(localizacao);
                navigation.navigate('Acessibilidade', {localizacao});
              }}>
              Continuar
            </Text>
          </TouchableOpacity>
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

  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  textTitle1: {
    color: '#fff',
    fontSize: 30,
    textAlign: 'center',
    marginTop: 150,
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
    marginBottom: 100,
  },

  textForm: {
    color: '#0805A3',
    fontSize: 22,
    paddingLeft: 20,
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

  inputSelect: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
