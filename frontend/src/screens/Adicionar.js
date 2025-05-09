/* eslint-disable react/react-in-jsx-scope */
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Adicionar() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/Fundo1.png')}
        style={styles.imageBackground}>
        <Text style={styles.title}>Adicionar</Text>
        <View style={styles.formContext}>
          <TouchableOpacity
            style={styles.buttonCadastrar}
            onPress={() => navigation.navigate('CadastrarProfessor')}>
            <Text style={styles.buttonText}>Professor</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonCadastrar}
            onPress={() => navigation.navigate('CadastrarSetor')}>
            <Text style={styles.buttonText}>Setor</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonCadastrar}
            onPress={() => navigation.navigate('stacksEspaco')}
          >
            <Text style={styles.buttonText}>Espaço</Text>
          </TouchableOpacity>
        </View>
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

  title: {
    color: '#FFFFFF',
    fontSize: 30,
    textAlign: 'center',
    paddingBottom: 30,
  },

  formContext: {
    backgroundColor: '#FFFFFF',
    width: '85%',
    height: '70%',
    borderRadius: 30,
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
    margin: 25,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
});
