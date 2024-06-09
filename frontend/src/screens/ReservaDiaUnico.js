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
  TextInput,
} from 'react-native';

import DatePicker from 'react-native-date-picker';
import {MultipleSelectList} from 'react-native-dropdown-select-list';
import firestore from '@react-native-firebase/firestore';

export default function ReservaDiaUnico({navigation, route}) {
  const {id_espaco, email} = route.params;
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selectedIntervals, setSelectedIntervals] = useState([]);
  const [formattedDate, setFormattedDate] = useState('Selecione a data:');
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [justificativa, setjustificativa] = useState('');
  const maxCaracteres = 200;

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

  const formatDate = date => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `Data selecionada: \n${day}/${month}/${year}`;
  };

  const handleSubmit = async () => {
    if (!isDateSelected) {
        Alert.alert('Erro', 'Por favor, selecione uma data.');
        return; 
    }

    if (selectedIntervals.length === 0) {
      Alert.alert('Erro', 'Por favor, selecione ao menos um horário.');
      return;
    }

    if (!justificativa) {
        Alert.alert('Erro', 'Por favor, adicione uma justificativa');
        return;
    }

    const reservaData = {
      email,
      espacoID: id_espaco,
      data: date.toISOString(),
      horarios: selectedIntervals,
      justificativa,
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
      navigation.navigate('SolicitarReserva');
      navigation.goBack();
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
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 20,
                }}>
                <Text style={styles.textForm}>{formattedDate}</Text>
                <Button title="Date" onPress={() => setOpen(true)} />
              </View>
              <DatePicker
                modal
                mode="date"
                minimumDate={new Date()}
                open={open}
                date={date}
                onConfirm={selectedDate => {
                  setOpen(false);
                  setDate(selectedDate);
                  setFormattedDate(formatDate(selectedDate));
                  setIsDateSelected(true);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </View>

            <View>
              <View>
                <Text style={styles.textForm}>Selecione o(s) horários(s):</Text>
              </View>

              <View style={{paddingHorizontal: 20, marginVertical: 10}}>
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

            <View>
            <Text style={styles.textForm}>Justificativa:</Text>
            <TextInput
              placeholder="Ex.: Ministrar aula prática de Engenharia de Software I"
              keyboardType="ascii-capable"
              multiline={true}
              style={styles.textArea}
              value={justificativa}
              onChangeText={setjustificativa}
              maxLength={maxCaracteres}
            />
            <Text style={styles.textCountChar}>
              {justificativa.length}/{maxCaracteres}
            </Text>
          </View>
          </View>

          <TouchableOpacity style={styles.buttonCadastrar}>
            <Text
              style={styles.buttonText}
              onPress={() => {
                // console.log(id_espaco);
                // console.log(email);
                // console.log(isDateSelected);
                // if (isDateSelected) console.log(date);
                // console.log(selectedIntervals);
                handleSubmit();
              }}>
              Finalizar
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

  textArea: {
    height: 150,
    width: '90%',
    borderRadius: 5,
    backgroundColor: '#ECEBFD',
    padding: 10,
    textAlignVertical: 'top',
    marginLeft: 16,
    marginTop: 10,
  },

  textCountChar: {
    //backgroundColor: 'gray',
    width: '90%',
    marginLeft: 16,
    textAlign: 'right',
    paddingEnd: 5,
    color: 'blue',
  },
});
