import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  Keyboard,
  ScrollView,
  Modal,
  Button,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import firestore from '@react-native-firebase/firestore';

export default function ReservasDoEspaco({ navigation, route }) {
  const espaco = route.params.item;
  const [selected, setSelected] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [reservas, setReservas] = useState([]);
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const espacoRef = firestore().collection('Espaco').doc(espaco.espacoKey);
        const reservasSnapshot = await espacoRef.collection('Reserva').get();

        const reservasData = reservasSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setReservas(reservasData);

        // Extrair e formatar as datas das reservas para marcar no calendário
        const marked = {};
        reservasData.forEach(reserva => {
          if (Array.isArray(reserva.data)) {
            reserva.data.forEach(data => {
              const date = data.split('T')[0]; // Formato yyyy-mm-dd
              marked[date] = { marked: true,  selectedColor: '#0085E1', selected: true};
            });
          } else {
            const date = reserva.data.split('T')[0]; // Formato yyyy-mm-dd
            marked[date] = { marked: true,  selectedColor: '#0085E1', selected: true};
          }
        });

        setMarkedDates(marked);
      } catch (error) {
        console.error('Erro ao buscar reservas: ', error);
      }
    };

    fetchReservas();
  }, [espaco.espacoKey]);

  const data = [
    { key: '1', value: '07:30-08:20' },
    { key: '2', value: '08:20-09:10' },
    { key: '3', value: '09:10-10:00' },
    { key: '4', value: '10:00-11:00' },
    { key: '5', value: '11:00-11:50' },
    { key: '6', value: '11:50-12:40' },
    { key: '7', value: '14:00-14:50' },
    { key: '8', value: '14:50-15:40' },
    { key: '9', value: '15:40-16:30' },
    { key: '10', value: '16:30-17:30' },
    { key: '11', value: '17:30-18:20' },
  ];

  const generateTimeSlots = () => {
    const slots = [];
    data.forEach(item => {
      const [start, end] = item.value.split('-');
      slots.push({ start, end });
    });
    return slots;
  };

  const getReservationDetailsForDate = (date) => {
    return reservas.filter(reserva => {
      if (Array.isArray(reserva.data)) {
        return reserva.data.some(d => d.startsWith(date));
      }
      return reserva.data.startsWith(date);
    });
  };

  const selectedDateReservations = getReservationDetailsForDate(selected);

  return (
    <Pressable onPress={Keyboard.dismiss} style={styles.container}>
      <ImageBackground
        source={require('../assets/Fundo.png')}
        style={styles.imageBackground}>
        <Text style={styles.title}>Datas Reservadas</Text>

        <View style={styles.formContext}>
          <Calendar
            style={{
              
    borderRadius: 30,
            }}
            onDayPress={day => {
              setSelected(day.dateString);
              setModalVisible(true);
            }}
            markedDates={markedDates} // Marcando as datas de reserva no calendário
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
          <Text style={styles.modalText}>Agenda para {selected.split('-').reverse().join('/')}</Text>

            <ScrollView style={styles.listAgendas}>
              {generateTimeSlots().map(slot => {
                const reservation = selectedDateReservations.find(reserva =>
                  reserva.horarios.some(horario => horario.startsWith(slot.start))
                );

                return (
                  <View style={styles.detalheAgenda} key={`${slot.start}-${slot.end}`}>
                    <Text style={styles.tituloIntervalo}>{slot.start} - {slot.end}</Text>
                    <View style={styles.separator}></View>
                    {reservation ? (
                      <View>
                        <Text style={styles.textDescricao}>Status: <Text style={styles.ocupado}>ocupado</Text></Text>
                        <Text style={styles.textDescricao}>Responsável: {reservation.responsavel}</Text>
                        <Text style={styles.textDescricao}>Descrição: {reservation.justificativa}</Text>
                      </View>
                    ) : (
                      <Text style={styles.textDescricao}>Status: <Text style={styles.livre}>disponível</Text></Text>
                    )}
                  </View>
                );
              })}
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
    textAlignVertical: 'center',
  },

  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
  },

  formContext: {
    backgroundColor: '#FFFFFF',
    width: '90%',
    height: '54%',
    borderRadius: 30,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
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
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 3,
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
    width: '90%',
    height: '95%',
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
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },

  listAgendas: {
    marginBottom: 20,
    paddingBottom: 10,
  },

  textDescricao: {
    color: '#fff',
    fontSize: 20,
  },

  livre: {
    color: '#00FF00',
  },

  ocupado: {
    color: '#FF2D2D',
  },
});
