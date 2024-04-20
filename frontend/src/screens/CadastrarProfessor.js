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
import {SelectList} from 'react-native-dropdown-select-list';
//import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CadastrarProfessor() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [setores, setSetores] = useState([]);
  const [selectedSetor, setSelectedSetor] = useState('');

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
  }, []);

  async function addUsuarioComoProfessor(idSetor, email, nome, telefone) {
    try {
      if (!idSetor) {
        Alert.alert('Selecione o setor');
        return;
      }
      idSetor = idSetor.trim();

      if (!email) {
        Alert.alert('Insira o email');
        return;
      }
      email = email.trim();

      if (!nome) {
        Alert.alert('Insira o nome');
        return;
      }
      nome = nome.trim();

      if (!telefone) {
        Alert.alert('Insira o telefone');
        return;
      }
      telefone = telefone.trim();

      // Verificar se o usuário já existe com o email fornecido
      const snapshot = await firestore()
        .collection('Usuario')
        .where('email', '==', email)
        .get();

      let userId;

      if (snapshot.empty) {
        // Se o usuário não existir não existir na coleção (banco)
        const docRef = await firestore().collection('Usuario').add({
          email: email,
          nome: nome,
          telefone: telefone,
          setor: idSetor,
        });

        userId = docRef.id;
      } else {
        // Obter o ID do usuário encontrado
        userId = snapshot.docs[0].id;

        // Atualizar/criar os campos telefone e sigla do usuário
        await firestore().collection('Usuario').doc(userId).update({
          nome: nome,
          telefone: telefone,
          setor: idSetor,
        });
      }

      // Adicionar um novo documento na coleção Usuario_Papel
      await firestore().collection('Usuario_Papel').add({
        id_usuario: userId,
        id_papel: 1,
      });

      setEmail('');
      setNome('');
      setTelefone('');
      setSelectedSetor('');

      console.log('Usuário adicionado como professor com sucesso');
      Alert.alert('Usuário adicionado como professor com sucesso');
    } catch (error) {
      console.error('Erro ao adicionar usuário como professor:', error);
    }
  }

  /*function verification() {
    if (!nome.trim() || !email.trim() || !telefone.trim()) {
      //Vibration.vibrate();
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
          <Text style={styles.textTitle1}>Cadastrar Professor</Text>
          {/*<Text style={styles.textTitle2}>Professor</Text>*/}
        </View>

        <View style={styles.formContext}>
          {/** <View style={styles.box}>
            <Text style={styles.textForm}>Nome:</Text>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          </View>
          <TextInput
            placeholder="Ex.: João"
            keyboardType="ascii-capable"
            style={styles.input}
            onChangeText={setNome}
            value={nome}
  />*/}
          <View>
            <Text style={styles.textForm}>Setor</Text>
            <View style={styles.inputSelect}>
              <SelectList
                data={setores}
                setSelected={setSelectedSetor}
                placeholder="Selecione o setor"
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
              onPress={async () =>
                await addUsuarioComoProfessor(
                  selectedSetor,
                  email,
                  nome,
                  telefone,
                )
              }>
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
    marginBottom: 20,
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

  inputSelect: {
    paddingHorizontal: 20,
    paddingVertical: 20,
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
