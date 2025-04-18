import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
//import { EvilIcons } from '@expo/vector-icons';
import { useState } from 'react';

export default function MEditarMensagem({ visible, onClose, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ECEBFD', }}>

          <View style={styles.container2}>
            {/*<EvilIcons name="check" size={200} color="#0805A3" />*/}
            <Text style={styles.text}>Atualizado com Sucesso!</Text>
          </View>

          <TouchableOpacity onClose={() => setModalVisible(false)} style={styles.button}>
            <Text style={styles.buttonText}>Retornar para a tela de Editar</Text>
          </TouchableOpacity>

        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({

  container2: {
    borderColor: "#0805A3",
    borderWidth: 2,
    borderRadius: 15,
    width: "80%",
    height: "40%",
    alignItems: "center",
    justifyContent: "center",

  },

  text: {
    color: "#0805A3",
    fontSize: 20,
    marginTop: 20,
  },

  button: {
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    height: "10%",
    backgroundColor: "#211DFF",
    marginTop: 70,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
  },

})