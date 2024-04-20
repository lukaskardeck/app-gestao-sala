/* eslint-disable react/react-in-jsx-scope */
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

export default function DetalhesSetor({route}) {
  const setor = route.params.item;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/Fundo1.png')}
        style={styles.imageBackground}>
        <Text style={styles.title}>{setor.sigla}</Text>
        <View style={styles.formContext}>
          <View style={styles.detalhesProfessor}>
            <View>
              <Text style={styles.titleInput}>Nome: </Text>
              <View style={styles.item}>
                <Text style={styles.text}>{setor.nome}</Text>
              </View>
            </View>

            <View>
              <Text style={styles.titleInput}>Email: </Text>
              <View style={styles.item}>
                <Text style={styles.text}>{setor.email}</Text>
              </View>
            </View>

            <View>
              <Text style={styles.titleInput}>Telefone: </Text>
              <View style={styles.item}>
                <Text style={styles.text}>{setor.telefone}</Text>
              </View>
            </View>
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

  detalhesProfessor: {
    flex: 1,
    justifyContent: 'space-around',
    borderRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 30,
    marginBottom: 50,
  },

  item: {
    backgroundColor: '#ECEBFD',
    padding: 10,
    marginVertical: 8,
    borderRadius: 20,
  },
  text: {
    fontSize: 16,
    color: '#0805A3',
  },

  titleInput: {
    fontSize: 20,
    color: '#0805A3',
  },
});
