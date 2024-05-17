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
  Alert,
} from 'react-native';

//import { AntDesign } from '@expo/vector-icons';
//import MEditar from '../components/MEditar';
import firestore from '@react-native-firebase/firestore';
import {SelectList} from 'react-native-dropdown-select-list';

export default function EditarProfessor({navigation, route}) {
  //const [modalVisible, setModalVisible] = useState(false);
  const professor = route.params.item;
  const emailProf = professor.value.email;
  const nomeProf = professor.value.nome;
  const telefoneProf = professor.value.telefone;

  const [newNome, setNewNome] = useState(nomeProf);
  const [newEmail, setNewEmail] = useState(emailProf);
  const [newTelefone, setNewTelefone] = useState(telefoneProf);
  const [setores, setSetores] = useState([]);
  const [selectedSetor, setSelectedSetor] = useState();

  useEffect(() => {
    const getSetores = async () => {
      const snapshot = await firestore()
        .collection('Usuario_Papel')
        .where('id_papel', '==', 2)
        .get();

      const idUsers = snapshot.docs.map(doc => doc.data().id_usuario);

      //console.log('IDs: ', idUsers);

      const snapshot2 = await firestore()
        .collection('Usuario')
        .where(firestore.FieldPath.documentId(), 'in', idUsers)
        .get();

      const idESiglas = snapshot2.docs.map(doc => ({
        key: doc.id,
        value: doc.data().sigla,
      }));

      setSetores(idESiglas);
    };

    getSetores();
  }, [professor]);

  async function EditarDadosProfessor(idSetor, email, nome, telefone) {
    try {
      // TRATANDO O SETOR
      if (!idSetor) {
        Alert.alert('Selecione o setor');
        return;
      }
      idSetor = idSetor.trim();

      // TRATANDO O CAMPO NOME
      if (!nome) {
        Alert.alert('Insira o nome');
        return;
      }
      nome = nome.trim();

      // TRATANDO CAMPO DE TELEFONE
      if (!telefone) {
        Alert.alert('Insira o telefone');
        return;
      }
      telefone = telefone.trim();

      // TRATANDO O EMAIL
      if (!email) {
        Alert.alert('Insira o email');
        return;
      }
      email = email.trim();
      if (!email.endsWith('@uesb.edu.br')) {
        Alert.alert('Email inválido!\nInforme um email institucional.');
        return;
      }

      // Verificar se o usuário já existe com o email fornecido
      const snapshot = await firestore()
        .collection('Usuario')
        .where('email', '==', email)
        .get();

      let userEmail = snapshot.docs[0].data().email;

      if (!snapshot.empty && email !== userEmail) {
        Alert.alert(
          'O email inserido já está cadastrado no banco',
          'Informe um outro email.',
        );
        return;
      }

      /*setNewEmail('');
      setNewNome('');
      setNewTelefone('');
      setSelectedSetor('');*/

      firestore()
        .collection('Usuario')
        .doc(professor.key)
        .update({
          nome: nome,
          email: email,
          setor: idSetor,
          telefone: telefone,
        });

      console.log('Dados do professor editado com sucesso');
      Alert.alert('Dados do professor editado com sucesso');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao editar os dados do professor:', error);
    }
  }

  const alertCancelar = async () => {
    Alert.alert('Cancelar', 'Deseja cancelar a edição?', [
      {
        text: 'Não',
      },
      {
        text: 'Sim',
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  return (
    <Pressable onPress={Keyboard.dismiss} style={styles.container}>
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

        <Text style={styles.title}>Editar Professor</Text>

        <View style={styles.formContext}>
          {/*CAMPO DO SETOR DO PROFESSOR*/}
          <View>
            <Text style={styles.textForm}>Setor</Text>
            <View style={styles.inputSelect}>
              <SelectList
                data={setores}
                setSelected={setSelectedSetor}
                defaultOption={{
                  key: professor.value.keySetor,
                  value: professor.value.siglaSetor,
                }}
                dropdownStyles={{
                  zIndex: 2,
                  position: 'absolute',
                  top: 50,
                  backgroundColor: 'white',
                  width: '100%',
                }}
                maxHeight={150}
              />
            </View>
          </View>

          {/*CAMPO DO NOME DO PROFESSOR*/}
          <View style={styles.box}>
            <Text style={styles.textForm}>Nome:</Text>
          </View>
          <TextInput
            value={newNome}
            onChangeText={setNewNome}
            keyboardType="ascii-capable"
            style={styles.input}
          />

          {/*CAMPO DO EMAIL DO PROFESSOR*/}
          <View style={styles.box}>
            <Text style={styles.textForm}>Email:</Text>
          </View>
          <TextInput
            value={newEmail}
            onChangeText={setNewEmail}
            keyboardType="email-address"
            style={styles.input}
          />

          {/*CAMPO DO TELEFONE DO PROFESSOR*/}
          <View style={styles.box}>
            <Text style={styles.textForm}>Telefone:</Text>
          </View>
          <TextInput
            value={newTelefone}
            onChangeText={setNewTelefone}
            keyboardType="numeric"
            style={styles.input}
          />

          <TouchableOpacity
            style={styles.buttonCadastrar}
            onPress={() =>
              EditarDadosProfessor(selectedSetor, newEmail, newNome, newTelefone)
            }>
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>

          {/*<MEditar visible={modalVisible} onClose={() => setModalVisible(false)}/>*/}
          <TouchableOpacity
            style={styles.button}
            onPress={() => alertCancelar()}>
            <Text style={styles.buttonCancelar}>Cancelar</Text>
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
    marginTop: 70,
  },

  textTitle2: {
    color: '#FFFFFF',
    fontSize: 50,
    textAlign: 'center',
    marginBottom: 15,
  },

  iconTitle: {
    paddingTop: 10,
    paddingLeft: 50,
    paddingBottom: 40,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 30,
    textAlign: 'center',
    paddingBottom: 30,
    marginTop: 50,
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
    marginBottom: 70,
    marginTop: 20,
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
    margin: 10,
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

  goBack: {
    marginRight: 300,
  },

  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  b: {
    width: 40,
    height: 40,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    backgroundColor: '#211DFF',
  },

  navbar2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  b2: {
    width: 40,
    height: 40,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    backgroundColor: '#211DFF',
    marginLeft: 200,
  },

  inputSelect: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
