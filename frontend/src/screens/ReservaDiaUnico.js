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
  const {id_espaco, email, tipoSolicitacao} = route.params;
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
      'Sábado',
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

    const dayOfWeek = getDayOfWeek(date);

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
          [{text: 'OK', onPress: () => {}}],
        );
        return;
      }

      const gestorDisponibilidade = {};
      gestorQuerySnapshot.forEach(doc => {
        const gestor = doc.data();
        const gestorHorarios = gestor.intervalos || [];

        gestorHorarios.forEach(horario => {
          if (!gestorDisponibilidade[horario]) {
            gestorDisponibilidade[horario] = {
              email: gestor.email,
              horarios: [],
            };
          }
          gestorDisponibilidade[horario].horarios.push(horario);
        });
      });

      const horariosDisponiveis = selectedIntervals.filter(interval =>
        Object.keys(gestorDisponibilidade).includes(interval),
      );

      if (horariosDisponiveis.length === 0) {
        Alert.alert(
          'Aviso',
          'Não foi possível realizar a solicitação, pois nos horários solicitados não há gestor de reserva cadastrado.',
          [{text: 'OK', onPress: () => {}}],
        );
        return;
      }

      const horariosIndisponiveis = selectedIntervals.filter(
        interval => !horariosDisponiveis.includes(interval),
      );

      const proceedWithAvailableHorarios = async () => {
        const reservasPorGestor = {};
        horariosDisponiveis.forEach(horario => {
          const gestorEmail = gestorDisponibilidade[horario].email;
          if (!reservasPorGestor[gestorEmail]) {
            reservasPorGestor[gestorEmail] = [];
          }
          reservasPorGestor[gestorEmail].push(horario);
        });

        await Promise.all(
          Object.keys(reservasPorGestor).map(async gestorEmail => {
            const reservaData = {
              solicitanteEmail: email,
              espacoID: id_espaco,
              data: date.toISOString(),
              horarios: reservasPorGestor[gestorEmail],
              justificativa,
              gestorEmail,
              tipoSolicitacao,
            };
            await firestore()
              .collection('Solicitacao_Reserva')
              .add(reservaData);
            console.log(
              'Solicitação de reserva salva com sucesso:',
              reservaData,
            );
          }),
        );

        Alert.alert('Solicitação de reserva salva com sucesso!', '', [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('SolicitarReserva');
              navigation.goBack();
            },
          },
        ]);
      };

      if (horariosIndisponiveis.length > 0) {
        Alert.alert(
          'Aviso',
          `Os horários ${horariosIndisponiveis.join(
            ', ',
          )} não estão disponíveis. A solicitação será realizada apenas para os horários disponíveis.`,
          [{text: 'OK', onPress: proceedWithAvailableHorarios}],
        );
      } else {
        await proceedWithAvailableHorarios();
      }
    } catch (error) {
      console.error('Erro ao salvar a solicitação de reserva: ', error);
      Alert.alert('Erro', 'Erro ao salvar a solicitação de reserva.', [
        {text: 'OK', onPress: () => {}},
      ]);
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
    paddingLeft: 15,
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
    width: '90%',
    marginLeft: 16,
    textAlign: 'right',
    paddingEnd: 5,
    color: 'blue',
  },

  selectListBox: {
    backgroundColor: '#ECEBFD',
  },

  selectListDropdown: {
    backgroundColor: '#ECEBFD',
  },
});
