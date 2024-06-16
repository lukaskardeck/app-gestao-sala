import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Pressable,
  Keyboard,
  ScrollView,
  Modal,
} from 'react-native';
import {
  Calendar,
  CalendarList,
  Agenda,
  LocaleConfig,
} from 'react-native-calendars';

import {AntDesign} from '@expo/vector-icons';

export default function ReservasDoEspaco({navigation, route}) {
  const espaco = route.params.item;
  const [selected, setSelected] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Pressable onPress={Keyboard.dismiss} style={styles.container}>
      <ImageBackground
        source={require('../assets/Fundo.png')}
        style={styles.imageBackground}>
        <Text style={styles.title}>Espaço</Text>

        <View style={styles.formContext}>
          <Calendar
            // Customize the appearance of the calendar
            style={{
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
            }}
            // Callback that gets called when the user selects a day
            onDayPress={day => {
              setSelected(day.dateString);
              setModalVisible(true);
            }}
            // Mark specific dates as marked
          />
        </View>
      </ImageBackground>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Agenda para {selected}</Text>
            <ScrollView style={styles.listAgendas}>
            
                <View style={styles.detalheAgenda}>
                  <Text style={styles.tituloIntervalo}>07:30 - 08:20</Text>
                  <View style={styles.separator}></View>
                  <View >
                    <Text>Status: Ocupado</Text>
                    <Text>Responsável: Professor A</Text>
                    <Text>Descrição: Aula de Engenharia de Software II</Text>
                  </View>
                </View>
                
                <View style={styles.detalheAgenda}>
                  <Text style={styles.tituloIntervalo}>08:20 - 09:10</Text>
                  <View style={styles.separator}></View>
                  <View >
                    <Text>Status: Livre</Text>
                  </View>
                </View>

                <View style={styles.detalheAgenda}>
                  <Text style={styles.tituloIntervalo}>09:10 - 10:00</Text>
                  <View style={styles.separator}></View>
                  <View >
                    <Text>Status: Ocupado</Text>
                    <Text>Responsável: Setor B</Text>
                    <Text>Descrição: Reunião Colegiado</Text>
                  </View>
                </View>
                {/* Adicione mais detalhes da agenda aqui */}
            </ScrollView>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },

  title: {
    color: '#FFFFFF',
    fontSize: 30,
    textAlign: 'center',
    flex: 1,
    textAlignVertical: 'center',
  },

  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
  },

  formContext: {
    backgroundColor: '#FFFFFF',
    width: '90%',
    height: '100%',
    borderRadius: 30,
    marginBottom: 30,
    flex: 6,
    // Propriedades de sombra para iOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  detalheDia: {
    backgroundColor: 'green',
    height: '100%',
    flex: 1,
    marginTop: 10,
  },

  detalheAgenda: {
    backgroundColor: '#2196F3',
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
  },

  nome: {
    color: '#0805A3',
    fontSize: 22,
    marginLeft: 16,
  },

  modulo: {
    color: '#0805A3',
    marginLeft: 16,
    marginBottom: 30,
  },

  text: {
    color: '#0805A3',
    marginRight: 15,
    marginLeft: 16,
    marginBottom: 20,
    fontSize: 22,
  },

  navbar2: {
    backgroundColor: '#ECEBFD',
    width: '90%',
    height: '50%',
    marginLeft: 16,
    borderRadius: 20,
    paddingLeft: 16,
    paddingTop: 16,
  },

  list: {
    marginBottom: 10,
    color: '#0805A3',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  buttonClose: {
    backgroundColor: '#2196F3',
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 24,
  },

  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#CED0CE',
    marginVertical: 10,
  },

  tituloIntervalo: {
    fontSize: 20,
    color: '#fff',
  },

  listAgendas: {
    marginBottom: 20,
    paddingBottom: 10,
  },
});
