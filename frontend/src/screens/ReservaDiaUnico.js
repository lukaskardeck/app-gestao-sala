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
  Button,
} from 'react-native';

import DatePicker from 'react-native-date-picker';
import {MultipleSelectList} from 'react-native-dropdown-select-list';
import firestore from '@react-native-firebase/firestore';

export default function ReservaDiaUnico({navigation, route}) {
  const {id_espaco, email} = route.params;
  const [date, setDate] = useState(new Date());
  const [selectedIntervals, setSelectedIntervals] = useState([]);

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

  const getDayOfWeek = date => {
    const days = [
      'Domingo',
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sabado',
    ];
    return days[date.getDay()];
  };

  const handleSubmit = async () => {
    if (!email || selectedIntervals.length === 0) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const reservaData = {
      email,
      espacoID: id_espaco,
      data: date.toISOString(),
      horarios: selectedIntervals,
    };

    const dayOfWeek = getDayOfWeek(date);
    console.log(dayOfWeek);

    try {
      // Verificar disponibilidade do gestor de reserva
      const gestorQuerySnapshot = await firestore()
        .collection('Espaco')
        .doc(id_espaco)
        .collection('Gestor_Reserva')
        .where('dia', '==', dayOfWeek)
        .get();

      if (gestorQuerySnapshot.empty) {
        Alert.alert(
          'Erro',
          'Não há gestor de reserva disponível para este dia.',
        );
        return;
      }

      let gestorDisponivel = false;
      gestorQuerySnapshot.forEach(doc => {
        const gestor = doc.data();
        const gestorHorarios = gestor.intervalos || [];

        const horariosDisponiveis = selectedIntervals.some(interval =>
          gestorHorarios.includes(interval),
        );

        if (horariosDisponiveis) {
          gestorDisponivel = true;
        }
      });

      if (!gestorDisponivel) {
        Alert.alert('Erro', 'Os horários selecionados não estão disponíveis.');
        return;
      }

      // Verificação de conflito
      /*const conflictingQuery = await firestore()
        .collection('Solicitacao_reserva')
        .where('espacoID', '==', id_espaco)
        .where('data', '==', reservaData.data)
        .where('horarios', 'array-contains-any', selectedIntervals)
        .get();

      if (!conflictingQuery.empty) {
        Alert.alert('Erro', 'Conflito de reserva detectado. Por favor, escolha outro horário.');
        return;
      }*/

      // Salvando a solicitação de reserva
      await firestore().collection('Solicitacao_Reserva').add(reservaData);

      console.log('Solicitação de reserva salva com sucesso:', reservaData);
      Alert.alert('Solicitação de reserva salva com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar a solicitação de reserva: ', error);
      Alert.alert('Erro', 'Erro ao salvar a solicitação de reserva.');
    }
  };

  return (
    <Pressable onPress={Keyboard.dismiss} style={styles.container}>
      <ImageBackground
        source={require('../assets/Fundo.png')}
        style={styles.imageBackground}>
        <View>
          <Text style={styles.textTitle1}>Solicitar Reserva</Text>
        </View>

        <View style={styles.formContext}>
          <View>
            <View>
              <Text style={styles.textForm}>Selecione a data:</Text>
              <DatePicker date={date} onDateChange={setDate} mode="date" />
            </View>

            <View>
              <Text style={styles.textForm}>Selecione o(s) horários(s):</Text>
            </View>

            <View style={{paddingHorizontal: 20}}>
              <MultipleSelectList
                setSelected={setSelectedIntervals}
                data={data}
                save="value"
                placeholder="Selecione os horários"
                boxStyles={styles.selectListBox}
                dropdownStyles={styles.selectListDropdown}
                maxHeight={150}
                label="Horário(s) Selecionado(s)"
              />
            </View>
          </View>

          <TouchableOpacity style={styles.buttonCadastrar}>
            <Text
              style={styles.buttonText}
              onPress={() => {
                console.log(id_espaco);
                console.log(email);
                console.log(date);
                console.log(selectedIntervals);
                handleSubmit();
              }}>
              Continuar
            </Text>
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
  },

  textTitle1: {
    color: '#FFFFFF',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 50,
  },

  textTitle2: {
    color: '#FFFFFF',
    fontSize: 50,
    textAlign: 'center',
    marginBottom: 30,
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
    marginBottom: 80,
  },

  checkboxList: {
    paddingHorizontal: 20,
  },

  textForm: {
    color: 'blue',
    fontSize: 22,
    //backgroundColor: 'red',
    marginBottom: 20,
    paddingHorizontal: 20,
  },

  textForm2: {
    color: '#0805A3',
    fontSize: 22,
    paddingLeft: 20,
    marginTop: 15,
  },

  input: {
    width: '90%',
    borderRadius: 15,
    backgroundColor: '#ECEBFD',
    height: 50,
    //margin: 12,
    paddingLeft: 15,
    //marginLeft: 16,
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

  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },

  checkbox: {
    margin: 8,
    borderRadius: 15,
  },

  textCheckBox: {
    color: '#211DFF',
  },

  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 300,
  },

  tipoContainer: {
    marginBottom: 5,
  },
});
