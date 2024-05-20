import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
//import firestore from '@react-native-firebase/firestore';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

export default function CadastrarEsEquipamento({navigation, route}) {
  const infoWithAcess = route.params.infoWithAcess;

  const [equipamentos, setEquipamentos] = useState([
    {id: 1, nome: 'Projetor', checked: false, quantidade: '1'},
    {id: 2, nome: 'Computador', checked: false, quantidade: '1'},
    {id: 3, nome: 'Ar-condicionado', checked: false, quantidade: '1'},
  ]);

  const handleCheckboxChange = id => {
    setEquipamentos(prevEquipamentos =>
      prevEquipamentos.map(equip =>
        equip.id === id ? {...equip, checked: !equip.checked} : equip,
      ),
    );
  };

  const handleQuantidadeChange = (id, quantidade) => {
    setEquipamentos(prevEquipamentos =>
      prevEquipamentos.map(equip =>
        equip.id === id ? {...equip, quantidade} : equip,
      ),
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/Fundo.png')}
        style={styles.imageBackground}>
        <View>
          <Text style={styles.textTitle1}>Cadastrar Espaço</Text>
          <Text style={styles.textTitle2}>Equipamentos</Text>
        </View>

        <View style={styles.formContext}>
          <View>
            <Text style={styles.textForm}>Selecione os equipamentos</Text>
          </View>

          <View style={styles.checkboxList}>
            {equipamentos.map(equip => (
              <View key={equip.id} style={styles.equipamentoContainer}>
                <BouncyCheckbox
                  isChecked={equip.checked}
                  onPress={() => handleCheckboxChange(equip.id)}
                  fillColor="blue"
                  //unfillColor="#FFFFFF"
                  text={equip.nome}
                  textStyle={styles.equipamentoText}
                  //iconStyle={{borderColor: 'green'}}
                  style={styles.checkbox}
                />
                {equip.checked && (
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={equip.quantidade}
                    onChangeText={text =>
                      handleQuantidadeChange(equip.id, text)
                    }
                    placeholder="Quantidade"
                  />
                )}
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.buttonCadastrar}>
            <Text
              style={styles.buttonText}
              onPress={() => {
                let equipamentosChecked = equipamentos.filter(eq => eq.checked).map( ({nome, quantidade}) =>  ({nome, quantidade}));
                const infoWithEquip = {
                  ...infoWithAcess,
                  equipamentos: equipamentosChecked,
                };
                console.log(infoWithEquip);
                navigation.navigate('Especificacao', {infoWithEquip});
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
    backgroundColor: '#fff',
    alignContent: 'center',
  },

  checkboxList: {
    marginVertical: 15,
  },

  equipamentoContainer: {
    //backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  checkbox: {
    flex: 1,
  },
  equipamentoText: {
    textDecorationLine: 'none',
    color: 'blue',
    fontSize: 18,
    //backgroundColor: 'blue',
    //textAlign: 'center',
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
    //backgroundColor: 'red',
    //paddingLeft: 20,
    textAlign: 'center',
  },

  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 0,
    start: -60,
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
