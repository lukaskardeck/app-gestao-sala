import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import TelaLogin from './src/screens/TelaLogin';

function App() {

  return (
    <SafeAreaView style={styles.container}>
      <TelaLogin/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, //around
  },
});

export default App;
