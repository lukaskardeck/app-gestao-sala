import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Pressable,
  Keyboard,
  Alert,
} from 'react-native';

//import { AntDesign } from '@expo/vector-icons';
//import { FontAwesome6 } from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';
//import MExcluir from '../components/MExcluir';

export default function DetalhesSetor({navigation, route}) {
  //const [modalVisible, setModalVisible] = useState(false);
  const setor = route.params.item;

  const deletarUsuario = async (idUsuario) => {
    try {
      // Exclui o documento do usuário na coleção "Usuario"
      await firestore().collection('Usuario').doc(idUsuario).delete();
  
      // Busca o documento na coleção "Usuario_Papel" com base no ID do usuário
      const papelSnapshot = await firestore()
        .collection('Usuario_Papel')
        .where('id_usuario', '==', idUsuario)
        .get();
  
      // Exclui o documento encontrado na coleção "Usuario_Papel" (deve ser apenas um)
      papelSnapshot.forEach(async (doc) => {
        await doc.ref.delete();
      });
  
      console.log('Usuário e papel excluídos com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir usuário e papel:', error);
    }
  };

  const buttonAlertDelete = () =>
    Alert.alert('Delete', 'Deseja deletar o setor?', [
      {
        text: 'cancelar',
        onPress: () => Alert.alert('Deleção cancelada'),
        style: 'cancel',
      },
      {text: 'Sim', onPress: async () => {
        console.log(setor);
        try {
            await deletarUsuario(setor.key);
        } catch (error) {
            console.log(error);
            Alert.alert('Um erro ocorreu');
            navigation.goBack();
        }
        Alert.alert(`${setor.value.nome} deletado com sucesso!`, '', [
            {
              text: 'OK',
              onPress: () => navigation.goBack(),
            },
          ]);
      }},
    ]);

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

        <Text style={styles.title}>{setor.value.sigla.toUpperCase()}</Text>

        <View style={styles.formContext}>
          <View style={styles.box}>
            <Text style={styles.textForm}>Nome:</Text>
          </View>

          <Text style={styles.input}>{setor.value.nome}</Text>

          <View style={styles.box}>
            <Text style={styles.textForm}>Email:</Text>
          </View>

          <Text style={styles.input}>{setor.value.email}</Text>

          <View style={styles.box}>
            <Text style={styles.textForm}>Sigla:</Text>
          </View>

          <Text style={styles.input}>{setor.value.sigla}</Text>

          <View style={styles.box}>
            <Text style={styles.textForm}>Telefone:</Text>
          </View>

          <Text style={styles.input}>{setor.value.telefone}</Text>

          <View style={styles.navbar2}>
            <TouchableOpacity
              style={styles.b}
              onPress={() =>
                navigation.navigate('EditarSetor', {item: setor})
              }>
              {/*<FontAwesome6 name="edit" size={20} color="white" />*/}
              <Text style={{color: 'white'}}>Edit</Text>
            </TouchableOpacity>

            {/*<TouchableOpacity style={styles.b2} onPress={() => setModalVisible(true)}>
                            {/*<AntDesign name="delete" size={20} color="white" />*/}
            {/*<Text style={{color: 'white'}}>Del</Text>
                        </TouchableOpacity>*/}

            <TouchableOpacity style={styles.b2} onPress={() => buttonAlertDelete()}>
              {/*<AntDesign name="delete" size={20} color="white" />*/}
              <Text style={{color: 'white'}}>Del</Text>
            </TouchableOpacity>

            {/*<MExcluir visible={modalVisible} onClose={() => setModalVisible(false)}/>*/}
          </View>
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
    paddingTop: 15,
    marginLeft: 16,
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
});
