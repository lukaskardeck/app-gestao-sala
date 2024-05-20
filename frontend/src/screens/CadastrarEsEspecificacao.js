import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
//import BouncyCheckbox from 'react-native-bouncy-checkbox';

export default function CadastrarEsEspecificacao({navigation, route}) {
  const infoWithEquip = route.params.infoWithEquip;
  const [capacidade, setCapacidade] = useState();
  const [descricao, setDescricao] = useState('');
  const maxCaracteres = 200;

  const cadastrarEspacoEModulo = async dados => {
    try {
      // 1. Adicionar novo documento na coleção 'Espaco'
      const espacoData = {
        acessibilidades: dados.acessibilidades,
        capacidade: dados.capacidade,
        descricao: dados.descricao,
        equipamentos: dados.equipamentos,
        nome: dados.espaco,
        // Adicione outras propriedades necessárias, exceto 'modulo'
      };

      const espacoRef = await firestore().collection('Espaco').add(espacoData);

      // 2. Obter o ID do novo documento adicionado
      const espacoId = espacoRef.id;

      // 3. Atualizar o documento na coleção 'Modulo'
      const moduloRef = await firestore()
        .collection('Modulo')
        .doc(dados.modulo.keyModulo);
      await moduloRef.update({
        espacos: firestore.FieldValue.arrayUnion(espacoId),
      });

      console.log(
        `Espaço adicionado com ID: ${espacoId} e módulo atualizado com sucesso.`,
      );
      Alert.alert('Espaço cadastrado com sucesso.');
      navigation.navigate('homeTab');
    } catch (error) {
      console.error('Erro ao adicionar espaço e atualizar módulo: ', error);
    }
  };

  // Exemplo de dados a serem cadastrados
  /*const dados = {
    acessibilidades: {
      checkCartCanhoto: false,
      checkElevador: false,
      checkPisoTatil: false,
      checkRampa: true,
    },
    capacidade: '10',
    descricao: 'Ola',
    equipamentos: [{nome: 'Projetor', quantidade: '1'}],
    espaco: '12',
    modulo: {keyModulo: 'adm', nomeModulo: 'Administração'},
  };*/

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/Fundo.png')}
        style={styles.imageBackground}>
        <View>
          <Text style={styles.textTitle1}>Cadastrar Espaço</Text>
          <Text style={styles.textTitle2}>Especificações</Text>
        </View>

        <View style={styles.formContext}>
          <View>
            <Text style={styles.textForm}>Capacidade:</Text>
            <TextInput
              placeholder="Ex.: 30"
              keyboardType="numeric"
              style={styles.input}
              value={capacidade}
              onChangeText={setCapacidade}
            />
          </View>

          <View>
            <Text style={styles.textForm}>Descrição:</Text>
            <TextInput
              placeholder="Ex.: Próximo ao audiovisual"
              keyboardType="ascii-capable"
              multiline={true}
              style={styles.textArea}
              value={descricao}
              onChangeText={setDescricao}
              maxLength={maxCaracteres}
            />
            <Text style={styles.textCountChar}>
              {descricao.length}/{maxCaracteres}
            </Text>
          </View>

          <TouchableOpacity style={styles.buttonCadastrar}>
            <Text
              style={styles.buttonText}
              onPress={async () => {
                //console.log(infoWithEquip);
                const info = {
                  ...infoWithEquip,
                  descricao,
                  capacidade,
                };

                await cadastrarEspacoEModulo(info);
                //navigation.navigate('Acessibilidade');
              }}>
              Finalizar
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
    gap: 20,
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
    marginLeft: 16,
    marginTop: 10,
    paddingLeft: 15,
  },

  textArea: {
    height: 150,
    width: '90%',
    borderRadius: 5,
    backgroundColor: '#ECEBFD',
    padding: 10,
    textAlignVertical: 'top',
    marginLeft: 16,
    marginTop: 10,
  },

  textCountChar: {
    //backgroundColor: 'gray',
    width: '90%',
    marginLeft: 16,
    textAlign: 'right',
    paddingEnd: 5,
    color: 'blue',
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
});
