import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Pressable,
  Keyboard,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function DetalhesEspaco({navigation, route}) {
  const espaco = route.params.item.value;
  const espacoKey = route.params.item.key;

  return (
    <Pressable onPress={Keyboard.dismiss} style={styles.container}>
      <ImageBackground
        source={require('../assets/Fundo.png')}
        style={styles.imageBackground}>
        <Text style={styles.title}>Espaço</Text>

        <View style={styles.formContext}>
          <View>
            <View style={styles.titleContainer}>
              <Ionicons name="home-outline" size={22} color="#0805A3" />
              <Text style={styles.nome}>{espaco.nome}</Text>
            </View>
            <View style={styles.moduleContainer}>
              <Ionicons name="layers-outline" size={22} color="#0805A3" />
              <Text style={styles.modulo}>{espaco.modulo.nome}</Text>
            </View>
          </View>

          <View style={styles.navbar}>
            <Ionicons
              name="people-outline"
              size={20}
              color="#0805A3"
              style={styles.icon}
            />
            <Text style={styles.capacidade}>Capacidade:</Text>
            <Text style={styles.capacidade2}>{espaco.capacidade}</Text>
          </View>

          <View style={styles.descriptionContainer}>
            <Ionicons name="document-text-outline" size={22} color="#0805A3" />
            <Text style={styles.descricao}>Descrição:</Text>
          </View>

          <Text style={styles.input}>{espaco.descricao}</Text>

          <View style={styles.alinhar}>
            <TouchableOpacity
              style={styles.buttons}
              onPress={() =>
                navigation.navigate('DetalhesEquipamentos', {item: espaco})
              }>
              <Text style={styles.text}>Equipamentos</Text>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color="#211DFF"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttons}
              onPress={() =>
                navigation.navigate('DetalhesAcessibilidades', {item: espaco})
              }>
              <Text style={styles.text}>Acessibilidades</Text>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color="#211DFF"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttons}
              onPress={() => {
                navigation.navigate('ReservasDoEspaco', {
                  item: {...espaco, espacoKey},
                });
                console.log({...espaco, espacoKey});
              }}>
              <Text style={styles.text}>Reservas</Text>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color="#211DFF"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttons2}
              onPress={() =>
                navigation.navigate('VisualizarGestores', {item: espacoKey})
              }>
              <Text style={styles.text}>Gestores</Text>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color="#211DFF"
              />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
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
    paddingBottom: 20,
    marginTop: 10,
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
    height: '80%',
    borderRadius: 30,
    marginBottom: 10,
  },

  input: {
    width: '90%',
    height: '20%',
    borderRadius: 15,
    backgroundColor: '#ECEBFD',
    margin: 12,
    paddingLeft: 15,
    paddingTop: 15,
    marginLeft: 16,
    color: '#0805A3',
  },

  goBack: {
    marginRight: 300,
  },

  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    marginBottom: 10,
  },

  b: {
    width: 40,
    height: 40,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    backgroundColor: '#211DFF',
  },

  navbar2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  b2: {
    width: 40,
    height: 40,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    backgroundColor: '#211DFF',
    marginLeft: 200,
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },

  moduleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    marginBottom: 30,
  },

  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    marginTop: 20,
  },

  nome: {
    color: '#0805A3',
    fontSize: 22,
    marginLeft: 8,
  },

  modulo: {
    color: '#0805A3',
    marginLeft: 8,
  },

  capacidade: {
    color: '#466EB6',
    marginRight: 5,
  },

  capacidade2: {
    color: '#211DFF',
  },

  descricao: {
    color: '#466EB6',
    marginLeft: 8,
  },

  icon: {
    marginRight: 5,
  },

  buttons: {
    marginBottom: 30,
    width: '70%',
    height: '10%',
    borderRadius: 15,
    backgroundColor: '#ECEBFD',
    paddingLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttons2: {
    marginBottom: 10,
    width: '70%',
    height: '10%',
    borderRadius: 15,
    backgroundColor: '#ECEBFD',
    paddingLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: '#0805A3',
    marginRight: 15,
  },

  alinhar: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },

  navbar3: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
});
