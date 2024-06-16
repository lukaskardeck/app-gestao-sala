import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  Modal,
  Button,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const daysOfWeek = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
];

const data = [
  {key: '1', value: '07:30-08:20'},
  {key: '2', value: '08:20-09:10'},
  {key: '3', value: '09:10-10:00'},
  {key: '4', value: '10:00-11:00'},
  {key: '5', value: '11:00-11:50'},
  {key: '6', value: '11:50-12:40'},
  {key: '7', value: '14:00-14:50'},
  {key: '8', value: '14:50-15:40'},
  {key: '9', value: '15:40-16:30'},
  {key: '10', value: '16:30-17:30'},
  {key: '11', value: '17:30-18:20'},
];

export default function VisualizarGestorReserva({route}) {
  const navigation = useNavigation();
  const espaco = route.params;
  const [selectedDay, setSelectedDay] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [gestoresReserva, setGestoresReserva] = useState({});

  useEffect(() => {
    const fetchGestoresReserva = async () => {
      try {
        const espacoRef = firestore()
          .collection('Espaco')
          .doc(espaco.espacoKey);
        const gestoresReservaSnapshot = await espacoRef
          .collection('Gestor_Reserva')
          .get();

        let gestores = {};
        gestoresReservaSnapshot.forEach(doc => {
          const {dia, email, intervalos} = doc.data();
          if (!gestores[dia]) {
            gestores[dia] = [];
          }
          gestores[dia].push({email, intervalos});
        });

        setGestoresReserva(gestores);
      } catch (error) {
        console.error('Erro ao buscar gestores de reserva: ', error);
      }
    };

    fetchGestoresReserva();
  }, [espaco.espacoKey]);

  const showModal = day => {
    setSelectedDay(day);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedDay('');
    setModalVisible(false);
  };

  const renderModalContent = () => {
    const gestoresDoDia = gestoresReserva[selectedDay] || [];

    return (
      <View style={styles.modalView}>
        <Text style={styles.modalText}>
          Gestores de Reserva para {selectedDay}
        </Text>
        <ScrollView style={styles.scrollView}>
          {data.map(intervalo => {
            const gestor = gestoresDoDia.find(gestor =>
              gestor.intervalos.includes(intervalo.value),
            );

            return (
              <View key={intervalo.key} style={styles.intervaloContainer}>
                <Text style={styles.intervaloText}>{intervalo.value}</Text>
                {gestor ? (
                  <Text style={styles.gestorEmail}>{gestor.email}</Text>
                ) : (
                  <Text style={styles.noGestorText}>
                    Não há gestor para este intervalo
                  </Text>
                )}
              </View>
            );
          })}
        </ScrollView>
        <Button title="Fechar" onPress={closeModal} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/Fundo.png')}
        style={styles.imageBackground}>
        <Text style={styles.title}>Gestores de Reserva</Text>
        <View style={styles.formContext}>
          <View style={styles.buttonsContainer}>
            {daysOfWeek.map(day => (
              <Pressable
                key={day}
                style={styles.button}
                onPress={() => showModal(day)}>
                <Text style={styles.buttonText}>{day}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ImageBackground>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.centeredView}>{renderModalContent()}</View>
      </Modal>
    </View>
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
    marginTop: 20,
    marginBottom: 10,
  },

  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
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

  buttonsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },

  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 10,
    width: 100,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    height: '70%',
  },

  modalText: {
    fontSize: 24,
    marginBottom: 15,
    textAlign: 'center',
  },

  scrollView: {
    width: '100%',
    marginBottom: 10,
  },

  intervaloContainer: {
    backgroundColor: '#2196F3',
    padding: 10,
    marginVertical: 8,
    borderRadius: 10,
    width: '100%',
  },

  intervaloText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  gestorEmail: {
    color: '#FFFFFF',
    fontSize: 18,
  },

  noGestorText: {
    color: '#FF2D2D',
    fontSize: 18,
  },
});
