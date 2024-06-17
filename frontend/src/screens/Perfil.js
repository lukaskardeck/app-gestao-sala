import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import Foto from '../assets/perfil_anonimo.png';

import { AuthContext } from '../contexts/Auth';

export default function Perfil() {
  let {user, SignOut} = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);

  const renderModalLogout = () => {
    return (
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.text}>Deseja sair da conta?</Text>
          </View>

          <TouchableOpacity 
          style={styles.modalButton}
          onPress={() => {
            SignOut();
          }}>
            <Text style={styles.modalButtonText}>Confirmar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.button2}>
            <Text style={styles.buttonText2}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/Fundo1.png')}
        style={styles.imageBackground}>

        <Text style={styles.title}>Meu Perfil</Text>

        <View style={styles.formContext}>
          <View style={styles.imagem}>
            <Image source={Foto} style={styles.imagem2} />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.textForm}>Nome:</Text>
            <Text style={styles.input}>{user.name}</Text>

            <Text style={styles.textForm}>E-mail:</Text>
            <Text style={styles.input}>{user.email}</Text>

            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
              <Text style={styles.buttonCancelar}>
                Sair da conta
              </Text>
            </TouchableOpacity>

            <Modal
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
              animationType="slide"
              transparent={true}>
              {renderModalLogout()}
            </Modal>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalContent: {
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#AC1515',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '80%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 30,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginBottom: 20,
  },
  formContext: {
    backgroundColor: '#FFFFFF',
    width: '85%',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    gap: 20,
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
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 300,
  },
  textForm: {
    color: '#0805A3',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 5,
  },
  input: {
    width: '90%',
    borderRadius: 15,
    backgroundColor: '#ECEBFD',
    height: 50,
    margin: 10,
    paddingTop: 15,
    textAlign: 'center',
    marginBottom: 30,
  },
  imagem: {
    marginTop: 30,
    marginBottom: 20,
    borderRadius: 150,
    backgroundColor: '#ECEBFD',
    width: 120,
    height: 120,
    alignItems: 'center',
    paddingBottom: 10,
  },
  textContainer: {
    width: '100%',
    alignItems: 'center',
  },
  imagem2: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  button: {
    paddingBottom: 20,
  },
  button2: {
    paddingVertical: 20,
  },
  buttonText2: {
    color: '#AC1515',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
  buttonCancelar: {
    color: '#AC1515',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
});
