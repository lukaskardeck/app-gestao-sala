import {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {MultipleSelectList} from 'react-native-dropdown-select-list';
import firestore from '@react-native-firebase/firestore';

export default function VincularGestorterca({navigation, route}) {
  const [email, setEmail] = useState('');
  const id_espaco = route.params.id_espaco; // Pegando id_espaco da rota anterior

  const diasSemana = {
    segunda: 'Segunda',
    terca: 'Terça',
    quarta: 'Quarta',
    quinta: 'Quinta',
    sexta: 'Sexta',
    sabado: 'Sábado',
    domingo: 'Domingo',
  };

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

  const [selectedDays, setSelectedDays] = useState([]);
  const [mondayIntervals, setMondayIntervals] = useState([]);
  const [tuesdayIntervals, setTuesdayIntervals] = useState([]);
  const [wednesdayIntervals, setWednesdayIntervals] = useState([]);
  const [thursdayIntervals, setThursdayIntervals] = useState([]);
  const [fridayIntervals, setFridayIntervals] = useState([]);
  const [saturdayIntervals, setSaturdayIntervals] = useState([]);
  const [sundayIntervals, setSundayIntervals] = useState([]);

  const handleCheckboxPress = (day, isChecked) => {
    if (isChecked) {
      setSelectedDays([...selectedDays, day]);
    } else {
      setSelectedDays(selectedDays.filter(selectedDay => selectedDay !== day));
      handleIntervalSelect(day, []); // Limpa os intervalos selecionados ao desmarcar o checkbox
    }
  };

  const handleIntervalSelect = (day, selectedIntervals) => {
    switch (day) {
      case diasSemana.segunda:
        setMondayIntervals(selectedIntervals);
        break;
      case diasSemana.terca:
        setTuesdayIntervals(selectedIntervals);
        break;
      case diasSemana.quarta:
        setWednesdayIntervals(selectedIntervals);
        break;
      case diasSemana.quinta:
        setThursdayIntervals(selectedIntervals);
        break;
      case diasSemana.sexta:
        setFridayIntervals(selectedIntervals);
        break;
      case diasSemana.sabado:
        setSaturdayIntervals(selectedIntervals);
        break;
      case diasSemana.domingo:
        setSundayIntervals(selectedIntervals);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async () => {
    // Verifica se pelo menos um dia foi selecionado
    if (selectedDays.length === 0) {
      alert('Por favor, selecione pelo menos um dia da semana.');
      return;
    }

    // Verifica se todos os dias selecionados têm pelo menos um intervalo de horário selecionado
    for (let day of selectedDays) {
      let intervals = [];
      switch (day) {
        case diasSemana.segunda:
          intervals = mondayIntervals;
          break;
        case diasSemana.terca:
          intervals = tuesdayIntervals;
          break;
        case diasSemana.quarta:
          intervals = wednesdayIntervals;
          break;
        case diasSemana.quinta:
          intervals = thursdayIntervals;
          break;
        case diasSemana.sexta:
          intervals = fridayIntervals;
          break;
        case diasSemana.sabado:
          intervals = saturdayIntervals;
          break;
        case diasSemana.domingo:
          intervals = sundayIntervals;
          break;
        default:
          break;
      }

      if (intervals.length === 0) {
        alert(`Por favor, selecione pelo menos um horário para ${day}.`);
        return;
      }
    }

    try {
      // Verificação do email
      const userQuerySnapshot = await firestore()
        .collection('Usuario')
        .where('email', '==', email)
        .get();

      if (userQuerySnapshot.empty) {
        alert('Email não encontrado.');
        return;
      }

      const userId = userQuerySnapshot.docs[0].id;

      // Verificação do papel do usuário
      const userRoleQuerySnapshot = await firestore()
        .collection('Usuario_Papel')
        .where('id_usuario', '==', userId)
        .where('id_papel', '==', 2)
        .get();

      if (userRoleQuerySnapshot.empty) {
        alert('Usuário não possui o papel de gestor de reserva.');
        return;
      }

      const reservas = [];

      for (let day of selectedDays) {
        let intervals = [];
        switch (day) {
          case diasSemana.segunda:
            intervals = mondayIntervals;
            break;
          case diasSemana.terca:
            intervals = tuesdayIntervals;
            break;
          case diasSemana.quarta:
            intervals = wednesdayIntervals;
            break;
          case diasSemana.quinta:
            intervals = thursdayIntervals;
            break;
          case diasSemana.sexta:
            intervals = fridayIntervals;
            break;
          case diasSemana.sabado:
            intervals = saturdayIntervals;
            break;
          case diasSemana.domingo:
            intervals = sundayIntervals;
            break;
          default:
            break;
        }

        for (let interval of intervals) {
          const querySnapshot = await firestore()
            .collection('Espaco')
            .doc(id_espaco)
            .collection('Gestor_Reserva')
            .where('dia', '==', day)
            .where('intervalos', 'array-contains', interval)
            .get();

          if (!querySnapshot.empty) {
            alert(`Conflito detectado para ${day} no intervalo ${interval}.`);
            return;
          }
        }

        reservas.push({email, dia: day, intervalos: intervals});
      }

      console.log('Objetos a serem salvos:', reservas);

      const reservaBatch = firestore().batch();
      reservas.forEach(reserva => {
        const reservaRef = firestore()
          .collection('Espaco')
          .doc(id_espaco)
          .collection('Gestor_Reserva')
          .doc();
        reservaBatch.set(reservaRef, reserva);
      });

      await reservaBatch.commit();
      console.log('Reservas salvas com sucesso!');
      alert('Gestor de Reserva vinculado com sucesso!');
      navigation.navigate('VincularGestor');
    } catch (error) {
      console.error('Erro ao salvar as reservas: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/Fundo.png')}
        style={styles.imageBackground}>
        <Text style={styles.title}>Gestor de Reserva</Text>
        <ScrollView style={styles.formContext}>
          <View>
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

          <View style={styles.checkboxList}>
            <Text style={styles.sectionTitle}>Dias da Semana</Text>
            {Object.entries(diasSemana).map(([key, day]) => (
              <View key={key} style={styles.dayContainer}>
                <BouncyCheckbox
                  fillColor="blue"
                  text={day}
                  innerIconStyle={{borderWidth: 2}}
                  textStyle={{
                    textDecorationLine: 'none',
                    fontSize: 20,
                    color: 'blue',
                  }}
                  style={{marginBottom: 5}}
                  onPress={isChecked => handleCheckboxPress(day, isChecked)}
                />
                {selectedDays.includes(day) && (
                  <MultipleSelectList
                    setSelected={intervals =>
                      handleIntervalSelect(day, intervals)
                    }
                    data={data}
                    save="value"
                    placeholder="Selecione os intervalos"
                    boxStyles={styles.selectListBox}
                    dropdownStyles={styles.selectListDropdown}
                    maxHeight={200}
                    label={day}
                  />
                )}
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={styles.buttonCadastrar}
            onPress={handleSubmit}>
            <Text style={styles.buttonText}>Finalizar</Text>
          </TouchableOpacity>
        </ScrollView>
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
    marginTop: 10,
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
  checkboxList: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: '#0805A3',
    fontSize: 22,
    marginBottom: 5,
  },
  dayContainer: {
    marginBottom: 10,
  },
  selectListBox: {
    marginBottom: 5,
  },
  selectListDropdown: {
    marginBottom: 10,
  },
});
