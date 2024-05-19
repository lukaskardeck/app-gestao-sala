/* eslint-disable react/react-in-jsx-scope */
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {SelectList} from 'react-native-dropdown-select-list';

export default function ConsultarEspaco({navigation}) {
  const navigateToDetails = item => {
    navigation.navigate('DetalhesProfessor', {item});
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        //navigateToDetails(item)
      }}>
      <View style={styles.item}>
        <Text style={styles.text}>{item.value.nome}</Text>
      </View>
    </TouchableOpacity>
  );

  const [modulosCompletos, setModulosCompletos] = useState({});
  const [modulos, setModulos] = useState([]);
  const [espacos, setEspacos] = useState([]);
  const [moduloSelecionado, setModuloSelecionado] = useState();
  const [espacoShow, setEspacoShow] = useState([]);

  useEffect(() => {
    // Buscar todos os módulos
    const fetchModulos = async () => {
      const modulosSnapshot = await firestore().collection('Modulo').get();
      const modulosObj = modulosSnapshot.docs.reduce((obj, doc) => {
        obj[doc.id] = doc.data();
        return obj;
      }, {});
      // Armazene os dados completos
      setModulosCompletos(modulosObj);

      // Crie um array filtrado com apenas os id's e nomes
      const modulosArray = Object.keys(modulosObj).map(id => ({
        key: id,
        value: modulosObj[id].nome, // Supondo que "nomeModulo" é o campo a ser exibido no SelectList
      }));

      
      setModulos(modulosArray);
    };

    // Buscar todos os espaços
    const fetchEspacos = async () => {
      const espacosSnapshot = await firestore().collection('Espaco').get();
      const espacosList = espacosSnapshot.docs.map(doc => ({
        key: doc.id,
        value: doc.data(),
      }));
      setEspacos(espacosList);
    };

    /*const filtrarEspacosPorModulo = () => {
      if (moduloSelecionado) {
        const espacoIds = modulosCompletos[moduloSelecionado].espacos;
        const espacosFiltrados = espacos.filter(espaco =>
          espacoIds.includes(espaco.key),
        );
        setEspacoPorModulo(espacosFiltrados);
      }
    };
*/
    fetchModulos();
    fetchEspacos();
    //filtrarEspacosPorModulo();
  }, []);
  //moduloSelecionado, modulosCompletos, espacos

  const filtrarEspacosPorModulo = () => {
    if (moduloSelecionado) {
      const espacoIds = modulosCompletos[moduloSelecionado].espacos;
      const espacosFiltrados = espacos.filter(espaco =>
        espacoIds.includes(espaco.key),
      );
      setEspacoShow(espacosFiltrados);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/Fundo1.png')}
        style={styles.imageBackground}>
        <Text style={styles.title}>Espaços</Text>
        <View style={styles.formContext}>
          <View style={styles.inputSelect}>
            <SelectList
              data={modulos}
              setSelected={setModuloSelecionado}
              placeholder="Filtre pelo módulo"
              dropdownStyles={{
                zIndex: 2,
                position: 'absolute',
                top: 42,
                backgroundColor: 'white',
                width: '100%',
              }}
              maxHeight={150}
            />
          </View>

          <View style={styles.buttonsFiltros}>
            <TouchableOpacity style={styles.buttonCadastrar}>
              <Text
                style={styles.buttonText}
                onPress={async () => filtrarEspacosPorModulo()}>
                Aplicar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCadastrar}>
              <Text
                style={styles.buttonText}
                onPress={async () => setEspacoShow([])}>
                Limpar
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.listProf}>
            {espacoShow.length > 0 ? (
              <FlatList
                data={espacoShow}
                renderItem={renderItem}
                keyExtractor={item => item.key}
              />
            ) : (
              <FlatList
                data={espacos}
                renderItem={renderItem}
                keyExtractor={item => item.key}
              />
            )}
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
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },

  listProf: {
    //flex: 1,
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

  buttonCadastrar: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#211DFF',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 12,
  },

  inputSelect: {
    paddingVertical: 10,
  },

  buttonsFiltros: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 5,
    marginBottom: 20,
  },
});
