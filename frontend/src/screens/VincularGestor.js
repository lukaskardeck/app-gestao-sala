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
import firestore from '@react-native-firebase/firestore';
import {SelectList} from 'react-native-dropdown-select-list';

export default function VincularGestor({navigation}) {
  const [CheckServico, setCheckServico] = useState(false);
  const [CheckReserva, setCheckReserva] = useState(false);

  const [modulos, setModulos] = useState([]);
  const [selectedModulo, setSelectedModulo] = useState('');
  const [sala, setSala] = useState('');
  const [espacos, setEspacos] = useState([]);
  const [selectedEspaco, setSelectedEspaco] = useState(null);
  const [espacoKey, setEspacoKey] = useState(0);

  useEffect(() => {
    const getModulos = async () => {
      const modulosQuery = await firestore().collection('Modulo').get();

      const allModulos = modulosQuery.docs.map(doc => ({
        key: doc.id,
        value: doc.data().nome,
        espacos: doc.data().espacos,
      }));

      console.log(allModulos);
      setModulos(allModulos);
    };

    getModulos();
  }, []);

  const loadEspacos = async modulo => {
    if (modulo && modulo.espacos) {
      try {
        const espacosQuery = await Promise.all(
          modulo.espacos.map(async espacoId => {
            const espacoDoc = await firestore()
              .collection('Espaco')
              .doc(espacoId)
              .get();
            if (espacoDoc.exists) {
              console.log(espacoDoc.data().nome);
              return {
                key: espacoDoc.id,
                value: espacoDoc.data().nome,
              };
            } else {
              console.warn(`Espaco with ID ${espacoId} does not exist.`);
              return null; // or handle the missing document case as needed
            }
          }),
        );

        // Filter out any null results (from non-existent documents)
        setEspacos(espacosQuery.filter(espaco => espaco !== null));
      } catch (error) {
        console.error('Error loading espacos:', error);
        setEspacos([]);
      }
    } else {
      setEspacos([]);
    }
  };

  const handleModuloChange = itemValue => {
    const selected = modulos.find(mod => mod.key === itemValue);
    setSelectedModulo(selected);
    setSelectedEspaco(null); // Reset the selected space
    setEspacoKey(prevKey => prevKey + 1);
    loadEspacos(selected);
  };

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
          <Text style={styles.textTitle1}>Vincular Gestor</Text>
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
            {/*<View style={styles.checkboxList}>
              <View>
                <Text style={styles.textForm}>Tipo de Gestor: </Text>
                <BouncyCheckbox
                  fillColor="blue"
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
                  onPress={isChecked => setCheckServico(isChecked)}
                />

                <BouncyCheckbox
                  fillColor="blue"
                  text={tiposGestor.reserva}
                  innerIconStyle={{borderWidth: 2}}
                  textStyle={{
                    textDecorationLine: 'none',
                    fontSize: 20,
                    color: 'blue',
                  }}
                  onPress={isChecked => setCheckReserva(isChecked)}
                />
              </View>
            </View>*/}

            <View
              style={{
                paddingHorizontal: 20,
              }}>
              <View style={styles.box}>
                <Text style={styles.textForm}>Módulo:</Text>
              </View>

              <View>
                <View style={styles.inputSelect}>
                  <SelectList
                    data={modulos}
                    setSelected={handleModuloChange}
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
            </View>

            {selectedModulo && (
              <View
                style={{
                  paddingHorizontal: 20,
                }}>
                <View style={styles.box}>
                  <Text style={styles.textForm}>Espaço:</Text>
                </View>

                <View>
                  <View style={styles.inputSelect}>
                    <SelectList
                      data={espacos}
                      key={espacoKey}
                      setSelected={setSelectedEspaco}
                      placeholder="Selecione o módulo"
                      maxHeight={150}
                    />
                  </View>
                </View>
              </View>
            )}

            {/*<View
              style={{
                paddingHorizontal: 20,
              }}>
              <Text style={styles.textForm}>Nome da sala:</Text>
              <TextInput
                placeholder="Ex.: Sala 01"
                keyboardType="ascii-capable"
                style={styles.input}
              />
            </View>*/}
          </View>

          <TouchableOpacity style={styles.buttonCadastrar}>
            <Text
              style={styles.buttonText}
              onPress={() => {
                if (selectedModulo && selectedEspaco) {
                    switch (selectedCheckbox) {
                        case 'servico': navigation.navigate('VincularGestorServico', {id_espaco: selectedEspaco});
                    }
                } else {
                    Alert.alert('Selecione o módulo e o espaço!');
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
