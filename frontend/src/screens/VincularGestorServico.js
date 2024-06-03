/* eslint-disable react/react-in-jsx-scope */
import {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function VincularGestorServico({navigation, route}) {
  const [email, setEmail] = useState('');
  const id_espaco = route.params.id_espaco; // Pegando id_espaco da rota anterior

  const handleVerifyAndAddGestor = async () => {
    try {
      // 1. Verificar se existe um documento na coleção "Usuario" com um campo 'email' igual ao digitado
      const userQuery = await firestore().collection('Usuario').where('email', '==', email).get();
      
      if (userQuery.empty) {
        Alert.alert('Erro', 'Usuário não encontrado.');
        return;
      }

      const userDoc = userQuery.docs[0];
      const userId = userDoc.id;

      console.log('userdoc + userid: ' + userDoc + userId);

      // 2. Verificar se o usuário possui o id_papel 1 ou 2 na coleção "Usuario_Papel"
      const papelQuery = await firestore()
        .collection('Usuario_Papel')
        .where('id_usuario', '==', userId)
        .where('id_papel', 'in', [1, 2])
        .get();

      if (papelQuery.empty) {
        Alert.alert('Erro', 'Usuário não possui os papéis necessários.');
        return;
      }

      console.log('Papel Query: ' + papelQuery);

      // 3. Adicionar um novo documento na coleção "Gestor_Servico" com os campos id_usuario e id_espaco
      await firestore().collection('Gestor_Servico').add({
        id_usuario: userId,
        id_espaco: id_espaco,
      });

      // 4. Atualizar o documento do espaço com o novo gestor de serviço
      const espacoRef = firestore().collection('Espaco').doc(id_espaco);
      await espacoRef.update({
        gestor_servico: firestore.FieldValue.arrayUnion(email),
      });

      Alert.alert('Sucesso', 'Vínculo de gestor de serviço foi feito com sucesso.');
    } catch (error) {
      console.error('Erro ao verificar e adicionar gestor:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao processar sua solicitação.');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/Fundo.png')}
        style={styles.imageBackground}>
        <Text style={styles.title}>Gestor de Serviço</Text>
        <View style={styles.formContext}>
          <View style={{
            marginTop: 20,
          }}>
            <View style={styles.box}>
              <Text style={styles.textForm}>Email:</Text>
            </View>
            <TextInput
              placeholder="Ex.: joao@uesb.edu.br"
              keyboardType="email-address"
              style={styles.input}
              onChangeText={setEmail}
              value={email}
            />
          </View>

          <TouchableOpacity style={styles.buttonCadastrar}>
            <Text style={styles.buttonText} onPress={async () => {
              console.log(id_espaco);
              await handleVerifyAndAddGestor();
              navigation.navigate('VincularGestor');
            }}>Finalizar</Text>
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

  input: {
    width: '90%',
    borderRadius: 15,
    backgroundColor: '#ECEBFD',
    height: 50,
    margin: 12,
    paddingLeft: 15,
    marginLeft: 16,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 30,
    textAlign: 'center',
    paddingBottom: 30,
    marginTop: 50,
  },

  formContext: {
    backgroundColor: '#FFFFFF',
    width: '85%',
    height: '60%',
    paddingTop: 20,
    borderRadius: 30,
    marginBottom: 50,
    gap: 100,
  },

  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonCadastrar: {
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    backgroundColor: '#211DFF',
    paddingTop: 14,
    paddingBottom: 14,
    marginLeft: 50,
    margin: 25,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },

  buttonAdd: {
    fontSize: 20,
    color: 'white',
    backgroundColor: 'blue',
    width: '10%',
    textAlign: 'center',
    marginLeft: 20,
    marginTop: 15,
  },

  textForm: {
    color: '#0805A3',
    fontSize: 22,
    paddingLeft: 20,
  },
  box: {
    flexDirection: 'row',
  },
});
