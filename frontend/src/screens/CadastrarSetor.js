import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
//import { MaterialCommunityIcons } from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';

export default function CadastrarSetor() {
  const [errorMessage, setErrorMessage] = useState(null);
  //const [nome, setNome] = useState('');
  const [sigla, setSigla] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  async function addUsuarioComoSetor(sigla, email, telefone) {
    try {

      if (!sigla) {
        Alert.alert('Insira a sigla');
        return;
      }

      if (!email) {
        Alert.alert('Insira o email');
        return;
      }

      if (!telefone) {
        Alert.alert('Insira o telefone');
        return;
      }

      // Verificar se o usuário já existe com o email fornecido
      const snapshot = await firestore()
        .collection('Usuario')
        .where('email', '==', email)
        .get();

      if (snapshot.empty) {
        // Se o usuário não existir não existir na coleção (banco)
        console.log('Este email não cadastrado no sistema!');
        Alert.alert('Este email não cadastrado no sistema!');
        return;
      }

      // Obter o ID do usuário encontrado
      const userId = snapshot.docs[0].id;

      // Atualizar/criar os campos telefone e sigla do usuário
      await firestore().collection('Usuario').doc(userId).update({
        telefone: telefone,
        sigla: sigla,
      });

      // Adicionar um novo documento na coleção Usuario_Papel
      await firestore().collection('Usuario_Papel').add({
        id_usuario: userId,
        id_papel: 2,
      });

      console.log('Usuário adicionado como setor com sucesso');
      Alert.alert('Usuário adicionado como setor com sucesso');
      setSigla('');
      setEmail('');
      setTelefone('');
    } catch (error) {
      console.error('Erro ao adicionar usuário como setor:', error);
    }
  }

  // CAMPO NOME
  /**
   * 
   * <View style={styles.box}>
            <Text style={styles.textForm}>Nome:</Text>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          </View>
          <TextInput
            placeholder="Ex.: João"
            keyboardType="ascii-capable"
            style={styles.input}
            onChangeText={setNome}
            value={nome}
          />
   */

  /*function verification() {
    if (!nome.trim() || !email.trim() || !telefone.trim()) {
      Vibration.vibrate();
      setErrorMessage('campo obrigatório*');
    } else {
      setErrorMessage(null);
    }
  }

  function validation() {
    verification();
  }*/

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/Fundo.png')}
        style={styles.imageBackground}>
        <View>
          <Text style={styles.textTitle1}>Cadastrar</Text>
          <Text style={styles.textTitle2}>Setor</Text>
        </View>

        <View style={styles.formContext}>
          <View style={styles.box}>
            <Text style={styles.textForm}>Sigla:</Text>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          </View>
          <TextInput
            placeholder="Ex.: DCT"
            keyboardType="email-address"
            style={styles.input}
            onChangeText={setSigla}
            value={sigla}
          />

          <View style={styles.box}>
            <Text style={styles.textForm}>Email:</Text>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          </View>
          <TextInput
            placeholder="Ex.: joao@uesb.edu.br"
            keyboardType="email-address"
            style={styles.input}
            onChangeText={setEmail}
            value={email}
          />

          <View style={styles.box}>
            <Text style={styles.textForm}>Telefone:</Text>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          </View>
          <TextInput
            placeholder="Ex.: 12345678901"
            keyboardType="numeric"
            style={styles.input}
            onChangeText={setTelefone}
            value={telefone}
          />

          <TouchableOpacity style={styles.buttonCadastrar}>
            <Text
              style={styles.buttonText}
              onPress={async () => {
                //validation();
                await addUsuarioComoSetor(sigla, email, telefone);
              }}>
              Cadastrar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonCancelar}>Cancelar</Text>
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

  textTitle1: {
    color: '#FFFFFF',
    fontSize: 30,
    textAlign: 'center',
  },

  textTitle2: {
    color: '#FFFFFF',
    fontSize: 50,
    textAlign: 'center',
  },

  iconTitle: {
    paddingTop: 10,
    paddingLeft: 50,
    paddingBottom: 30,
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
    height: '70%',
    borderRadius: 30,
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
});
