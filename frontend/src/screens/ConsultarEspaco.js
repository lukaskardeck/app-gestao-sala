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

      modulosArray.splice(0, 0, {
        key: 'all',
        value: 'Todos os módulos',
      });

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
      setEspacoShow(espacosList);
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
      if (moduloSelecionado === 'all') {
        setEspacoShow(espacos);
      } else {
        const espacoIds = modulosCompletos[moduloSelecionado].espacos;
        const espacosFiltrados = espacos.filter(espaco =>
          espacoIds.includes(espaco.key),
        );
        setEspacoShow(espacosFiltrados);
      }
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
            {/*<Text style={styles.textModulo}>Selecione o módulo</Text>*/}
            <SelectList
              data={modulos}
              setSelected={setModuloSelecionado}
              onSelect={filtrarEspacosPorModulo}
              placeholder="Filtre pelo módulo"
              dropdownStyles={{
                zIndex: 2,
                position: 'absolute',
                top: 42,
                backgroundColor: 'white',
                width: '100%',
              }}
              maxHeight={250}
              defaultOption={{
                key: 'all',
                value: 'Todos os módulos',
              }}
            />
          </View>

          <View style={styles.listProf}>
            <FlatList
              data={espacoShow}
              renderItem={renderItem}
              keyExtractor={item => item.key}
            />
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

  textModulo: {
    fontSize: 20,
    textAlign: 'left',
    marginBottom: 5,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 12,
  },

  inputSelect: {
    paddingVertical: 10,
    marginBottom: 10,
  },
});
